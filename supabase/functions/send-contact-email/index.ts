import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.104.0/cors";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const RECIPIENT = "info@worldwidefinances.com";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate(body: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid body" };
  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  if (!name || name.length > 100) return { ok: false, error: "Invalid name" };
  if (!email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, error: "Invalid email" };
  if (!message || message.length > 1000) return { ok: false, error: "Invalid message" };
  return { ok: true, data: { name, email, message } };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const body = await req.json().catch(() => null);
    const parsed = validate(body);
    if (!parsed.ok) {
      return new Response(JSON.stringify({ error: parsed.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { name, email, message } = parsed.data;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">New inquiry — World Wide Finance</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; padding: 12px; background: #f5f5f5; border-radius: 6px;">${escapeHtml(message)}</p>
      </div>
    `;

    const resp = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "World Wide Finance <onboarding@resend.dev>",
        to: [RECIPIENT],
        reply_to: email,
        subject: `New inquiry from ${name} — World Wide Finance`,
        html,
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error("Resend error", resp.status, data);
      return new Response(
        JSON.stringify({ error: "Email send failed", details: data }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true, id: data?.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("send-contact-email error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
