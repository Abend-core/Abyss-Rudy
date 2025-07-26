import fs from "fs/promises";
import mime from "mime-types";

/**
 * Classe utilitaire pour détecter les types MIME et extensions de fichiers.
 */
export class FileType {
    /**
     * Détecte le type MIME à partir d'un buffer de fichier.
     * @param {Buffer} buffer - Le buffer du fichier à analyser.
     * @returns {Promise<string | null>} - Le type MIME détecté ou null si non détectable.
     */
    static async detectMimeFromBuffer(buffer: Buffer): Promise<string | null> {
        const { fileTypeFromBuffer } = await import("file-type");
        const result = await fileTypeFromBuffer(buffer);
        return result?.mime || null;
    }

    /**
     * Détecte le type MIME à partir du chemin d'un fichier.
     * @param {string} filePath - Le chemin vers le fichier.
     * @returns {Promise<string | null>} - Le type MIME détecté ou null en cas d'erreur.
     */
    static async detectMimeFromFile(filePath: string): Promise<string | null> {
        try {
            const buffer = await fs.readFile(filePath);
            return this.detectMimeFromBuffer(buffer);
        } catch {
            return null;
        }
    }

    /**
     * Récupère l'extension de fichier associée à un type MIME donné.
     * @param {string} mimeType - Le type MIME.
     * @returns {string | null} - L'extension de fichier ou null si inconnue.
     */
    static getExtensionFromMime(mimeType: string): string | null {
        return mime.extension(mimeType) || null;
    }

    /**
     * Vérifie si un type MIME correspond à une image.
     * @param {string} mimeType - Le type MIME.
     * @returns {boolean} - Vrai si c'est un type MIME image.
     */
    static isImage(mimeType: string): boolean {
        return /^image\//.test(mimeType);
    }

    /**
     * Vérifie si un type MIME correspond à un PDF.
     * @param {string} mimeType - Le type MIME.
     * @returns {boolean} - Vrai si le type MIME est application/pdf.
     */
    static isPdf(mimeType: string): boolean {
        return mimeType === "application/pdf";
    }
}
