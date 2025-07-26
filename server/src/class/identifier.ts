import {
    v4 as uuidv4,
    v7 as uuidv7,
    validate as uuidValidate,
    version as uuidVersion,
} from "uuid";
import { randomBytes } from "crypto";
import { customAlphabet, nanoid as defaultNanoid } from "nanoid";

const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

type TokenEncoding = "hex" | "base64";

interface SlugOptions {
    prefix?: string;
    timestamp?: boolean;
}

/**
 * Classe utilitaire pour générer des UUID, tokens, NanoIDs, slugs et identifiants uniques.
 */
export class Identifier {
    /**
     * Longueur par défaut des tokens (en octets).
     */
    private static defaultLength: number =
        Number(process.env.IDENTIFIER_TOKEN_LENGTH) || 16;

    /**
     * Génère un UUID version 4.
     * @returns Une chaîne UUID v4.
     */
    static uuidV4(): string {
        return uuidv4();
    }

    /**
     * Génère un UUID version 7.
     * @returns Une chaîne UUID v7.
     */
    static uuidV7(): string {
        return uuidv7();
    }

    /**
     * Vérifie si une chaîne est un UUID valide.
     * @param uuid - Chaîne à valider.
     * @returns Vrai si la chaîne est un UUID valide.
     */
    static isValidUUID(uuid: string): boolean {
        return uuidValidate(uuid);
    }

    /**
     * Vérifie si un UUID est de version 4.
     * @param uuid - Chaîne UUID à vérifier.
     * @returns Vrai si c’est un UUID v4.
     */
    static isUUIDv4(uuid: string): boolean {
        return uuidValidate(uuid) && uuidVersion(uuid) === 4;
    }

    /**
     * Vérifie si un UUID est de version 7.
     * @param uuid - Chaîne UUID à vérifier.
     * @returns Vrai si c’est un UUID v7.
     */
    static isUUIDv7(uuid: string): boolean {
        return uuidValidate(uuid) && uuidVersion(uuid) === 7;
    }

    /**
     * Génère un token aléatoire avec longueur et encodage spécifiés.
     * @param length - Longueur en octets (par défaut : 16).
     * @param encoding - Encodage de sortie, soit 'hex' soit 'base64'.
     * @returns Le token encodé en chaîne de caractères.
     */
    static generateToken(
        length: number = this.defaultLength,
        encoding: TokenEncoding = "hex"
    ): string {
        return randomBytes(length).toString(encoding);
    }

    /**
     * Génère un token aléatoire en base62.
     * @param length - Nombre d'octets à générer (par défaut : 16).
     * @returns Une chaîne encodée en base62.
     */
    static generateBase62Token(length: number = this.defaultLength): string {
        const bytes = randomBytes(length);
        let result = "";
        for (let i = 0; i < bytes.length; i++) {
            result += BASE62[bytes[i] % 62];
        }
        return result;
    }

    /**
     * Génère un NanoID aléatoire.
     * @param length - Longueur du NanoID (par défaut : 21).
     * @returns Une chaîne NanoID aléatoire.
     */
    static generateNanoId(length: number = 21): string {
        return defaultNanoid(length);
    }

    /**
     * Génère un slug avec un préfixe et une date optionnels.
     * @param options - Options contenant un préfixe et un flag timestamp.
     * @returns Un slug au format prefix_yyyymmdd_token.
     */
    static generateSlug(options: SlugOptions = {}): string {
        const short = this.generateBase62Token(8);
        const datePart = options.timestamp
            ? new Date().toISOString().slice(0, 10).replace(/-/g, "")
            : null;

        return [options.prefix, datePart, short].filter(Boolean).join("_");
    }

    /**
     * Génère un ensemble complet d’identifiants uniques (UUID, token, NanoID, slug).
     * @returns Un objet contenant plusieurs formats d'identifiants.
     */
    static generateTokenSet() {
        return {
            uuid: this.uuidV7(),
            shortId: this.generateNanoId(12),
            token: this.generateToken(32),
            slug: this.generateSlug({ prefix: "id", timestamp: true }),
        };
    }
}
