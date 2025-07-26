import { type Context, type Next } from "hono";
import { directory } from "../class/directory";
import { Logger } from "../class/logger";

export async function loginPage(c: Context, next: Next) {
    const ip =
        c.req.header("x-forwarded-for") ||
        (c.req.raw as any)?.socket?.remoteAddress ||
        c.req.header("cf-connecting-ip") ||
        c.req.header("true-client-ip") ||
        "unknown";
    Logger.auth.debug(
        `🔍 Détection de l'IP: x-forwarded-for=${c.req.header(
            "x-forwarded-for"
        )}, socket=${(c.req.raw as any)?.socket?.remoteAddress}, final IP=${ip}`
    );
    const authorized = Boolean(c.req.header("authorization"));

    if (!authorized) {
        Logger.auth.info(
            `🔒 Accès non authentifié à /metrics depuis l'IP: ${ip}`
        );
        const html = await directory.renderTemplate(
            "src/templates/html/authPage.html",
            {
                appName: "Abyss API",
                error: c.req.query("error"),
            }
        );
        return c.html(html);
    }

    Logger.auth.info(`✅ Accès authentifié à /metrics depuis l'IP: ${ip}`);
    await next();
}
