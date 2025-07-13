<template>
    <div class="balance-summary">
        <div class="item">
            <h3>Solde actuel</h3>
            <p class="balance">{{ balance }} {{ currency }}</p>
        </div>
        <div class="item">
            <h4>Revenus</h4>
            <p class="credit">+{{ revenues }} {{ currency }}</p>
        </div>
        <div class="item">
            <h4>Dépenses</h4>
            <p class="debit">-{{ expenses }} {{ currency }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    balance: Number,
    expenses: Number,
    revenues: Number,
    currency: {
        type: String,
        default: "€",
    },
});
</script>

<style scoped>
.balance-summary {
    display: flex;
    justify-content: space-around;
    text-align: center;
    background: var(--background-app);
    border-radius: 0.5rem;
    padding: 1rem;
}

.item h3,
.item h4 {
    margin: 0.2rem 0;
}

.balance {
    font-size: 1.5rem;
    font-weight: bold;
}

.credit {
    color: var(--color-success, green);
}

.debit {
    color: var(--color-error, red);
}
</style>
