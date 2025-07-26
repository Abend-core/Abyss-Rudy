import { type Context, type Next } from "hono";
import type { IncomingMessage } from "http";

const IP_Valive = new Set([
    "127.0.0.1",
    "::1",
    "172.23.80.1", // WSL
    "192.168.1.82", // IP physique
    "2a02:842b:a020:7e01:d545:5a6d:b513:ed49", // IP publique
]);

export async function IP(c: Context, next: Next) {
    let ip = c.req.header("x-forwarded-for") || "";

    if (ip.includes(",")) {
        ip = ip.split(",")[0].trim();
    }

    console.log("🔹 x-forwarded-for:", ip);

    if (!ip) {
        const rawReq = c.req.raw as unknown as IncomingMessage;
        ip = rawReq?.socket?.remoteAddress || "127.0.0.1"; // Fallback à localhost
        console.log("🔹 remoteAddress fallback:", ip);
    }

    console.log("🔹 Final IP:", ip);

    // Ignorer la vérification pour les ressources statiques et /forbidden
    if (
        c.req.path.startsWith("/assets") ||
        c.req.path === "/forbidden" ||
        c.req.path === "/403"
    ) {
        console.log("📁 Requête exemptée de vérification IP:", c.req.path);
        await next();
        return;
    }

    if (!ip) {
        console.warn("⛔ Aucune IP détectée, redirection vers /forbidden");
        return c.redirect("/forbidden");
    }

    if (!IP_Valive.has(ip)) {
        console.warn("⛔ IP non autorisée:", ip);
        return c.redirect("/forbidden");
    }

    console.log("✅ IP autorisée:", ip);
    await next();
}
