<template>
    <div class="weekly-chart">
        <h3>Dépenses hebdomadaires</h3>
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

const props = defineProps({
    weeklyData: {
        type: Array,
        default: () => [],
    },
    currency: {
        type: String,
        default: "€",
    },
});

const chartData = {
    labels: props.weeklyData.map((item) => item.week),
    datasets: [
        {
            label: `Dépenses (${props.currency})`,
            backgroundColor: "#36A2EB",
            data: props.weeklyData.map((item) => item.amount),
        },
    ],
};

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: "bottom",
        },
        tooltip: {
            callbacks: {
                label: (context) =>
                    `${context.dataset.label}: ${context.parsed.y} ${props.currency}`,
            },
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
.weekly-chart {
    background: var(--background-app);
    border-radius: 0.5rem;
    padding: 1rem;
}
</style>
