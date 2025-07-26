import { type Context, type Next } from "hono";
import { MetricsCollector } from "../class/metricsCollector";

/**
 * Middleware Hono pour collecter les métriques des endpoints.
 */
export const metricsMiddleware = async (c: Context, next) => {
    const start = Date.now();

    await next();

    const duration = Date.now() - start;
    const method = c.req.method;
    const path = c.req.path;
    const status = c.res.status;

    const endpoint = `${method} ${path}`;

    MetricsCollector.track(endpoint, duration, status);
};
