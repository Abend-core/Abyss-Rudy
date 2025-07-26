import fs from "fs/promises";
import path from "path";

/**
 * Classe utilitaire pour la gestion des fichiers et dossiers.
 */
class Directory {
    basePath: string;

    /**
     * Initialise la classe avec un chemin de base.
     * @param basePath - Chemin de base (par défaut : dossier courant).
     */
    constructor(basePath: string = process.cwd()) {
        this.basePath = basePath;
    }

    /**
     * Résout un chemin à partir du chemin de base et de segments.
     * @param segments - Segments de chemin.
     * @returns Chemin absolu.
     */
    resolve(...segments: string[]): string {
        return path.join(this.basePath, ...segments);
    }

    /**
     * Ajoute une extension à un fichier si elle est absente.
     * @param filePath - Chemin du fichier.
     * @param ext - Extension à ajouter.
     * @returns Chemin du fichier avec extension.
     */
    ensureExtension(filePath: string, ext?: string): string {
        if (ext && !filePath.endsWith(ext)) {
            return `${filePath}${ext.startsWith(".") ? "" : "."}${ext}`;
        }
        return filePath;
    }

    // --- Gestion fichiers ---

    /**
     * Crée un fichier avec contenu et extension optionnelle.
     * @param filePath - Chemin du fichier.
     * @param content - Contenu du fichier.
     * @param ext - Extension à ajouter.
     */
    async createFile(
        filePath: string,
        content = "",
        ext?: string
    ): Promise<void> {
        const full = this.resolve(this.ensureExtension(filePath, ext));
        await fs.mkdir(path.dirname(full), { recursive: true });
        await fs.writeFile(full, content, "utf-8");
    }

    /**
     * Lit le contenu d'un fichier texte.
     * @param filePath - Chemin du fichier.
     * @returns Contenu du fichier.
     */
    async readFile(filePath: string): Promise<string> {
        const full = this.resolve(filePath);
        return await fs.readFile(full, "utf-8");
    }

    /**
     * Écrit du texte dans un fichier.
     * @param filePath - Chemin du fichier.
     * @param content - Contenu à écrire.
     */
    async writeFile(filePath: string, content: string): Promise<void> {
        const full = this.resolve(filePath);
        await fs.writeFile(full, content, "utf-8");
    }

    /**
     * Écrit du contenu binaire dans un fichier.
     * @param filePath - Chemin du fichier.
     * @param content - Buffer à écrire.
     */
    async writeBinaryFile(filePath: string, content: Buffer): Promise<void> {
        const full = this.resolve(filePath);
        await fs.mkdir(path.dirname(full), { recursive: true });
        await fs.writeFile(full, content);
    }

    /**
     * Ajoute du texte à la fin d'un fichier.
     * @param filePath - Chemin du fichier.
     * @param content - Texte à ajouter.
     */
    async appendToFile(filePath: string, content: string): Promise<void> {
        const full = this.resolve(filePath);
        await fs.appendFile(full, content, "utf-8");
    }

    /**
     * Supprime un fichier.
     * @param filePath - Chemin du fichier.
     */
    async deleteFile(filePath: string): Promise<void> {
        const full = this.resolve(filePath);
        await fs.unlink(full);
    }

    /**
     * Remplace les variables dans un template texte.
     * @param templatePath - Chemin du template.
     * @param variables - Variables à injecter.
     * @returns Texte rendu.
     */
    async renderTemplate(
        templatePath: string,
        variables: Record<string, any>
    ): Promise<string> {
        let template = await this.readFile(templatePath);

        // Gérer les boucles {{#each items}} ... {{/each}}
        template = template.replace(
            /\{\{#each (.+?)\}\}([\s\S]+?)\{\{\/each\}\}/g,
            (_, arrayName, innerTemplate) => {
                const arr = variables[arrayName.trim()];
                if (!Array.isArray(arr)) return "";
                return arr
                    .map((item) => {
                        // Pour chaque item, remplacer {{property}} dans innerTemplate
                        return innerTemplate.replace(
                            /\{\{(.*?)\}\}/g,
                            (_, key) => {
                                const k = key.trim();
                                // Si la clé existe dans item, retourne sa valeur sinon vide
                                return item[k] !== undefined
                                    ? String(item[k])
                                    : "";
                            }
                        );
                    })
                    .join("");
            }
        );

        // Remplacer les variables simples {{ var }}
        template = template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
            const value = variables[key.trim()];
            return value !== undefined ? String(value) : "";
        });

        return template;
    }

    // --- JSON helpers ---

    /**
     * Lit un fichier JSON.
     * @param filePath - Chemin du fichier.
     * @returns Objet JSON.
     */
    async readJson(filePath: string): Promise<any> {
        const text = await this.readFile(filePath);
        return JSON.parse(text);
    }

    /**
     * Écrit un objet JSON dans un fichier.
     * @param filePath - Chemin du fichier.
     * @param data - Données à écrire.
     */
    async writeJson(filePath: string, data: any): Promise<void> {
        const text = JSON.stringify(data, null, 2);
        await this.writeFile(filePath, text);
    }

    // --- Dossiers ---

    /**
     * Crée un dossier.
     * @param folderPath - Chemin du dossier.
     */
    async createFolder(folderPath: string): Promise<void> {
        const full = this.resolve(folderPath);
        await fs.mkdir(full, { recursive: true });
    }

    /**
     * Supprime un dossier.
     * @param folderPath - Chemin du dossier.
     */
    async deleteFolder(folderPath: string): Promise<void> {
        const full = this.resolve(folderPath);
        await fs.rm(full, { recursive: true, force: true });
    }

    /**
     * Liste les fichiers d'un dossier.
     * @param folderPath - Chemin du dossier.
     * @returns Tableau des noms de fichiers.
     */
    async listFiles(folderPath: string): Promise<string[]> {
        const full = this.resolve(folderPath);
        return await fs.readdir(full);
    }

    /**
     * Retourne le chemin d'un template.
     * @param templateName - Nom du template.
     * @returns Chemin du template.
     */
    getTemplatePath(templateName: string): string {
        return this.resolve("templates", templateName);
    }

    // --- Fichiers utilitaires ---

    /**
     * Vérifie si un fichier ou dossier existe.
     * @param pathToCheck - Chemin à vérifier.
     * @returns true si le chemin existe, sinon false.
     */
    async exists(pathToCheck: string): Promise<boolean> {
        try {
            const full = this.resolve(pathToCheck);
            await fs.access(full);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Déplace un fichier.
     * @param from - Chemin source.
     * @param to - Chemin destination.
     */
    async moveFile(from: string, to: string): Promise<void> {
        await fs.rename(this.resolve(from), this.resolve(to));
    }

    /**
     * Copie un fichier.
     * @param from - Chemin source.
     * @param to - Chemin destination.
     */
    async copyFile(from: string, to: string): Promise<void> {
        await fs.copyFile(this.resolve(from), this.resolve(to));
    }

    // --- Métadonnées ---

    /**
     * Récupère les métadonnées d'un fichier ou dossier.
     * @param targetPath - Chemin cible.
     * @returns Métadonnées (taille, dates, type).
     */
    async getMetadata(targetPath: string): Promise<{
        size: number;
        createdAt: Date;
        modifiedAt: Date;
        isFile: boolean;
        isDirectory: boolean;
    }> {
        const full = this.resolve(targetPath);
        const stat = await fs.stat(full);
        return {
            size: stat.size,
            createdAt: stat.birthtime,
            modifiedAt: stat.mtime,
            isFile: stat.isFile(),
            isDirectory: stat.isDirectory(),
        };
    }
}

export const directory = new Directory();
