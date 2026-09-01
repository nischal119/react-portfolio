import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";

const ITERATIONS = 100000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";
const COOKIE_NAME = "admin_session";
const SESSION_DURATION = 24 * 60 * 60; // 24 hours in seconds

function getJwtSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error("ADMIN_JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

/**
 * Verify a plaintext password against a PBKDF2 hash string (salt:iterations:hash).
 */
export async function verifyPassword(password, storedHash) {
  const [salt, iterations, hash] = storedHash.split(":");
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      parseInt(iterations, 10),
      KEY_LENGTH,
      DIGEST,
      (err, derivedKey) => {
        if (err) return reject(err);
        resolve(crypto.timingSafeEqual(
          Buffer.from(hash, "hex"),
          derivedKey
        ));
      }
    );
  });
}

/**
 * Validate admin credentials against environment variables.
 * Returns true if valid, false otherwise.
 */
export async function validateCredentials(username, password) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !expectedHash) {
    throw new Error("Admin credentials not configured in environment");
  }

  // Constant-time username comparison
  const usernameMatch =
    username.length === expectedUsername.length &&
    crypto.timingSafeEqual(
      Buffer.from(username),
      Buffer.from(expectedUsername)
    );

  if (!usernameMatch) return false;

  return verifyPassword(password, expectedHash);
}

/**
 * Create a signed JWT session token.
 */
export async function createSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getJwtSecret());

  return token;
}

/**
 * Verify a JWT session token.
 * Returns the payload if valid, null otherwise.
 */
export async function verifySession(token) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload;
  } catch {
    return null;
  }
}

/**
 * Get the session cookie configuration.
 */
export function getSessionCookieConfig(token) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_DURATION,
  };
}

/**
 * Get a cookie config that clears the session.
 */
export function getClearSessionCookieConfig() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  };
}

export { COOKIE_NAME };
