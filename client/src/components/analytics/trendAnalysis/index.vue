<template>
    <main class="trend-analysis-page">
        <h1>Analyse des tendances</h1>

        <section class="selector">
            <h2>Sélection de période</h2>
            <div class="date-selectors">
                <label>
                    De :
                    <select v-model="startMonth">
                        <option disabled value="">Choisir un mois</option>
                        <option
                            v-for="month in availableMonths"
                            :key="month.value"
                            :value="month.value"
                        >
                            {{ month.label }}
                        </option>
                    </select>
                </label>
                <label>
                    À :
                    <select v-model="endMonth">
                        <option disabled value="">Choisir un mois</option>
                        <option
                            v-for="month in availableMonths"
                            :key="month.value"
                            :value="month.value"
                        >
                            {{ month.label }}
                        </option>
                    </select>
                </label>
                <PrimaryButton @click="loadData">Analyser</PrimaryButton>
            </div>
        </section>

        <section v-if="chartData">
            <h2>Évolution des dépenses et revenus</h2>
            <LineChart :data="chartData" :options="chartOptions" />
        </section>

        <section v-if="summary">
            <h2>Résumé</h2>
            <div class="summary">
                <div>Total Revenus : {{ summary.revenues }} €</div>
                <div>Total Dépenses : {{ summary.expenses }} €</div>
                <div>Balance : {{ summary.balance }} €</div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref } from "vue";
import PrimaryButton from "@/components/formulaire/bouton/primary.vue";
import LineChart from "@/components/charts/line.vue";

const availableMonths = [
    { label: "Mars (2025)", value: "2025-03" },
    { label: "Février (2025)", value: "2025-02" },
    { label: "Janvier (2025)", value: "2025-01" },
    { label: "Décembre (2024)", value: "2024-12" },
    // ...
];

const startMonth = ref("");
const endMonth = ref("");

const chartData = ref(null);
const summary = ref(null);

function loadData() {
    if (!startMonth.value || !endMonth.value) {
        alert("Sélectionnez une période valide");
        return;
    }

    // MOCK : tu remplaceras par un vrai fetch
    const selectedRange = ["2024-12", "2025-01", "2025-02", "2025-03"];

    chartData.value = {
        labels: selectedRange,
        datasets: [
            {
                label: "Dépenses (€)",
                borderColor: "#FF6384",
                backgroundColor: "#FF6384",
                data: [500, 600, 550, 700],
                tension: 0.4,
            },
            {
                label: "Revenus (€)",
                borderColor: "#36A2EB",
                backgroundColor: "#36A2EB",
                data: [1200, 1300, 1250, 1400],
                tension: 0.4,
            },
        ],
    };

    summary.value = {
        revenues: 5150,
        expenses: 2350,
        balance: 2800,
    };
}

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom",
        },
        tooltip: {
            mode: "index",
            intersect: false,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};
</script>

<style scoped>
.trend-analysis-page {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem auto;
    max-width: 800px;
}

.selector {
    border: 1px solid var(--background-border);
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: var(--background-app);
}

.date-selectors {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.date-selectors label {
    display: flex;
    flex-direction: column;
}

.summary {
    background-color: var(--background-app);
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid var(--background-border);
}
</style>
