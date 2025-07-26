import {
    createLogger,
    format,
    transports,
    Logger as WinstonLogger,
} from "winston";
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";

export class Logger {
    private static fileFormat = format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level.toUpperCase()} : ${message}`;
        })
    );

    private static consoleFormat = format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level.toUpperCase()} : ${message}`;
        }),
        format.colorize({ all: true })
    );

    /**
     * Crée un logger pour fichier avec rotation des logs.
     * @param filename - Nom du dossier/catégorie de log (exemple : "api", "auth").
     * @returns Un logger Winston configuré.
     */
    private static createFileLogger(filename: string): WinstonLogger {
        return createLogger({
            level: "info",
            format: Logger.fileFormat,
            transports: [
                new DailyRotateFile({
                    filename: path.join(
                        __dirname,
                        `../../logs/${filename}/%DATE%.log`
                    ),
                    datePattern: "YYYY-MM-DD",
                    maxSize: "10m",
                    maxFiles: "7d",
                    zippedArchive: false,
                }),
            ],
        });
    }

    /**
     * Crée un logger pour la console, avec couleur, idéal en développement.
     * @returns Un logger Winston configuré pour la console.
     */
    private static createConsoleLogger(): WinstonLogger {
        return createLogger({
            level: "debug",
            format: Logger.consoleFormat,
            transports: [new transports.Console()],
        });
    }

    /**
     * Logger pour les messages liés à l'API.
     */
    static readonly api = Logger.createFileLogger("api");

    /**
     * Logger pour les messages liés à l'authentification.
     */
    static readonly auth = Logger.createFileLogger("auth");

    /**
     * Logger pour les messages liés à Sequelize/ORM.
     */
    static readonly sequelize = Logger.createFileLogger("sequelize");

    /**
     * Logger pour le debug général dans la console.
     */
    static readonly console = Logger.createConsoleLogger();
}
