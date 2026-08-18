import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const CommissionSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().optional().or(z.literal("")),
  instagram: z.string().max(80).optional().or(z.literal("")),
  tier: z.string().min(1).max(80),
  style: z.enum(["monochrome", "vivid"]),
  description: z.string().min(5).max(2000),
  referenceUrl: z.string().url().max(500).optional().or(z.literal("")),
});

export const submitCommission = createServerFn({ method: "POST" })
  .inputValidator((data) => CommissionSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error } = await supabaseAdmin
      .from("commissions")
      .insert({
        name: data.name,
        email: data.email || null,
        instagram: data.instagram || null,
        tier: data.tier,
        style: data.style,
        description: data.description,
        reference_url: data.referenceUrl || null,
        status: "new",
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return inserted;
  });

export const getAllCommissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: adminCheck } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!adminCheck) throw new Error("Unauthorized");

    const { data, error } = await context.supabase
      .from("commissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateCommissionStatus = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["new", "confirmed", "paid", "in_progress", "completed", "cancelled"]),
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
      .from("commissions")
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { success: true };
  });
