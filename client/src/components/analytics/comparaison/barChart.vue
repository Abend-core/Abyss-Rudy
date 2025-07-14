<template>
    <div class="bar-chart">
        <h2>Comparaison Revenus / Dépenses / Solde</h2>
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

const props = defineProps({ data: Object });

const chartData = {
    labels: ["Revenus", "Dépenses", "Solde"],
    datasets: [
        {
            label: props.data.periodA.label,
            backgroundColor: "#36A2EB",
            data: [
                props.data.periodA.revenues,
                props.data.periodA.expenses,
                props.data.periodA.balance,
            ],
        },
        {
            label: props.data.periodB.label,
            backgroundColor: "#FF6384",
            data: [
                props.data.periodB.revenues,
                props.data.periodB.expenses,
                props.data.periodB.balance,
            ],
        },
    ],
};

const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: { y: { beginAtZero: true } },
};
</script>

<style scoped>
.bar-chart {
    background-color: var(--background-app);
    padding: 1rem;
    border-radius: 0.5rem;
}
</style>
