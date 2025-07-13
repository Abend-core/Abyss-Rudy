<template>
    <div class="weekly-chart">
        <h3>Dépenses hebdomadaires</h3>
        <ChartsBar :weeklyData="weeklyData" :currency="currency" />
    </div>
</template>

<script setup>
import ChartsBar from "@/components/charts/bar.vue";

const props = defineProps({
    weeklyData: Array,
    currency: {
        type: String,
        default: "€",
    },
});
</script>

<style scoped>
.weekly-chart {
    background: var(--background-app);
    border-radius: 0.5rem;
    padding: 1rem;
}
</style>
