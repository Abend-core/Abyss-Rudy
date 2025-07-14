<template>
    <div class="comparaison-page">
        <h1>Comparaison Mois à Mois</h1>

        <!-- Sélecteur de mois -->
        <MonthSelector
            v-model:periodA="periodA"
            v-model:periodB="periodB"
            @compare="handleCompare"
        />

        <section v-if="comparisonData">
            <ComparisonSummary :data="comparisonData" />

            <ComparisonBarChart :data="comparisonData" />

            <ComparisonCategoriesCharts :data="comparisonData" />
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";

import MonthSelector from "@/components/analytics/comparaison/monthSelector.vue";
import ComparisonSummary from "@/components/analytics/comparaison/summary.vue";
import ComparisonBarChart from "@/components/analytics/comparaison/barChart.vue";
import ComparisonCategoriesCharts from "@/components/analytics/comparaison/categoriesCharts.vue";

const periodA = ref("");
const periodB = ref("");

const comparisonData = ref(null);

function handleCompare() {
    // Données simulées (à remplacer plus tard par API ou store)
    comparisonData.value = {
        periodA: {
            label: periodA.value,
            revenues: 3000,
            expenses: 2200,
            balance: 800,
            categories: [
                { name: "Loyer", value: 1000 },
                { name: "Courses", value: 400 },
                { name: "Essence", value: 200 },
            ],
        },
        periodB: {
            label: periodB.value,
            revenues: 2800,
            expenses: 2500,
            balance: 300,
            categories: [
                { name: "Loyer", value: 1000 },
                { name: "Courses", value: 500 },
                { name: "Essence", value: 300 },
            ],
        },
    };
}
</script>

<style scoped>
.comparaison-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
}

.comparaison-page h1 {
    margin: 0;
}

.comparaison-page section {
    margin-top: 2%;
    width: 80%;
    background-color: var(--background-app);
    border: 1px solid var(--background-border);
    border-radius: 0.5rem;
    padding: 1%;
}
</style>
