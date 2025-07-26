import { type Context } from "hono";
import { sign, verify } from "jsonwebtoken";
import { Logger } from "../class/logger";
import { User } from "../database/models/user";
import { Hasher } from "../class/hasher";
import { Op, ValidationError } from "sequelize";
import { directory } from "../class/directory";

class AuthController {
    async register(c: Context) {
        const data = c.get("validatedBody");

        if (data.password != data.confirmPassword) {
            return c.json(
                { error: "Les mots de passe ne correspondent pas." },
                400
            );
        }
        const hashedPassword = await Hasher.hash(data.password);

        try {
            const newUser = await User.create({
                username: data.username,
                password: hashedPassword,
            });
            const dataNewUser = newUser.get({ plain: true });

            Logger.api.info("Inscription réussie: " + dataNewUser.id);

            return c.json({}, 200);
        } catch (error) {
            if (error instanceof ValidationError) {
                return c.json(
                    { error: error.errors.map((e) => e.message) },
                    400
                );
            }
            Logger.auth.error(
                "Erreur lors de l'inscription: " + data.username + " | " + error
            );
            return c.json({ error: "Erreur lors de la création" }, 500);
        }
    }

    async signin(c: Context) {
        const data = c.get("validatedBody");
        try {
            const user = await User.findOne({
                where: { username: data.username },
                raw: true,
            });
            if (!user) {
                Logger.auth.warn(
                    "Échec de connexion: " +
                        data.username +
                        " | Utilisateur introuvable"
                );
                return c.json(
                    { error: "Mot de passe ou identifiant incorrect" },
                    400
                );
            }

            const match = await Hasher.compare(data.password, user.password);
            if (!match) {
                Logger.auth.warn(
                    "Échec de connexion: " +
                        data.username +
                        " | Mot de passe incorrect"
                );
                return c.json(
                    { error: "Mot de passe ou identifiant incorrect" },
                    400
                );
            }
            const token = sign({ userId: user.id }, process.env.JWT_SECRET!, {
                expiresIn: "1h",
            });
            const cookieSecure = process.env.COOKIE_SECURE === "true";
            c.header(
                "Set-Cookie",
                `token=${token}; HttpOnly; ${
                    cookieSecure ? "Secure;" : ""
                } SameSite=Strict; Path=/`
            );

            Logger.api.info("Connexion réussie: " + user.id);

            const dataUser = {
                username: data.username,
                id: user.id,
                createdAt: user.createdAt,
                updateAt: user.updatedAt,
            };

            return c.json({ user: dataUser }, 200);
        } catch (error) {
            Logger.auth.error(
                "Erreur lors de la connexion: " + data.username + " | " + error
            );
            return c.json({ error: "Erreur lors de la connexion" }, 500);
        }
    }

