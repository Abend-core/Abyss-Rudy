<template>
    <div class="transactions-container">
        <div class="transactions-list">
            <TransactionCard
                v-for="(tx, index) in transactions"
                :key="index"
                :transaction="tx"
            />
        </div>

        <PrimaryButton class="add-btn" @click="$emit('new')">
            Nouvelle transaction
        </PrimaryButton>
    </div>
</template>

<script setup>
import TransactionCard from "@/components/transaction/card.vue";
import PrimaryButton from "@/components/formulaire/bouton/primary.vue";

const props = defineProps({
    transactions: {
        type: Array,
        required: true,
    },
});

defineEmits(["new"]);
</script>

<style scoped>
.transactions-container {
    margin: auto;
    display: flex;
    flex-direction: column;
    height: 98%;
    padding: 1%;
}

.transactions-list {
    flex: 1;
    overflow-y: auto;
    padding-right: 0.5rem;
}

.add-btn {
    margin-top: 1rem;
    width: 100%;
    padding: 0.8rem;
    border-radius: 0.4rem;
    background-color: var(--color-logo-primary);
    color: var(--color-logo-secondary);
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

.add-btn:hover {
    background-color: var(--color-logo-secondary);
    color: var(--color-logo-primary);
}
</style>
