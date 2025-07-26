import sharp from "sharp";
import fs from "fs/promises";

/**
 * Classe utilitaire pour la manipulation d'images avec Sharp.
 */
export class ImageUtils {
    /**
     * Redimensionne une image tout en conservant le ratio d'aspect.
     * @param inputPath - Chemin vers le fichier image source.
     * @param outputPath - Chemin où sauvegarder l'image redimensionnée.
     * @param width - Largeur souhaitée.
     * @param height - Hauteur souhaitée.
     */
    static async resize(
        inputPath: string,
        outputPath: string,
        width: number,
        height: number
    ): Promise<void> {
        await sharp(inputPath)
            .resize(width, height, { fit: "inside" })
            .toFile(outputPath);
    }

    /**
     * Convertit une image dans un autre format.
     * @param inputPath - Chemin vers l'image source.
     * @param outputPath - Chemin où sauvegarder l'image convertie.
     * @param format - Format cible : jpeg, png, webp ou avif.
     */
    static async convert(
        inputPath: string,
        outputPath: string,
        format: "jpeg" | "png" | "webp" | "avif" = "jpeg"
    ): Promise<void> {
        await sharp(inputPath)[format]().toFile(outputPath);
    }

    /**
     * Compresse une image JPEG avec une qualité optionnelle.
     * @param inputPath - Chemin vers l'image JPEG source.
     * @param outputPath - Chemin où sauvegarder l'image compressée.
     * @param quality - Qualité de compression (par défaut : 80).
     */
    static async compressJpeg(
        inputPath: string,
        outputPath: string,
        quality = 80
    ): Promise<void> {
        await sharp(inputPath)
            .jpeg({ quality, mozjpeg: true })
            .toFile(outputPath);
    }

    /**
     * Compresse une image PNG avec une qualité optionnelle.
     * @param inputPath - Chemin vers l'image PNG source.
     * @param outputPath - Chemin où sauvegarder l'image compressée.
     * @param quality - Qualité de compression (par défaut : 80).
     */
    static async compressPng(
        inputPath: string,
        outputPath: string,
        quality = 80
    ): Promise<void> {
        await sharp(inputPath)
            .png({ quality, compressionLevel: 9 })
            .toFile(outputPath);
    }

    /**
     * Extrait les métadonnées d'un fichier image.
     * @param inputPath - Chemin vers l'image.
     * @returns Les métadonnées de l'image.
     */
    static async getMetadata(inputPath: string): Promise<sharp.Metadata> {
        return await sharp(inputPath).metadata();
    }

    /**
     * Génère une miniature carrée à partir d'une image.
     * @param inputPath - Chemin vers l'image source.
     * @param outputPath - Chemin où sauvegarder la miniature.
     * @param size - Taille de la miniature (par défaut : 150x150).
     */
    static async generateThumbnail(
        inputPath: string,
        outputPath: string,
        size = 150
    ): Promise<void> {
        await sharp(inputPath)
            .resize(size, size, { fit: "cover" })
            .toFile(outputPath);
    }

    /**
     * Vérifie si un fichier est dans un format d'image supporté.
     * @param filePath - Chemin vers le fichier.
     * @returns True si le fichier est un format d'image reconnu.
     */
    static async isImage(filePath: string): Promise<boolean> {
        try {
            const buffer = await fs.readFile(filePath);
            const { format } = await sharp(buffer).metadata();
            return ["jpeg", "png", "webp", "avif", "gif", "tiff"].includes(
                format ?? ""
            );
        } catch {
            return false;
        }
    }

    /**
     * Convertit une image en URI de données base64 encodée.
     * @param inputPath - Chemin vers l'image source.
     * @returns Une chaîne de caractères représentant l'image en data URI base64.
     */
    static async toBase64(inputPath: string): Promise<string> {
        const buffer = await sharp(inputPath).toBuffer();
        const { format } = await sharp(inputPath).metadata();
        return `data:image/${format};base64,${buffer.toString("base64")}`;
    }
}
