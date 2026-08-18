import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const WallSubmissionSchema = z.object({
  type: z.enum(["ai", "hand-drawn"]),
  prompt: z.string().max(1000).optional(),
  imageData: z.string().min(1, "Image is required"),
  artistName: z.string().max(100).optional().or(z.literal("")),
  sector: z.enum(["monochrome", "vivid"]).optional().or(z.literal("")),
});

export const submitWallItem = createServerFn({ method: "POST" })
  .inputValidator((data) => WallSubmissionSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error } = await supabaseAdmin
      .from("wall_submissions")
      .insert({
        type: data.type,
        prompt: data.prompt || null,
        image_data: data.imageData,
        artist_name: data.artistName || "Anonymous",
        sector: data.sector || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return inserted;
  });

export const getApprovedWallItems = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("wall_submissions")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getAllWallItems = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: adminCheck } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!adminCheck) throw new Error("Unauthorized");

    const { data, error } = await context.supabase
      .from("wall_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateWallItemStatus = createServerFn({ method: "POST" })
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
      .from("wall_submissions")
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { success: true };
  });
