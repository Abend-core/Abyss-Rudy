<template>
    <div>
        <ul>
            <li v-for="(item, idx) in expenses" :key="idx">
                {{ item.day }} du mois | {{ item.amount }} {{ currency }} |
                {{ item.title }} ({{ item.type }})
                <PrimaryButton variant="red" @click="removeExpense(idx)"
                    >Supprimer</PrimaryButton
                >
            </li>
        </ul>

        <form class="form" @submit.prevent="addExpense">
            <NumberInput
                v-model.number="day"
                label="Jour du mois"
                placeholder="Jour du mois"
                min="1"
                max="31"
                required
            />

            <NumberInput
                v-model.number="amount"
                label="Montant"
                placeholder="Montant"
                min="0"
                step="0.10"
                required
            />

            <TextInput
                v-model="title"
                label="Intitulé"
                placeholder="Intitulé"
                required
            />

            <SelectInput
                v-model="type"
                :options="typeOptions"
                label="Type de transaction"
                placeholder="-- Choisir --"
                required
            />

            <PrimaryButton type="submit">Ajouter</PrimaryButton>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import PrimaryButton from "@/components/formulaire/bouton/primary.vue";
import NumberInput from "@/components/formulaire/input/number.vue";
import TextInput from "@/components/formulaire/input/text.vue";
import SelectInput from "@/components/formulaire/input/select.vue";

const expenses = ref([]);
const currency = "€";

const day = ref(1);
const amount = ref(0);
const title = ref("");
const type = ref("debit");

const typeOptions = [
    { value: "credit", label: "Crédit (Entrée)" },
    { value: "debit", label: "Débit (Dépense)" },
];

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
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0.5rem;
}
</style>
