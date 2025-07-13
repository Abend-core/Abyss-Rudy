<template>
    <div class="donut-chart">
        <h3>Répartition des catégories</h3>
        <ChartsDonut :data="data" :currency="currency" />
    </div>
</template>

<script setup>
import ChartsDonut from "@/components/charts/donut.vue";

const props = defineProps({
    data: Array,
    currency: {
        type: String,
        default: "€",
    },
});
</script>

<style scoped>
.donut-chart {
    background: var(--background-app);
    border-radius: 0.5rem;
    padding: 1rem;
}
</style>
