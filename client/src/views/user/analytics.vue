<template>
    <main class="analytics-page">
        <nav class="analytics-menu">
            <PrimaryButton
                v-for="section in sections"
                :key="section"
                :variant="selectedSection === section ? 'active' : 'default'"
                @click="selectedSection = section"
            >
                {{ section }}
            </PrimaryButton>
        </nav>

        <section v-if="selectedSection === 'Vue comparative'">
            <PeriodComparison />
        </section>

        <section v-if="selectedSection === 'Analyse des tendances'">
            <TrendAnalysis />
        </section>

        <section v-if="selectedSection === 'Alertes / Dépassements'">
            <BudgetAlerts />
        </section>
    </main>
</template>

<script setup>
import { ref } from "vue";

import PeriodComparison from "@/components/analytics/comparaison/index.vue";
import TrendAnalysis from "@/components/analytics/trendAnalysis/index.vue";
import BudgetAlerts from "@/components/analytics/budgetAlerts/index.vue";

import PrimaryButton from "@/components/formulaire/bouton/primary.vue";

const sections = [
    "Vue comparative",
    "Analyse des tendances",
    "Alertes / Dépassements",
];
const selectedSection = ref("Vue comparative");
</script>

<style scoped>
.analytics-page {
    display: flex;
    flex-direction: column;
}

.analytics-menu {
    display: flex;
    gap: 1rem;
    margin: 1% auto;
}

.analytics-menu button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--background-border);
    border-radius: 0.4rem;
    background-color: var(--background-app);
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s ease;
}

.analytics-menu button:hover {
    background-color: var(--background-hover);
}

.analytics-menu button.active {
    background-color: var(--color-logo-primary);
    color: var(--color-logo-secondary);
}

.analytics-page section {
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid var(--background-border);
    border-radius: 0.5rem;
    width: 80%;
    background-color: var(--background-app);
    overflow-y: auto;
}
</style>
