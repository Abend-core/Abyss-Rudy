<template>
    <div class="categories-charts">
        <h2>Répartition des catégories</h2>
        <div class="charts">
            <Donut
                :data="data.periodA.categories"
                :title="data.periodA.label"
            />
            <Donut
                :data="data.periodB.categories"
                :title="data.periodB.label"
            />
        </div>
    </div>
</template>

<script setup>
import Donut from "@/components/charts/donut.vue";

const props = defineProps({
    data: Object,
});
</script>

<style scoped>
.categories-charts {
    background-color: var(--background-app);
    padding: 1rem;
    border-radius: 0.5rem;
}
.charts {
    display: flex;
    justify-content: space-around;
    gap: 2rem;
}
.charts > * {
    width: 50%;
}
</style>
