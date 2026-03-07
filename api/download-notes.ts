import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyAccessToken } from "./_utils/accessToken.js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseBucket =
  process.env.SUPABASE_NOTES_BUCKET || process.env.SUPABASE_BUCKET || "notes-private";
const notesObjectPath = process.env.SUPABASE_NOTES_OBJECT_PATH;
const downloadTokenSecret = process.env.DOWNLOAD_TOKEN_SECRET;
const signedUrlTtlSeconds = Number(process.env.SUPABASE_SIGNED_URL_TTL_SECONDS || "120");

const supabase =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

function getToken(req: VercelRequest): string | null {
  const value = req.query.token;
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }
  return typeof value === "string" ? value : null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!supabase || !notesObjectPath || !downloadTokenSecret) {
    return res.status(500).json({ error: "Download endpoint is not configured" });
  }

  const token = getToken(req);
  if (!token) {
    return res.status(400).json({ error: "Missing token" });
  }

  try {
    const payload = verifyAccessToken(token, downloadTokenSecret);
    if (payload.product !== "notes_bundle") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { data, error } = await supabase.storage
      .from(supabaseBucket)
      .createSignedUrl(notesObjectPath, signedUrlTtlSeconds, {
        download: "notatki-pakiet.pdf",
      });

    if (error || !data?.signedUrl) {
      console.error("Supabase signed URL error:", error);
      return res.status(500).json({ error: "Failed to generate secure download URL" });
    }

    return res.redirect(302, data.signedUrl);
  } catch (error) {
    console.error("Download token validation error:", error);
    return res.status(401).json({
      error: "Invalid or expired download token",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
