<template>
    <div class="summary">
        <h2>Résumé Comparatif</h2>
        <div class="totals">
            <div>
                <h3>Mois A ({{ data.periodA.label }})</h3>
                <p>Revenus: {{ data.periodA.revenues }} €</p>
                <p>Dépenses: {{ data.periodA.expenses }} €</p>
                <p>Solde: {{ data.periodA.balance }} €</p>
            </div>
            <div>
                <h3>Mois B ({{ data.periodB.label }})</h3>
                <p>Revenus: {{ data.periodB.revenues }} €</p>
                <p>Dépenses: {{ data.periodB.expenses }} €</p>
                <p>Solde: {{ data.periodB.balance }} €</p>
            </div>
        </div>

        <div class="differences">
            <h3>Différences</h3>
            <p>
                Revenus:
                {{ diff(data.periodA.revenues, data.periodB.revenues) }}
            </p>
            <p>
                Dépenses:
                {{ diff(data.periodA.expenses, data.periodB.expenses) }}
            </p>
            <p>Solde: {{ diff(data.periodA.balance, data.periodB.balance) }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
});

function diff(a, b) {
    const delta = b - a;
    const pct = ((delta / (a || 1)) * 100).toFixed(1);
    const sign = delta > 0 ? "+" : "";
    return `${sign}${delta} € (${sign}${pct}%)`;
}
</script>

<style scoped>
.summary {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.totals {
    display: flex;
    justify-content: space-around;
}
.differences {
    padding: 1rem;
    border-radius: 0.5rem;
}
</style>
