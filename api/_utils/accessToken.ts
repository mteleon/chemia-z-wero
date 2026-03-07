import { createHmac, timingSafeEqual } from "node:crypto";

export type AccessTokenPayload = {
  email: string;
  product: "notes_bundle";
  sessionId: string;
  exp: number;
};

function encodeBase64Url(input: Buffer | string): string {
  const value = Buffer.isBuffer(input) ? input : Buffer.from(input, "utf8");
  return value
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/g, "");
}

function decodeBase64Url(input: string): Buffer {
  const normalized = input.replaceAll("-", "+").replaceAll("_", "/");
  const paddingLength = (4 - (normalized.length % 4)) % 4;
  const padded = normalized + "=".repeat(paddingLength);
  return Buffer.from(padded, "base64");
}

function sign(unsignedToken: string, secret: string): string {
  return encodeBase64Url(createHmac("sha256", secret).update(unsignedToken).digest());
}

export function createAccessToken(
  payload: Omit<AccessTokenPayload, "exp">,
  secret: string,
  expiresInSeconds: number
): string {
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const completePayload: AccessTokenPayload = { ...payload, exp };
  const encodedPayload = encodeBase64Url(JSON.stringify(completePayload));
  const signature = sign(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export function verifyAccessToken(token: string, secret: string): AccessTokenPayload {
  const [encodedPayload, encodedSignature] = token.split(".");
  if (!encodedPayload || !encodedSignature) {
    throw new Error("Invalid token format");
  }

  const expectedSignature = sign(encodedPayload, secret);
  const expectedBuffer = Buffer.from(expectedSignature);
  const actualBuffer = Buffer.from(encodedSignature);

  if (expectedBuffer.length !== actualBuffer.length) {
    throw new Error("Invalid token signature");
  }
  if (!timingSafeEqual(expectedBuffer, actualBuffer)) {
    throw new Error("Invalid token signature");
  }

  let payload: AccessTokenPayload;
  try {
    payload = JSON.parse(decodeBase64Url(encodedPayload).toString("utf8")) as AccessTokenPayload;
  } catch {
    throw new Error("Invalid token payload");
  }

  if (!payload.email || !payload.product || !payload.sessionId || !payload.exp) {
    throw new Error("Invalid token payload");
  }
  if (payload.product !== "notes_bundle") {
    throw new Error("Invalid token product");
  }
  if (Math.floor(Date.now() / 1000) >= payload.exp) {
    throw new Error("Token expired");
  }

  return payload;
}
