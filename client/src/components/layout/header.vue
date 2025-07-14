<script setup>
import ThemeToggle from "@/components/formulaire/bouton/toggleTheme.vue";
import logo from "@/components/logo.vue";
</script>

<template>
    <header>
        <div>
            <logo />

            <h1 class="name">Abyss</h1>
        </div>
        <ThemeToggle />
    </header>
</template>

<style scoped>
header {
    color: var(--color-white-static);
    position: sticky;
    top: 0;
    z-index: 10;
}

header div {
    display: flex;
    gap: 10px;
    align-items: center;
}
.name {
    font-size: 16;
    font-weight: bold;
}

.logo {
    width: 15%;
    height: 15%;
    margin: 0;
}
</style>
