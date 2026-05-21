import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[c]!;
  });
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Server email not configured" },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const business = String(body.business ?? "").trim();
  const plan = String(body.plan ?? "Not sure yet").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !phone || !business) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const to = process.env.LEAD_FORM_TO ?? "chase@6ixgrowth.com";
  const from = process.env.LEAD_FORM_FROM ?? "onboarding@resend.dev";

  const subject = `New lead: ${name}${plan && plan !== "Not sure yet" ? ` — ${plan}` : ""}`;

  const html = `
    <h2 style="font-family:system-ui,sans-serif;">New lead from 6IX site</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;">
      <tr><td><b>Name:</b></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><b>Email:</b></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><b>Phone:</b></td><td>${escapeHtml(phone)}</td></tr>
      <tr><td><b>Business:</b></td><td>${escapeHtml(business)}</td></tr>
      <tr><td><b>Plan interest:</b></td><td>${escapeHtml(plan)}</td></tr>
    </table>
    ${
      message
        ? `<p style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;"><b>Message:</b><br/>${escapeHtml(
            message,
          ).replace(/\n/g, "<br/>")}</p>`
        : ""
    }
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      html,
    });
    if (error) {
      console.error("Resend error", error);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend exception", err);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
