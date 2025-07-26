import QR from "qrcode";

export class QRCode {
    /**
     * Génère un DataURL (image en base64) d’un QR code à partir d’une chaîne.
     * @param data - Données à encoder dans le QR code.
     * @returns {Promise<string>} DataURL du QR code.
     */
    public static async toDataURL(data: string): Promise<string> {
        return await QR.toDataURL(data);
    }

    /**
     * Génère un buffer binaire (image) d’un QR code à partir d’une chaîne.
     * @param data - Données à encoder dans le QR code.
     * @returns {Promise<Buffer>} Buffer contenant l’image du QR code.
     */
    public static async toBuffer(data: string): Promise<Buffer> {
        return await QR.toBuffer(data);
    }

    /**
     * Génère un QR code au format SVG.
     * @param data - Données à encoder dans le QR code.
     * @returns {Promise<string>} Chaîne SVG représentant le QR code.
     */
    public static async toSVG(data: string): Promise<string> {
        return await QR.toString(data, { type: "svg" });
    }

    /**
     * Génère un QR code affichable dans un terminal.
     * @param data - Données à encoder dans le QR code.
     * @returns {Promise<string>} Chaîne ASCII du QR code pour terminal.
     */
    public static async toTerminal(data: string): Promise<string> {
        return await QR.toString(data, { type: "terminal" });
    }

    /**
     * Crée un lien URL simple pour encodage dans un QR code.
     * @param url - URL à utiliser.
     * @returns {string} Lien URL.
     */
    public static createLink(url: string): string {
        return url;
    }

    /**
     * Crée un lien mailto à encoder dans un QR code.
     * @param to - Adresse email destinataire.
     * @param subject - Sujet de l’email.
     * @param body - Corps du message.
     * @returns {string} Lien mailto complet.
     */
    public static createEmail(to: string, subject = "", body = ""): string {
        return `mailto:${to}?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;
    }

    /**
     * Crée un lien SMS à encoder dans un QR code.
     * @param number - Numéro de téléphone.
     * @param message - Message SMS.
     * @returns {string} Lien SMS complet.
     */
    public static createSMS(number: string, message = ""): string {
        return `sms:${number}?body=${encodeURIComponent(message)}`;
    }

    /**
     * Crée un lien pour appel téléphonique à encoder dans un QR code.
     * @param number - Numéro de téléphone.
     * @returns {string} Lien tel complet.
     */
    public static createPhoneCall(number: string): string {
        return `tel:${number}`;
    }

    /**
     * Crée une chaîne de connexion WiFi pour QR code.
     * @param ssid - Nom du réseau WiFi.
     * @param password - Mot de passe WiFi.
     * @param type - Type de sécurité (WPA ou WEP).
     * @returns {string} Chaîne WiFi formatée pour QR code.
     */
    public static createWifi(
        ssid: string,
        password: string,
        type: "WPA" | "WEP" = "WPA"
    ): string {
        return `WIFI:T:${type};S:${ssid};P:${password};;`;
    }
}
