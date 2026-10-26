import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://titang11.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const STAFF_ROLES = new Set([
  "verification_agent",
  "team_leader",
  "account_review_agent",
  "account_review_lead",
]);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "POST required" }), { status: 405, headers: corsHeaders });

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !anonKey || !serviceKey) {
      return new Response(JSON.stringify({ error: "Server auth configuration is missing." }), { status: 500, headers: corsHeaders });
    }
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Sign in as an administrator." }), { status: 401, headers: corsHeaders });

    const callerClient = createClient(url, anonKey, { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false, autoRefreshToken: false } });
    const { data: userData, error: userError } = await callerClient.auth.getUser();
    if (userError || !userData.user) return new Response(JSON.stringify({ error: "Your session is invalid. Sign in again." }), { status: 401, headers: corsHeaders });

    const { data: callerProfile, error: profileError } = await callerClient
      .from("profiles").select("app_role").eq("id", userData.user.id).maybeSingle();
    if (profileError || callerProfile?.app_role !== "admin") {
      return new Response(JSON.stringify({ error: "Only an administrator can create staff accounts." }), { status: 403, headers: corsHeaders });
    }

    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const displayName = String(body.display_name || "").trim();
    const role = String(body.app_role || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return new Response(JSON.stringify({ error: "Enter a valid staff email address." }), { status: 400, headers: corsHeaders });
    if (displayName.length < 2 || displayName.length > 120) return new Response(JSON.stringify({ error: "Enter the staff member's name (2–120 characters)." }), { status: 400, headers: corsHeaders });
    if (!STAFF_ROLES.has(role)) return new Response(JSON.stringify({ error: "Choose an approved staff role. Admin roles cannot be created through this form." }), { status: 400, headers: corsHeaders });

    const adminClient = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: inviteData, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(email, {
      redirectTo: "https://titang11.github.io/temo-exchange/",
      data: { display_name: displayName, account_type: "staff" },
    });
    if (inviteError || !inviteData.user) {
      return new Response(JSON.stringify({ error: inviteError?.message || "Could not create staff invitation." }), { status: 400, headers: corsHeaders });
    }

    const staffUser = inviteData.user;
    const { data: updatedRows, error: updateError } = await adminClient
      .from("profiles")
      .update({ display_name: displayName, app_role: role, role })
      .eq("id", staffUser.id)
      .select("id");
    if (updateError || !updatedRows?.length) {
      return new Response(JSON.stringify({
        error: "The invitation was created, but the staff role could not be saved. Keep the invitation pending and have an administrator correct the role in the protected admin workspace.",
        invited_user_id: staffUser.id,
      }), { status: 500, headers: corsHeaders });
    }

    return new Response(JSON.stringify({
      success: true,
      invited_email: email,
      display_name: displayName,
      app_role: role,
      message: "Invitation email sent. The staff member must open the invitation and set their own password.",
    }), { status: 200, headers: corsHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unexpected server error." }), { status: 500, headers: corsHeaders });
  }
});