<template>
    <div class="transaction-card">
        <div class="date">{{ transaction.date }}</div>
        <div class="description">{{ transaction.description }}</div>
        <div :class="['amount', transaction.type]">
            {{ transaction.type === "credit" ? "+" : "-"
            }}{{ transaction.amount }} €
        </div>
    </div>
</template>

<script setup>
defineProps({
    transaction: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped>
.transaction-card {
    background: var(--background-app);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
}

.date {
    flex: 1;
    color: #999;
}

.description {
    flex: 3;
    padding: 0 1rem;
}

.amount {
    flex: 1;
    font-weight: bold;
    text-align: right;
}

.amount.credit {
    color: green;
}

.amount.debit {
    color: red;
}
</style>
