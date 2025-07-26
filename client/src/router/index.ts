import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes = [
    {
        path: "/",
        component: () => import("@/layouts/default.vue"),
        meta: { authOnly: true }, // Changement ici
        children: [
            { path: "", component: () => import("@/views/user/home.vue") },
            {
                path: "profile",
                component: () => import("@/views/user/profile.vue"),
            },
            {
                path: "settings",
                component: () => import("@/views/user/settings.vue"),
            },
            {
                path: "stats",
                component: () => import("@/views/user/stats.vue"),
            },
            {
                path: "analytics",
                component: () => import("@/views/user/analytics.vue"),
            },
        ],
    },
    {
        path: "/login",
        component: () => import("@/layouts/auth.vue"),
        meta: { guestOnly: true },
        children: [
            { path: "", component: () => import("@/views/auth/login.vue") },
        ],
    },
    {
        path: "/register",
        component: () => import("@/layouts/auth.vue"),
        meta: { guestOnly: true },
        children: [
            { path: "", component: () => import("@/views/auth/register.vue") },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Guard global harmonisé
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = !!authStore.user;

    if (to.meta.authOnly && !isAuthenticated) {
        next("/login");
    } else if (to.meta.guestOnly && isAuthenticated) {
        next("/");
    } else {
        next();
    }
});

export default router;
