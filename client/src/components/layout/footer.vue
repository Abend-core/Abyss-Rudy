<template>
    <footer class="footer-navbar">
        <button
            @click="goTo('settings')"
            :class="{ active: isActive('settings') }"
            aria-label="Paramètres"
        >
            <i class="ri-settings-3-line"></i>
        </button>
        <button
            @click="goTo('stats')"
            :class="{ active: isActive('stats') }"
            aria-label="Statistiques"
        >
            <i class="ri-bar-chart-line"></i>
        </button>
        <button
            @click="goTo('home')"
            :class="{ active: isActive('home') }"
            aria-label="Accueil"
        >
            <i class="ri-home-line"></i>
        </button>
        <button
            @click="goTo('analytics')"
            :class="{ active: isActive('analytics') }"
            aria-label="Analytics"
        >
            <i class="ri-pie-chart-line"></i>
        </button>
        <button
            @click="goTo('profile')"
            :class="{ active: isActive('profile') }"
            aria-label="Profil"
        >
            <i class="ri-user-line"></i>
        </button>
    </footer>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

function goTo(page) {
    // Correspondance entre nom simple et route réelle
    const routesMap = {
        settings: "/settings",
        stats: "/stats",
        home: "/",
        analytics: "/analytics",
        profile: "/profile",
    };
    const path = routesMap[page];
    if (path) router.push(path);
}

function isActive(page) {
    const routesMap = {
        settings: "/settings",
        stats: "/stats",
        home: "/",
        analytics: "/analytics",
        profile: "/profile",
    };
    return route.path === routesMap[page];
}
</script>

<style scoped>
.footer-navbar {
    background-color: var(--background-app);
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 2% 0%;
}

.footer-navbar button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-black);
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    transition: color 0.3s ease;
}

.footer-navbar button.active,
.footer-navbar button:hover {
    color: var(--color-logo-primary);
}
</style>
