/**
 * Structure de base pour les statistiques d'un endpoint.
 */
type EndpointStats = {
    count: number;
    totalTime: number;
    errors: number;
};

/**
 * Collecteur de métriques pour suivre les performances et les erreurs par endpoint.
 */
export class MetricsCollector {
    /**
     * Stockage des statistiques internes.
     */
    private static stats: Record<string, EndpointStats> = {};

    /**
     * Enregistre une requête pour un endpoint donné.
     * @param endpoint - Nom ou route de l'endpoint (ex: GET /api/users).
     * @param duration - Durée de la requête en millisecondes.
     * @param status - Code HTTP de la réponse.
     */
    public static track(
        endpoint: string,
        duration: number,
        status: number
    ): void {
        if (!this.stats[endpoint]) {
            this.stats[endpoint] = {
                count: 0,
                totalTime: 0,
                errors: 0,
            };
        }

        const endpointStats = this.stats[endpoint];
        endpointStats.count += 1;
        endpointStats.totalTime += duration;

        if (status >= 400) {
            endpointStats.errors += 1;
        }
    }

    /**
     * Retourne un résumé des statistiques collectées.
     * @returns Un objet contenant, par endpoint, le nombre d'appels, le temps moyen et le taux d'erreur.
     */
    public static getStats(): Record<
        string,
        { count: number; averageTime: number; errorRate: number }
    > {
        const summary: Record<string, any> = {};

        for (const [endpoint, data] of Object.entries(this.stats)) {
            summary[endpoint] = {
                count: data.count,
                averageTime: parseFloat(
                    (data.totalTime / data.count).toFixed(2)
                ),
                errorRate: parseFloat((data.errors / data.count).toFixed(2)),
            };
        }

        return summary;
    }

    /**
     * Réinitialise toutes les statistiques enregistrées.
     */
    public static reset(): void {
        this.stats = {};
    }

    /**
     * Retourne les statistiques formatées pour l'affichage dans un template.
     * @returns Un tableau d'objets contenant les données formatées pour chaque endpoint.
     */
    public static getStatsForTemplate(): Array<{
        endpoint: string;
        count: number;
        averageTime: number;
        errorRate: number;
        statusClass: string;
    }> {
        const result = [];

        for (const [endpoint, data] of Object.entries(this.stats)) {
            const errorRate = data.errors / data.count;
            let statusClass = "2xx";
            if (errorRate >= 1) statusClass = "5xx";
            else if (errorRate > 0) statusClass = "4xx";

            result.push({
                endpoint,
                count: data.count,
                averageTime: parseFloat(
                    (data.totalTime / data.count).toFixed(2)
                ),
                errorRate: parseFloat(errorRate.toFixed(2)),
                statusClass,
            });
        }

        return result;
    }
}
