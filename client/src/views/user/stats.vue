<template>
    <main class="stats-page">
        <h1>Statistiques du mois</h1>

        <section>
            <BalanceSummary
                :balance="balance"
                :expenses="expenses"
                :revenues="revenues"
            />
        </section>

        <section>
            <CategoriesDonutChart :data="categoriesData" :currency="currency" />
        </section>

        <section>
            <TopCategories :categories="topCategories" />
        </section>

        <section>
            <RecentTransactions :transactions="recentTransactions" />
        </section>

        <section>
            <WeeklySpendingChart
                :weeklyData="weeklyData"
                :currency="currency"
            />
        </section>
    </main>
</template>

<script setup>
import { ref } from "vue";

import BalanceSummary from "@/components/stats/balanceSummary.vue";
import CategoriesDonutChart from "@/components/stats/categoriesDonutChart.vue";
import TopCategories from "@/components/stats/topCategories.vue";
import RecentTransactions from "@/components/stats/recentTransactions.vue";
import WeeklySpendingChart from "@/components/stats/weeklySpendingChart.vue";

const currency = ref("€");

const balance = ref(1200);
const expenses = ref(800);
const revenues = ref(2000);

const categoriesData = ref([
    { name: "Courses", value: 300 },
    { name: "Loyer", value: 400 },
    { name: "Essence", value: 100 },
]);

const topCategories = ref([
    { name: "Loyer", amount: 400 },
    { name: "Courses", amount: 300 },
    { name: "Essence", amount: 100 },
]);

const recentTransactions = ref([
    {
        date: "2025-07-13",
        description: "Salaire",
        amount: 1500,
        type: "credit",
    },
    {
        date: "2025-07-10",
        description: "Supermarché",
        amount: 75,
        type: "debit",
    },
    {
        date: "2025-07-08",
        description: "Essence",
        amount: 50,
        type: "debit",
    },
]);

const weeklyData = ref([
    { week: "Semaine 1", amount: 150 },
    { week: "Semaine 2", amount: 200 },
    { week: "Semaine 3", amount: 250 },
    { week: "Semaine 4", amount: 300 },
]);
</script>

<style scoped>
.stats-page {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 1%;
}

.stats-page h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
}

.stats-page section {
    border: 1px solid var(--background-border);
    border-radius: 0.5rem;
    width: 70%;
    margin: 1% auto;
    padding: 1%;
    background-color: var(--background-app);
}
</style>
