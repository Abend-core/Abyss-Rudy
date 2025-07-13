<template>
    <div>
        <label>Choisir le thème :</label>
        <select v-model="selectedTheme">
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
        </select>
    </div>
</template>

<script setup>
import { ref } from "vue";

const selectedTheme = ref("light");
</script>

<style scoped>
select {
    padding: 0.5rem;
}
</style>
