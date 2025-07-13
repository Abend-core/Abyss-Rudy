import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("@/layouts/default.vue"),
        children: [
            { path: "", component: () => import("@/views/user/home.vue") },
            {
                path: "dashboard",
                component: () => import("@/views/user/dashboard.vue"),
            },
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
        ],
    },
    {
        path: "/login",
        component: () => import("@/layouts/auth.vue"),
        children: [
            { path: "", component: () => import("@/views/auth/login.vue") },
        ],
    },
    {
        path: "/register",
        component: () => import("@/layouts/auth.vue"),
        children: [
            { path: "", component: () => import("@/views/auth/register.vue") },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
