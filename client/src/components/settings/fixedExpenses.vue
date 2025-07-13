<template>
    <div>
        <ul>
            <li v-for="(item, idx) in expenses" :key="idx">
                {{ item.day }} du mois | {{ item.amount }} {{ currency }} |
                {{ item.title }} ({{ item.type }})
                <button @click="removeExpense(idx)">Supprimer</button>
            </li>
        </ul>

        <div class="form">
            <input
                v-model.number="day"
                type="number"
                placeholder="Jour du mois"
            />
            <input
                v-model.number="amount"
                type="number"
                placeholder="Montant"
            />
            <input v-model="title" placeholder="Intitulé" />
            <select v-model="type">
                <option value="credit">Crédit</option>
                <option value="debit">Débit</option>
            </select>
            <PrimaryButton @click="addExpense">Ajouter</PrimaryButton>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import PrimaryButton from "@/components/formulaire/bouton/primary.vue";

const expenses = ref([]);
const currency = "€";

const day = ref(1);
const amount = ref(0);
const title = ref("");
const type = ref("debit");

const addExpense = () => {
    if (title.value && amount.value > 0 && day.value >= 1 && day.value <= 31) {
        expenses.value.push({
            day: day.value,
            amount: amount.value,
            title: title.value,
            type: type.value,
        });
        title.value = "";
        amount.value = 0;
        day.value = 1;
        type.value = "debit";
    }
};

const removeExpense = (index) => {
    expenses.value.splice(index, 1);
};
</script>

<style scoped>
.form {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

input,
select {
    padding: 0.5rem;
}
</style>
