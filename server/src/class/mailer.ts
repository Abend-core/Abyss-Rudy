import nodemailer from "nodemailer";
import { directory } from "./directory";

interface MailOptions {
    to: string;
    subject: string;
    template: string;
    variables?: Record<string, string | number>;
    attachments?: Array<{
        filename: string;
        path?: string; // chemin local
        content?: Buffer | string; // ou contenu direct
        cid?: string; // content-id pour images inline
    }>;
}

/**
 * Classe utilitaire pour l'envoi d'e-mails avec Nodemailer et des templates personnalisés.
 */
export class Mailer {
    /**
     * Transporteur Nodemailer configuré avec les variables d'environnement.
     */
    private static transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    /**
     * Rend un template d'e-mail en remplaçant les variables.
     * @param templatePath - Chemin relatif vers le template dans le dossier templates.
     * @param variables - Objet clé-valeur pour remplacer dans le template (ex : {{name}}, {{code}}).
     * @returns Le contenu HTML rendu.
     */
    private static async renderTemplate(
        templatePath: string,
        variables?: Record<string, string | number>
    ): Promise<string> {
        const fullPath = directory.resolve("templates", templatePath);
        let template = await directory.readFile(fullPath);

        if (variables) {
            template = template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
                const value = variables[key.trim()];
                return value !== undefined ? String(value) : "";
            });
        }

        return template;
    }

    /**
     * Envoie un e-mail selon les options fournies.
     * @param options - Objet contenant le destinataire, sujet, chemin du template et variables optionnelles.
     */
    public static async send(options: MailOptions): Promise<void> {
        const html = await Mailer.renderTemplate(
            options.template,
            options.variables
        );

        await Mailer.transporter.sendMail({
            from: process.env.SMTP_FROM || '"App" <no-reply@example.com>',
            to: options.to,
            subject: options.subject,
            html,
            attachments: options.attachments,
        });
    }
}
