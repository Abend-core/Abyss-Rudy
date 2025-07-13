<template>
    <main>
        <TransactionsList
            v-if="!showForm"
            :transactions="transactions"
            @new="showForm = true"
        />

        <FormulaireTransaction
            v-if="showForm"
            @submit="handleSubmit"
            @cancel="showForm = false"
        />
    </main>
</template>

<script setup>
import { ref } from "vue";
import TransactionsList from "@/components/transaction/liste.vue";
import FormulaireTransaction from "@/components/transaction/formulaire.vue";

const showForm = ref(false);

const transactions = ref([
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
    { date: "2025-07-08", description: "Essence", amount: 50, type: "debit" },
]);

function handleSubmit(newTransaction) {
    transactions.value.push(newTransaction);
    showForm.value = false;
}
</script>
