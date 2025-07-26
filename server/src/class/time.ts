/**
 * Classe utilitaire pour la gestion du temps et des dates.
 */
export class Time {
    /**
     * Renvoie la date et l'heure actuelles.
     * @returns {Date} Date actuelle.
     */
    public static now(): Date {
        return new Date();
    }

    /**
     * Renvoie le timestamp actuel en millisecondes depuis 1970.
     * @returns {number} Timestamp actuel.
     */
    public static timestamp(): number {
        return Date.now();
    }

    /**
     * Pause l'exécution pendant un nombre de millisecondes donné.
     * @param ms - Durée en millisecondes.
     * @returns {Promise<void>}
     */
    public static sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * Ajoute un nombre de jours à une date donnée.
     * @param date - Date de départ.
     * @param days - Nombre de jours à ajouter (peut être négatif).
     * @returns {Date} Nouvelle date.
     */
    public static addDays(date: Date, days: number): Date {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    }

    /**
     * Soustrait un nombre de minutes à une date donnée.
     * @param date - Date de départ.
     * @param minutes - Nombre de minutes à soustraire.
     * @returns {Date} Nouvelle date.
     */
    public static subMinutes(date: Date, minutes: number): Date {
        const d = new Date(date);
        d.setMinutes(d.getMinutes() - minutes);
        return d;
    }

    /**
     * Formate une date selon un format donné.
     * @param date - Date à formater.
     * @param fmt - Format (iso, YYYY-MM-DD HH:mm:ss, DD/MM/YYYY, YYYY-MM-DD, HH:mm:ss, HH:mm).
     * @returns {string} Date formatée.
     */
    public static format(date: Date, fmt = "iso"): string {
        const pad = (n: number) => n.toString().padStart(2, "0");

        switch (fmt) {
            case "iso":
                return date.toISOString();

            case "YYYY-MM-DD HH:mm:ss":
                return (
                    date.getFullYear() +
                    "-" +
                    pad(date.getMonth() + 1) +
                    "-" +
                    pad(date.getDate()) +
                    " " +
                    pad(date.getHours()) +
                    ":" +
                    pad(date.getMinutes()) +
                    ":" +
                    pad(date.getSeconds())
                );

            case "DD/MM/YYYY":
                return (
                    pad(date.getDate()) +
                    "/" +
                    pad(date.getMonth() + 1) +
                    "/" +
                    date.getFullYear()
                );

            case "YYYY-MM-DD":
                return (
                    date.getFullYear() +
                    "-" +
                    pad(date.getMonth() + 1) +
                    "-" +
                    pad(date.getDate())
                );

            case "HH:mm:ss":
                return (
                    pad(date.getHours()) +
                    ":" +
                    pad(date.getMinutes()) +
                    ":" +
                    pad(date.getSeconds())
                );

            case "HH:mm":
                return pad(date.getHours()) + ":" + pad(date.getMinutes());

            default:
                return date.toString();
        }
    }

    /**
     * Calcule la différence absolue en minutes entre deux dates.
     * @param a - Première date.
     * @param b - Deuxième date.
     * @returns {number} Différence en minutes.
     */
    public static diffInMinutes(a: Date, b: Date): number {
        return Math.abs(a.getTime() - b.getTime()) / 60000;
    }

    /**
     * Indique si une date est dans le passé par rapport à maintenant.
     * @param date - Date à tester.
     * @returns {boolean} Vrai si la date est passée, faux sinon.
     */
    public static isPast(date: Date): boolean {
        return date.getTime() < Date.now();
    }
}
