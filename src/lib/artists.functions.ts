import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ArtistApplicationSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  instagram: z.string().min(1).max(80),
  portfolioUrl: z.string().url().max(500).optional().or(z.literal("")),
  style: z.string().max(200).optional().or(z.literal("")),
  note: z.string().max(1000).optional().or(z.literal("")),
});

export const submitArtistApplication = createServerFn({ method: "POST" })
  .inputValidator((data) => ArtistApplicationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error } = await supabaseAdmin
      .from("artist_applications")
      .insert({
        name: data.name,
        email: data.email,
        instagram: data.instagram,
        portfolio_url: data.portfolioUrl || null,
        style: data.style || null,
        note: data.note || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return inserted;
  });

export const getAllArtistApplications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: adminCheck } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!adminCheck) throw new Error("Unauthorized");

    const { data, error } = await context.supabase
      .from("artist_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateArtistApplicationStatus = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["pending", "approved", "rejected"]),
      })
      .parse(data),
  )
  .middleware([requireSupabaseAuth])
  .handler(async ({ data, context }) => {
    const { data: adminCheck } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!adminCheck) throw new Error("Unauthorized");

    const { error } = await context.supabase
      .from("artist_applications")
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { success: true };
  });
