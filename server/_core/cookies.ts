import { Request, CookieOptions } from "express";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function isIpAddress(host: string) {
  // Basic IPv4 check and IPv6 presence detection.
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return true;
  return host.includes(":");
}

function isSecureRequest(req: Request) {
  if (req.protocol === "https") return true;

  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;

  const protoList = Array.isArray(forwardedProto)
    ? forwardedProto
    : forwardedProto.split(",");

  return protoList.some((proto: string) => proto.trim().toLowerCase() === "https");
}

export function getSessionCookieOptions(
  req: Request
): Partial<Pick<CookieOptions, "domain" | "httpOnly" | "path" | "sameSite" | "secure">> {
  const hostname = req.hostname;
  const isLocalhost = LOCAL_HOSTS.has(hostname);
  const isSecure = isSecureRequest(req);

  // For localhost/HTTP, use 'lax' since 'none' requires secure:true
  // For production HTTPS, use 'none' to allow cross-origin
  return {
    httpOnly: true,
    path: "/",
    sameSite: isSecure ? "none" : "lax",
    secure: isSecure,
  };
}
