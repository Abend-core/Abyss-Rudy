import { defineStore } from "pinia";
import api from "@/services/axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: "" as string,
        user: null as any,
    }),
    actions: {
        async login(email: string, password: string) {
            const { data } = await api.post("/login", { email, password });
            this.token = data.token;
            this.user = data.user;

            // Optionnel : Sauvegarder dans localStorage
            localStorage.setItem("token", this.token);
        },
    },
});
