<template>
    <div class="recent-transactions">
        <h3>Dernières transactions</h3>
        <ul>
            <li v-for="tx in transactions" :key="tx.date + tx.description">
                <span>{{ tx.date }} - {{ tx.description }}</span>
                <span :class="tx.type">{{ tx.amount }} {{ currency }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    transactions: Array,
    currency: {
        type: String,
        default: "€",
    },
});
</script>

<style scoped>
.recent-transactions {
    background: var(--background-app);
    border-radius: 0.5rem;
    padding: 1rem;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    display: flex;
    justify-content: space-between;
    margin: 0.4rem 0;
}

.credit {
    color: var(--color-success, green);
}

.debit {
    color: var(--color-error, red);
}
</style>
