import { Sequelize, type Transaction } from "sequelize";
import { initializeAllModels } from "./models";
import { Logger } from "../class/logger";

class Database {
    public readonly sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize(
            process.env.MYSQL_DATABASE,
            process.env.MYSQL_USER,
            process.env.MYSQL_PASSWORD,
            {
                host: process.env.MYSQL_HOST,
                port: Number(process.env.MYSQL_PORT),
                dialect: process.env.MYSQL_DIALECT as any,
                dialectOptions: { charset: "utf8mb4" },
                pool: {
                    max: 10,
                    min: 0,
                    acquire: 30000,
                    idle: 10000,
                },
                logging: (msg, timing) => {
                    Logger.sequelize.info({
                        message: msg,
                        executionTime: timing ? `${timing}ms` : "unknown",
                    });
                },
            }
        );

        this.init();
    }

    private async init() {
        try {
            await initializeAllModels(this.sequelize);
            await this.sequelize.authenticate();
            Logger.api.info(
                `✅ [MySQL] Connecté à ${process.env.MYSQL_DATABASE}`
            );
        } catch (error) {
            Logger.api.error("❌ [MySQL] Erreur de connexion:", error);
            throw error;
        }
    }

    public async connect() {
        try {
            await initializeAllModels(this.sequelize);
            await this.sequelize.authenticate();

            await this.sequelize.sync({ alter: true });

            Logger.api.info(
                `✅ [MySQL] Connecté à ${process.env.MYSQL_DATABASE}`
            );
        } catch (error) {
            Logger.api.error("❌ [MySQL] Erreur de connexion:", error);
            throw error;
        }
    }

    public async close() {
        await this.sequelize.close();
        Logger.sequelize.info("🛑 [MySQL] Connexion fermée");
    }

    public async withTransaction<T>(
        callback: (sequelize: Sequelize, transaction: Transaction) => Promise<T>
    ): Promise<T> {
        const t = await this.sequelize.transaction();

        Logger.api.info("📦 [MySQL] Transaction démarrée");

        try {
            const result = await callback(this.sequelize, t);
            await t.commit();
            Logger.api.info("✅ [MySQL] Transaction validée");
            return result;
        } catch (error) {
            await t.rollback();
            Logger.api.error(
                "❌ [MySQL] Transaction annulée à cause d'une erreur:",
                error
            );
            throw error;
        }
    }
}

export default new Database();
