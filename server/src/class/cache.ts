type CacheEntry<T> = {
    value: T;
    expiresAt?: number;
};
export class Cache<T = unknown> {
    private static store = new Map<string, CacheEntry<any>>();

    /**
     * Ajoute une valeur au cache avec une clé et une durée de vie optionnelle.
     * @param key - La clé du cache.
     * @param value - La valeur à stocker.
     * @param ttlMs - Durée de vie en millisecondes (optionnel).
     */
    static set(key: string, value: any, ttlMs?: number): void {
        const entry: CacheEntry<any> = { value };
        if (ttlMs) {
            entry.expiresAt = Date.now() + ttlMs;
            setTimeout(() => Cache.store.delete(key), ttlMs);
        }
        Cache.store.set(key, entry);
    }

    /**
     * Récupère une valeur du cache par sa clé.
     * @param key - La clé du cache.
     * @returns La valeur si elle existe et n'est pas expirée, sinon undefined.
     */
    static get<T>(key: string): T | undefined {
        const entry = Cache.store.get(key);
        if (!entry) return undefined;
        if (entry.expiresAt && entry.expiresAt < Date.now()) {
            Cache.store.delete(key);
            return undefined;
        }
        return entry.value;
    }

    /**
     * Vérifie si une clé existe dans le cache et n'est pas expirée.
     * @param key - La clé du cache.
     * @returns true si la clé existe, sinon false.
     */
    static has(key: string): boolean {
        return Cache.get(key) !== undefined;
    }

    /**
     * Supprime une entrée du cache par sa clé.
     * @param key - La clé à supprimer.
     */
    static delete(key: string): void {
        Cache.store.delete(key);
    }

    /**
     * Vide complètement le cache.
     */
    static clear(): void {
        Cache.store.clear();
    }
}
