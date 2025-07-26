import dns from "dns/promises";
import os from "os";
import https from "https";

export class Network {
    /**
     * Récupère l'adresse IP locale IPv4 non interne de la machine.
     * @returns {string} L'adresse IP locale, ou "127.0.0.1" si aucune trouvée.
     */
    public static getLocalIP(): string {
        const ifaces = os.networkInterfaces();
        for (const iface of Object.values(ifaces)) {
            if (!iface) continue;
            for (const info of iface) {
                if (info.family === "IPv4" && !info.internal) {
                    return info.address;
                }
            }
        }
        return "127.0.0.1";
    }

    /**
     * Récupère l'adresse IP publique de la machine via un service externe.
     * @returns {Promise<string>} Promise résolue avec l'adresse IP publique.
     */
    public static async getPublicIP(): Promise<string> {
        return new Promise((resolve, reject) => {
            https
                .get("https://api.ipify.org", (res) => {
                    let data = "";
                    res.on("data", (chunk) => (data += chunk));
                    res.on("end", () => resolve(data.trim()));
                })
                .on("error", reject);
        });
    }

    /**
     * Vérifie si une chaîne est une adresse IPv4 valide (simple regex).
     * @param ip - Chaîne à tester.
     * @returns {boolean} true si c'est une IPv4, false sinon.
     */
    public static isIPv4(ip: string): boolean {
        return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
    }

    /**
     * Vérifie si une chaîne est une adresse IPv6 valide (simple regex).
     * @param ip - Chaîne à tester.
     * @returns {boolean} true si c'est une IPv6, false sinon.
     */
    public static isIPv6(ip: string): boolean {
        return /^[0-9a-fA-F:]+$/.test(ip);
    }

    /**
     * Effectue un "ping" via résolution DNS (substitut simple, sans ICMP).
     * @param host - Nom de domaine ou IP à tester.
     * @returns {Promise<boolean>} true si résolution réussie, false sinon.
     */
    public static async ping(host: string): Promise<boolean> {
        try {
            const result = await dns.lookup(host);
            return !!result.address;
        } catch {
            return false;
        }
    }

    /**
     * Résout un nom de domaine en adresses IP.
     * @param hostname - Nom de domaine à résoudre.
     * @returns {Promise<string[]>} Tableau d'adresses IP, vide si échec.
     */
    public static async resolveDNS(hostname: string): Promise<string[]> {
        try {
            return await dns.resolve(hostname);
        } catch {
            return [];
        }
    }
}
