import { Hono, type Context, type Next } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { router as userRouter } from "./routers/user";
import { router as authRouter } from "./routers/auth";
import { Logger } from "./class/logger";
import { MetricsCollector } from "./class/metricsCollector";
import { IP } from "./middlewares/IP";
import { loginPage } from "./middlewares/loginPage";
import Database from "./database/db";
import { swaggerRoute } from "./docs/API/swagger";
import { directory } from "./class/directory";
import { Hasher } from "./class/hasher";

const corsCredentials = process.env.CORS_CREDENTIALS === "true";
const methods = process.env.CORS_METHODS
    ? process.env.CORS_METHODS.split(",")
    : [];
const headers = process.env.CORS_HEADERS
    ? process.env.CORS_HEADERS.split(",")
    : [];
const origin = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    : [];

Logger.console.info("");
Logger.console.info("🚀 Environnement : " + process.env.ENV);
Logger.console.info("PMA : http://localhost:8080");

(async () => {
    try {
        await Database.connect();
        Logger.console.info("📦 Base de données initialisée");
    } catch (error) {
        Logger.console.error(
            "❌ Erreur lors de l'initialisation de la base :",
            error
        );
        process.exit(1);
    }
})();

const app = new Hono();

if (process.env.ENV === "dev") {
    Logger.console.info("Documentation API : http://localhost:3000/docs");
    swaggerRoute(app);
}

app.use(
    "*",
    cors({
        origin: origin,
        allowMethods: methods,
        allowHeaders: headers,
        credentials: corsCredentials,
        maxAge: Number(process.env.CORS_AGE),
    })
);

app.use("*", async (c: Context, next: Next) => {
    const startTime = Date.now();

    await next();

    const duration = Date.now() - startTime;
    const method = c.req.method;
    const url = new URL(c.req.url).pathname;
    const status = c.res.status;

    const endpointKey = `${method} ${url}`;
    MetricsCollector.track(endpointKey, duration, status);

    Logger.api.info(
        `Méthode: ${method} | URL: ${url} | Durée: ${duration}ms | Statut: ${status}`
    );
});

app.use("/assets/*", serveStatic({ root: "./public" }));
app.route("/users", userRouter);
app.route("/auth", authRouter);

app.get("/metrics", IP, async (c) => {
    const stats = MetricsCollector.getStatsForTemplate();

    const html = await directory.renderTemplate(
        "src/templates/pages/metrics.html",
        { stats }
    );
    return c.html(html);
});

app.get("/", async (c) => {
    const html = await directory.renderTemplate(
        "src/templates/pages/home.html",
        {
            appName: "Abyss API",
        }
    );
    return c.html(html);
});

app.get("/403", async (c) => {
    const html = await directory.readFile("src/templates/pages/403.html");
    return c.html(html, 403);
});

app.get("/maintenance", async (c) => {
    const html = await directory.readFile(
        "src/templates/pages/maintenance.html"
    );
    return c.html(html, 503);
});

app.get("/500", async (c) => {
    const html = await directory.readFile("templates/pages/500.html");
    return c.html(html, 500);
});
// Dans app.ts
app.onError((err, c) => {
    Logger.console.error(
        `❌ Erreur serveur: ${err.message} (URL: ${c.req.url}, Method: ${c.req.method})`
    );
    if (c.res) return c.res; // Respecter la réponse définie par la route
    return c.json({ error: "Erreur serveur" }, 500);
});
// Dans app.ts
app.notFound((c) => {
    Logger.console.warn(
        `🚫 Route non trouvée: ${c.req.url} (Method: ${c.req.method})`
    );
    return c.json({ error: "Route non trouvée" }, 404);
});
const password = "Dl7HaYKnljwPnF";
const admin = process.env.AUTH_METRICS_LOGIN;
const hash = process.env.AUTH_METRICS_PASSWORD_HASH; // Remplacez par la valeur réelle
console.log("hash : ", hash);
console.log("admin : ", admin);
export default {
    port: process.env.PORT || 3000,
    fetch: app.fetch,
};
