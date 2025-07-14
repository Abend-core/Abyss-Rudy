<template>
    <div>
        <SelectInput
            v-model="selectedTheme"
            label="Choisir le thème :"
            :options="themeOptions"
            placeholder="-- Choisir --"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import SelectInput from "@/components/formulaire/input/select.vue";

const selectedTheme = ref("light");

const themeOptions = [
    { value: "light", label: "Clair" },
    { value: "dark", label: "Sombre" },
];
</script>