    async profil(c: Context) {
        const userId = c.get("userId");
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"] },
        });

        return c.json(user, 200);
    }

    async logout(c: Context) {
        try {
            const authHeader = c.req.header("Authorization");
            if (!authHeader) {
                Logger.auth.warn("Déconnexion tentée sans token");
                return c.json({ error: "Non connecté" }, 401);
            }

            const token = authHeader.split(" ")[1];
            if (!token) {
                Logger.auth.warn("Déconnexion tentée sans token");
                return c.json({ error: "Non connecté" }, 401);
            }

            const decoded: any = verify(token, process.env.JWT_SECRET!);
            if (!decoded || !decoded.userId) {
                Logger.auth.warn("Token invalide ou expiré");
                return c.json({ error: "Token invalide ou expiré" }, 401);
            }

            const userId = decoded.userId;

            c.header(
                "Set-Cookie",
                `token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`
            );

            Logger.api.info(
                "Utilisateur " + userId + " déconnecté avec succès"
            );

            return c.json({}, 200);
        } catch (error) {
            Logger.auth.error("Erreur lors de la déconnexion |", error);
            return c.json({ error: "Erreur lors de la déconnexion" }, 500);
        }
    }

    async metric(c: Context) {
        const ip =
            c.req.header("x-forwarded-for") ||
            (c.req.raw as any)?.socket?.remoteAddress ||
            c.req.header("cf-connecting-ip") ||
            c.req.header("true-client-ip") ||
            "unknown";
        Logger.auth.info(
            `🔍 Tentative d'authentification pour /auth/signinMetrics (IP: ${ip})`
        );

        try {
            // Vérifier la méthode de la requête
            if (c.req.method !== "POST") {
                Logger.auth.warn(
                    `🚫 Méthode non autorisée pour /auth/signinMetrics: ${c.req.method} (IP: ${ip})`
                );
                return c.json(
                    { error: "Méthode non autorisée, utilisez POST" },
                    405
                );
            }

            // Parser le corps de la requête
            Logger.auth.debug(`📋 Parsing du corps de la requête (IP: ${ip})`);
            const body = await c.req.parseBody();
            Logger.auth.debug(
                `📋 Corps de la requête: ${JSON.stringify(body)} (IP: ${ip})`
            );

            const username = body.username as string;
            const password = body.password as string;

            if (!username || !password) {
                Logger.auth.warn(
                    `🚫 Échec d'authentification: Données manquantes (username: ${username}, password: ${
                        password ? "[provided]" : "[missing]"
                    }) (IP: ${ip})`
                );
                return c.html(
                    await directory.renderTemplate(
                        "src/templates/html/authPage.html",
                        {
                            appName: "Abyss API",
                            error: "Veuillez fournir un nom d'utilisateur et un mot de passe",
                        }
                    )
                );
            }

            // Vérifier les variables d'environnement
            Logger.auth.debug(
                `🔍 Vérification des variables d'environnement (IP: ${ip})`
            );
            const expectedUsername = process.env.AUTH_METRICS_LOGIN;
            const expectedPasswordHash = process.env.AUTH_METRICS_PASSWORD_HASH;
            const jwtSecret = process.env.JWT_SECRET;

            if (!expectedUsername || !expectedPasswordHash || !jwtSecret) {
                Logger.auth.error(
                    `❌ Erreur de configuration: Variables d'environnement manquantes (AUTH_METRICS_LOGIN: ${!!expectedUsername}, AUTH_METRICS_PASSWORD_HASH: ${!!expectedPasswordHash}, JWT_SECRET: ${!!jwtSecret}) (IP: ${ip})`
                );
                return c.html(
                    await directory.renderTemplate(
                        "src/templates/html/authPage.html",
                        {
                            appName: "Abyss API",
                            error: "Erreur de configuration du serveur",
                        }
                    ),
                    500
                );
            }

            // Vérifier le nom d'utilisateur
            Logger.auth.debug(
                `🔍 Vérification du nom d'utilisateur: ${username} (IP: ${ip})`
            );
            if (username !== expectedUsername) {
                Logger.auth.warn(
                    `🚫 Échec d'authentification: Nom d'utilisateur incorrect (IP: ${ip})`
                );
                return c.html(
                    await directory.renderTemplate(
                        "src/templates/html/authPage.html",
                        {
                            appName: "Abyss API",
                            error: "Nom d'utilisateur ou mot de passe incorrect",
                        }
                    )
                );
            }

            // Vérifier le mot de passe
            Logger.auth.debug(
                `🔐 Vérification du mot de passe pour ${username} (IP: ${ip}), hash: ${expectedPasswordHash.substring(
                    0,
                    10
                )}...`
            );
            const isPasswordValid = await Hasher.compare(
                password,
                expectedPasswordHash
            );
            Logger.auth.debug(
                `🔐 Résultat de la comparaison: ${isPasswordValid}`
            );
            if (!isPasswordValid) {
                Logger.auth.warn(
                    `🚫 Échec d'authentification: Mot de passe incorrect (IP: ${ip})`
                );
                return c.html(
                    await directory.renderTemplate(
                        "src/templates/html/authPage.html",
                        {
                            appName: "Abyss API",
                            error: "Nom d'utilisateur ou mot de passe incorrect",
                        }
                    )
                );
            }

            // Générer un token JWT
            Logger.auth.debug(
                `🔑 Génération du token JWT pour ${username} (IP: ${ip})`
            );
            const token = sign({ username }, jwtSecret, { expiresIn: "1h" });
            Logger.auth.info(
                `✅ Authentification réussie pour /metrics (IP: ${ip})`
            );

            // Définir l'en-tête authorization et rediriger vers /metrics
            c.header("authorization", `Bearer ${token}`);
            return c.redirect("/metrics");
        } catch (error) {
            Logger.auth.error(
                `❌ Erreur lors de l'authentification pour /metrics (IP: ${ip}): ${
                    error.message || error
                }`
            );
            return c.html(
                await directory.renderTemplate(
                    "src/templates/html/authPage.html",
                    {
                        appName: "Abyss API",
                        error: "Erreur interne du serveur",
                    }
                ),
                500
            );
        }
    }
}
export const authController = new AuthController();
