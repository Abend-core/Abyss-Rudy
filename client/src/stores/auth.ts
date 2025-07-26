import { defineStore } from "pinia";
import api from "@/services/axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: "" as string,
        user: null as any,
    }),
    actions: {
        async login(email: string, password: string) {
            const { data } = await api.post(
                "/login",
                { email, password },
                { withCredentials: true }
            );
            this.user = data.user;
            // Le token est maintenant dans le cookie, pas besoin de le stocker dans localStorage
        },
        async fetchUser() {
            try {
                const { data } = await api.get("/me", {
                    withCredentials: true,
                });
                this.user = data.user;
            } catch {
                this.user = null;
            }
        },
        async register(email: string, password: string, username: string) {
            try {
                const { data } = await api.post(
                    "/register",
                    { email, password, username },
                    { withCredentials: true }
                );
                this.user = data.user;
                // Optionnel : redirige vers la page d'accueil ou affiche un message
                return true;
            } catch (error: any) {
                console.error(
                    "Erreur d'inscription :",
                    error.response?.data?.message || error.message
                );
                return false;
            }
        },
    },
});
