import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ADVERTISE_DESTINATION =
  process.env.ADVERTISE_DESTINATION ?? "submissions@soundaliveradio.net";

type AdvertiseRequestBody = {
  companyName?: unknown;
  contactName?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  campaignDetails?: unknown;
  budgetRange?: unknown;
};

type AdvertisePayload = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  campaignDetails: string;
  budgetRange: string;
};

function toTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function parseAdvertiseBody(body: AdvertiseRequestBody): AdvertisePayload {
  return {
    companyName: toTrimmedString(body.companyName),
    contactName: toTrimmedString(body.contactName),
    email: toTrimmedString(body.email),
    phone: toTrimmedString(body.phone),
    website: toTrimmedString(body.website),
    campaignDetails: toTrimmedString(body.campaignDetails),
    budgetRange: toTrimmedString(body.budgetRange),
  };
}

function validateAdvertisePayload(payload: AdvertisePayload): string | null {
  if (!payload.companyName) return "Company Name is required.";
  if (!payload.contactName) return "Contact Name is required.";
  if (!payload.email) return "Email is required.";
  if (!isValidEmail(payload.email)) return "Please enter a valid email address.";
  if (!payload.campaignDetails) return "Campaign Details are required.";
  if (payload.website && !isValidUrl(payload.website)) {
    return "Company Website must be a valid URL.";
  }
  return null;
}

function buildAdvertiseEmailText(payload: AdvertisePayload): string {
  return [
    "New advertising inquiry received from soundaliveradio.net.",
    "",
    `Company Name: ${payload.companyName}`,
    `Contact Name: ${payload.contactName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `Website: ${payload.website || "Not provided"}`,
    `Budget Range: ${payload.budgetRange || "Not provided"}`,
    "",
    "Campaign Details:",
    payload.campaignDetails,
  ].join("\n");
}

function getMailTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from =
    process.env.ADVERTISE_FROM ??
    process.env.SUBMISSIONS_FROM ??
    process.env.SMTP_USER;
  const port = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !user || !pass || !from) {
    throw new Error(
      "Missing SMTP settings. Expected SMTP_HOST, SMTP_USER, SMTP_PASS, and ADVERTISE_FROM (or SUBMISSIONS_FROM / SMTP_USER)."
    );
  }

  return {
    from,
    transporter: nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    }),
  };
}

export async function POST(request: Request) {
  try {
    let rawBody: AdvertiseRequestBody;
    try {
      rawBody = (await request.json()) as AdvertiseRequestBody;
    } catch {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    const payload = parseAdvertiseBody(rawBody);
    const validationError = validateAdvertisePayload(payload);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { from, transporter } = getMailTransport();
    const companyForSubject = sanitizeHeaderValue(payload.companyName) || "Unknown company";

    await transporter.sendMail({
      to: ADVERTISE_DESTINATION,
      from,
      replyTo: payload.email,
      subject: `New advertising inquiry from ${companyForSubject}`,
      text: buildAdvertiseEmailText(payload),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to send advertising inquiry email", error);
    return NextResponse.json(
      {
        error: "Unable to send inquiry right now. Please try again in a few minutes.",
      },
      { status: 500 }
    );
  }
}
