<script setup>
import { ref, onMounted } from "vue";

const mode = ref("light");

function setMode(newMode) {
    mode.value = newMode;
    document.documentElement.classList.remove("lightMode", "darkMode");
    document.documentElement.classList.add(newMode + "Mode");
    localStorage.setItem("theme", newMode);
}

function toggleMode() {
    setMode(mode.value === "light" ? "dark" : "light");
}

onMounted(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
        setMode(saved);
    } else {
        // Default mode
        setMode("light");
    }
});
</script>

<template>
    <button
        @click="toggleMode"
        :aria-label="`Passer en mode ${mode === 'light' ? 'sombre' : 'clair'}`"
        class="theme-toggle"
    >
        <i :class="mode === 'light' ? 'ri-moon-line' : 'ri-sun-line'"></i>
    </button>
</template>

<style scoped>
.theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: inherit;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.theme-toggle:hover {
    opacity: 0.8;
}
</style>
