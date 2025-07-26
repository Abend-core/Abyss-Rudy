import { type Context, type Next } from "hono";
import { verify } from "jsonwebtoken";
import { Cookie } from "../class/cookie";

export const authentification = async (c: Context, next: Next) => {
    try {
        const cookies = c.req.header("cookie") || "";
        const token = Cookie.getCookieAuth(cookies, "token");
        if (!token) {
            return c.json({ error: "Accès refusé. Token manquant." }, 401);
        }

        const decoded = verify(token, process.env.JWT_SECRET!) as {
            userId: string;
            role?: string;
        };

        if (!decoded || !decoded.userId) {
            return c.json({ error: "Token invalide. userId manquant." }, 401);
        }

        c.set("userId", decoded.userId);
        c.set("userRole", decoded.role || "user");

        await next();
    } catch (error) {
        console.error("Erreur de vérification du token:", error);
        return c.json({ error: "Accès refusé. Token invalide." }, 401);
    }
};
