<template>
    <footer class="footer-navbar">
        <NavbarButton
            icon="ri-settings-3-line"
            :active="isActive('settings')"
            aria-label="Paramètres"
            @click="goTo('settings')"
        />
        <NavbarButton
            icon="ri-bar-chart-line"
            :active="isActive('stats')"
            aria-label="Statistiques"
            @click="goTo('stats')"
        />
        <NavbarButton
            icon="ri-home-line"
            :active="isActive('home')"
            aria-label="Accueil"
            @click="goTo('home')"
        />
        <NavbarButton
            icon="ri-pie-chart-line"
            :active="isActive('analytics')"
            aria-label="Analytics"
            @click="goTo('analytics')"
        />
        <NavbarButton
            icon="ri-user-line"
            :active="isActive('profile')"
            aria-label="Profil"
            @click="goTo('profile')"
        />
    </footer>
</template>

<script setup>
import NavbarButton from "@/components/formulaire/bouton/navbar.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

function goTo(page) {
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
</style>
