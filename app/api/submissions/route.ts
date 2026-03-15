import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SUBMISSION_DESTINATION = "submissions@soundaliveradio.net";

type SubmissionRequestBody = {
  artistName?: unknown;
  email?: unknown;
  instagramLink?: unknown;
  xLink?: unknown;
  facebookLink?: unknown;
  spotifyLink?: unknown;
  soundcloudLink?: unknown;
  youtubeLink?: unknown;
  additionalMusicLinks?: unknown;
};

type SubmissionPayload = {
  artistName: string;
  email: string;
  instagramLink: string;
  xLink: string;
  facebookLink: string;
  spotifyLink: string;
  soundcloudLink: string;
  youtubeLink: string;
  additionalMusicLinks: string;
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

function parseSubmissionBody(body: SubmissionRequestBody): SubmissionPayload {
  return {
    artistName: toTrimmedString(body.artistName),
    email: toTrimmedString(body.email),
    instagramLink: toTrimmedString(body.instagramLink),
    xLink: toTrimmedString(body.xLink),
    facebookLink: toTrimmedString(body.facebookLink),
    spotifyLink: toTrimmedString(body.spotifyLink),
    soundcloudLink: toTrimmedString(body.soundcloudLink),
    youtubeLink: toTrimmedString(body.youtubeLink),
    additionalMusicLinks: toTrimmedString(body.additionalMusicLinks),
  };
}

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function validateSubmission(payload: SubmissionPayload): string | null {
  if (!payload.artistName) return "Artist Name is required.";
  if (!payload.email) return "Email is required.";
  if (!isValidEmail(payload.email)) return "Please enter a valid email address.";

  const musicLinks = [
    payload.spotifyLink,
    payload.soundcloudLink,
    payload.youtubeLink,
    payload.additionalMusicLinks,
  ].filter(Boolean);

  if (musicLinks.length === 0) {
    return "Please include at least one music link.";
  }

  const strictUrlFields = [
    payload.instagramLink,
    payload.xLink,
    payload.facebookLink,
    payload.spotifyLink,
    payload.soundcloudLink,
    payload.youtubeLink,
  ];
  for (const urlValue of strictUrlFields) {
    if (!urlValue) continue;
    if (!isValidUrl(urlValue)) {
      return "Social and streaming links must be valid URLs.";
    }
  }

  return null;
}

function buildEmailText(payload: SubmissionPayload): string {
  return [
    "New artist submission received from soundaliveradio.net.",
    "",
    `Artist Name: ${payload.artistName}`,
    `Sender Email: ${payload.email}`,
    "",
    "Social Links:",
    `Instagram: ${payload.instagramLink || "Not provided"}`,
    `X: ${payload.xLink || "Not provided"}`,
    `Facebook: ${payload.facebookLink || "Not provided"}`,
    "",
    "Music Links:",
    `Spotify: ${payload.spotifyLink || "Not provided"}`,
    `SoundCloud: ${payload.soundcloudLink || "Not provided"}`,
    `YouTube: ${payload.youtubeLink || "Not provided"}`,
    `Additional: ${payload.additionalMusicLinks || "Not provided"}`,
  ].join("\n");
}

function getMailTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SUBMISSIONS_FROM ?? process.env.SMTP_USER;
  const port = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !user || !pass || !from) {
    throw new Error(
      "Missing SMTP settings. Expected SMTP_HOST, SMTP_USER, SMTP_PASS, and SUBMISSIONS_FROM (or SMTP_USER)."
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
    let rawBody: SubmissionRequestBody;
    try {
      rawBody = (await request.json()) as SubmissionRequestBody;
    } catch {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    const payload = parseSubmissionBody(rawBody);
    const validationError = validateSubmission(payload);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { from, transporter } = getMailTransport();
    const artistNameForSubject = sanitizeHeaderValue(payload.artistName) || "Unknown artist";

    await transporter.sendMail({
      to: SUBMISSION_DESTINATION,
      from,
      replyTo: payload.email,
      subject: `New music submission from ${artistNameForSubject}`,
      text: buildEmailText(payload),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to send music submission email", error);
    return NextResponse.json(
      {
        error: "Unable to send submission right now. Please try again in a few minutes.",
      },
      { status: 500 }
    );
  }
}
