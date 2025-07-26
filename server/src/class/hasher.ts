import bcrypt from "bcrypt";
import argon2 from "argon2";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

/**
 * Classe utilitaire pour le hachage et la vérification de mots de passe
 * utilisant bcrypt, argon2 ou scrypt.
 */
export class Hasher {
    /**
     * Nombre de tours pour bcrypt.
     */
    private static bcryptRounds = Number(process.env.BCRYPT_ROUNDS) || 10;

    /**
     * Options de configuration pour argon2.
     */
    private static argon2Options: argon2.Options = {
        type: argon2.argon2id,
        memoryCost: Number(process.env.ARGON2_MEMORY) || 2 ** 16,
        timeCost: Number(process.env.ARGON2_TIME) || 3,
        parallelism: Number(process.env.ARGON2_PARALLELISM) || 1,
    };

    /**
     * Options de configuration pour scrypt.
     */
    private static scryptOptions = {
        keylen: Number(process.env.SCRYPT_KEYLEN) || 64,
        cost: Number(process.env.SCRYPT_COST) || 16384,
        blockSize: Number(process.env.SCRYPT_BLOCKSIZE) || 8,
        parallelization: Number(process.env.SCRYPT_PARALLELIZATION) || 1,
    };

    // --- Bcrypt ---

    /**
     * Hache une valeur avec bcrypt.
     * @param value - Chaîne à hacher.
     * @returns Le hachage bcrypt.
     */
    static async bcryptHash(value: string): Promise<string> {
        return bcrypt.hash(value, this.bcryptRounds);
    }

    /**
     * Compare une valeur brute avec un hachage bcrypt.
     * @param value - Valeur brute à vérifier.
     * @param hash - Hachage bcrypt.
     * @returns Vrai si la valeur correspond au hachage.
     */
    static async bcryptCompare(value: string, hash: string): Promise<boolean> {
        return bcrypt.compare(value, hash);
    }

    /**
     * Vérifie si une chaîne est un hachage bcrypt.
     * @param value - Chaîne à tester.
     * @returns Vrai si c’est un hachage bcrypt.
     */
    static isBcryptHash(value: string): boolean {
        return /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(value);
    }

    // --- Argon2 ---

    /**
     * Hache une valeur avec argon2.
     * @param value - Chaîne à hacher.
     * @returns Le hachage argon2.
     */
    static async argon2Hash(value: string): Promise<string> {
        return argon2.hash(value, this.argon2Options);
    }

    /**
     * Vérifie une valeur brute avec un hachage argon2.
     * @param value - Valeur brute à vérifier.
     * @param hash - Hachage argon2.
     * @returns Vrai si la valeur correspond au hachage, sinon faux.
     */
    static async argon2Verify(value: string, hash: string): Promise<boolean> {
        try {
            return await argon2.verify(hash, value);
        } catch {
            return false;
        }
    }

    /**
     * Vérifie si une chaîne est un hachage argon2.
     * @param value - Chaîne à tester.
     * @returns Vrai si c’est un hachage argon2.
     */
    static isArgon2Hash(value: string): boolean {
        return value.startsWith("$argon2");
    }

    // --- Scrypt ---

    /**
     * Hache une valeur avec scrypt.
     * @param value - Chaîne à hacher.
     * @param salt - Sel optionnel (généré aléatoirement si absent).
     * @returns Le hachage au format sel:hash en hexadécimal.
     */
    static scryptHash(value: string, salt: Buffer = randomBytes(16)): string {
        const key = scryptSync(value, salt, this.scryptOptions.keylen);
        return salt.toString("hex") + ":" + key.toString("hex");
    }

    /**
     * Vérifie une valeur brute avec un hachage scrypt.
     * @param value - Valeur brute à vérifier.
     * @param stored - Hachage stocké (format sel:hash).
     * @returns Vrai si la valeur correspond au hachage, sinon faux.
     */
    static scryptVerify(value: string, stored: string): boolean {
        const [saltHex, keyHex] = stored.split(":");
        if (!saltHex || !keyHex) return false;
        const salt = Buffer.from(saltHex, "hex");
        const key = Buffer.from(keyHex, "hex");
        const derivedKey = scryptSync(value, salt, key.length);
        return timingSafeEqual(key, derivedKey);
    }

    /**
     * Vérifie si une chaîne correspond au format d’un hachage scrypt.
     * @param value - Chaîne à tester.
     * @returns Vrai si la chaîne correspond à un hachage scrypt valide.
     */
    static isScryptHash(value: string): boolean {
        return /^[a-f0-9]{32}:[a-f0-9]{128}$/.test(value);
    }

    // --- Interface unifiée ---

    /**
     * Hache une valeur avec l’algorithme spécifié.
     * @param value - Chaîne à hacher.
     * @param algo - Algorithme ("bcrypt", "argon2" ou "scrypt", défaut "bcrypt").
     * @returns Le hachage généré.
     */
    static async hash(
        value: string,
        algo: "bcrypt" | "argon2" | "scrypt" = "bcrypt"
    ): Promise<string> {
        switch (algo) {
            case "argon2":
                return this.argon2Hash(value);
            case "scrypt":
                return this.scryptHash(value);
            default:
                return this.bcryptHash(value);
        }
    }

    /**
     * Détecte automatiquement le type de hachage et vérifie la valeur.
     * @param value - Valeur brute à vérifier.
     * @param hash - Hachage stocké.
     * @returns Vrai si la valeur correspond au hachage, sinon faux.
     */
    static async compare(value: string, hash: string): Promise<boolean> {
        if (this.isBcryptHash(hash)) {
            return this.bcryptCompare(value, hash);
        }
        if (this.isArgon2Hash(hash)) {
            return this.argon2Verify(value, hash);
        }
        if (this.isScryptHash(hash)) {
            return this.scryptVerify(value, hash);
        }
        return false;
    }
}
