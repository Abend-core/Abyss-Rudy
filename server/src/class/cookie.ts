export class Cookie {
    /**
     * Récupère la valeur du cookie d'authentification par son nom depuis une chaîne de cookies.
     * @param cookies - La chaîne contenant tous les cookies.
     * @param name - Le nom du cookie d'authentification à récupérer.
     * @returns La valeur du cookie si trouvé, sinon undefined.
     */
    static getCookieAuth(cookies: string, name: string): string | undefined {
        const match = cookies.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? match[2] : undefined;
    }
}
