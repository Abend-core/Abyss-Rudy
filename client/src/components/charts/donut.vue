<template>
    <div class="donut-chart">
        <h3 v-if="title">{{ title }}</h3>
        <Doughnut :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
    data: {
        type: Array,
        default: () => [],
    },
    title: {
        type: String,
        default: "",
    },
    currency: {
        type: String,
        default: "€",
    },
});

const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
];

const chartData = {
    labels: props.data.map((item) => item.name),
    datasets: [
        {
            backgroundColor: colors,
            data: props.data.map((item) => item.value),
        },
    ],
};

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom",
        },
        tooltip: {
            callbacks: {
                label: (context) =>
                    `${context.label}: ${context.parsed} ${props.currency}`,
            },
        },
    },
};
</script>

<style scoped>
.donut-chart {
    background: var(--background-app);
    border-radius: 0.5rem;
    padding: 1rem;
}
</style>
