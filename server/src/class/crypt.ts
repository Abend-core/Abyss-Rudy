import {
    createCipheriv,
    createDecipheriv,
    randomBytes,
    scryptSync,
    timingSafeEqual,
} from "crypto";

/**
 * Classe utilitaire pour le chiffrement et le déchiffrement AES-256.
 */
export class Crypt {
    private static keyLength = 32; // AES-256 => 32 bytes
    private static ivLength = 16; // Standard pour AES

    /**
     * Génère une clé à partir d'une graine.
     * @param seed - La graine pour générer la clé.
     * @returns La clé sous forme de Buffer.
     */
    static generateKey(seed: string): Buffer {
        return scryptSync(seed, "cipher_salt", Crypt.keyLength);
    }

    /**
     * Génère une clé aléatoire.
     * @returns La clé sous forme de Buffer.
     */
    static generateRandomKey(): Buffer {
        return randomBytes(Crypt.keyLength);
    }

    /**
     * Génère un IV aléatoire.
     * @returns L'IV sous forme de Buffer.
     */
    static generateIV(): Buffer {
        return randomBytes(Crypt.ivLength);
    }

    /**
     * Chiffre une chaîne de caractères avec une clé.
     * @param plaintext - Le texte à chiffrer.
     * @param key - La clé de chiffrement.
     * @returns Le texte chiffré (IV:chiffrement).
     */
    static encrypt(plaintext: string, key: Buffer): string {
        const iv = Crypt.generateIV();
        const cipher = createCipheriv("aes-256-cbc", key, iv);
        const encrypted = Buffer.concat([
            cipher.update(plaintext, "utf8"),
            cipher.final(),
        ]);
        return iv.toString("hex") + ":" + encrypted.toString("hex");
    }

    /**
     * Déchiffre une chaîne chiffrée avec une clé.
     * @param cipherText - Le texte chiffré (IV:chiffrement).
     * @param key - La clé de déchiffrement.
     * @returns Le texte déchiffré.
     */
    static decrypt(cipherText: string, key: Buffer): string {
        const [ivHex, dataHex] = cipherText.split(":");
        if (!ivHex || !dataHex)
            throw new Error("Format invalide pour le texte chiffré.");

        const iv = Buffer.from(ivHex, "hex");
        const encrypted = Buffer.from(dataHex, "hex");

        const decipher = createDecipheriv("aes-256-cbc", key, iv);
        const decrypted = Buffer.concat([
            decipher.update(encrypted),
            decipher.final(),
        ]);
        return decrypted.toString("utf8");
    }

    /**
     * Chiffre une chaîne avec une clé et un IV donné.
     * @param plaintext - Le texte à chiffrer.
     * @param key - La clé de chiffrement.
     * @param iv - L'IV à utiliser.
     * @returns Le texte chiffré en hexadécimal.
     */
    static encryptWithIV(plaintext: string, key: Buffer, iv: Buffer): string {
        const cipher = createCipheriv("aes-256-cbc", key, iv);
        const encrypted = Buffer.concat([
            cipher.update(plaintext, "utf8"),
            cipher.final(),
        ]);
        return encrypted.toString("hex");
    }

    /**
     * Déchiffre une chaîne hexadécimale avec une clé et un IV donné.
     * @param encryptedHex - Le texte chiffré en hexadécimal.
     * @param key - La clé de déchiffrement.
     * @param iv - L'IV à utiliser.
     * @returns Le texte déchiffré.
     */
    static decryptWithIV(
        encryptedHex: string,
        key: Buffer,
        iv: Buffer
    ): string {
        const encrypted = Buffer.from(encryptedHex, "hex");
        const decipher = createDecipheriv("aes-256-cbc", key, iv);
        const decrypted = Buffer.concat([
            decipher.update(encrypted),
            decipher.final(),
        ]);
        return decrypted.toString("utf8");
    }

    /**
     * Vérifie si une chaîne est au format chiffré attendu.
     * @param input - La chaîne à vérifier.
     * @returns true si le format est valide, sinon false.
     */
    static isValidEncryptedString(input: string): boolean {
        return /^[a-f0-9]{32}:[a-f0-9]+$/i.test(input);
    }

    /**
     * Compare deux chaînes de façon sécurisée.
     * @param a - Première chaîne.
     * @param b - Deuxième chaîne.
     * @returns true si les chaînes sont identiques, sinon false.
     */
    static safeCompare(a: string, b: string): boolean {
        const buffA = Buffer.from(a);
        const buffB = Buffer.from(b);
        if (buffA.length !== buffB.length) return false;
        return timingSafeEqual(buffA, buffB);
    }
}
