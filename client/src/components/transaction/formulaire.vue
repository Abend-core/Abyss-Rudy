<template>
    <div class="form-container">
        <h2>Nouvelle transaction</h2>

        <form @submit.prevent="submit">
            <SelectInput
                v-model="form.type"
                :options="typeOptions"
                label="Type de transaction"
                placeholder="-- Choisir --"
                required
            />

            <DateInput
                v-model="form.date"
                label="Date"
                :min="minDate"
                required
            />

            <SelectInput
                v-model="form.category"
                :options="categoryOptions"
                label="Catégorie"
                placeholder="-- Choisir --"
                required
            />

            <NumberInput
                v-model.number="form.amount"
                label="Montant (€)"
                min="0"
                step="0.10"
                placeholder="0.00"
                required
            />

            <TextInput
                v-model="form.title"
                label="Intitulé"
                placeholder="Intitulé court"
                required
            />

            <TextareaInput
                v-model="form.comment"
                label="Commentaire"
                placeholder="Commentaire facultatif"
                rows="4"
            />
            <PrimaryButton type="submit"> Enregistrer </PrimaryButton>
            <PrimaryButton variant="red" @click="$emit('cancel')" type="button">
                Annuler
            </PrimaryButton>
        </form>
    </div>
</template>

<script setup>
import SelectInput from "@/components/formulaire/input/select.vue";
import DateInput from "@/components/formulaire/input/date.vue";
import NumberInput from "@/components/formulaire/input/number.vue";
import TextInput from "@/components/formulaire/input/text.vue";
import TextareaInput from "@/components/formulaire/input/textarea.vue";
import PrimaryButton from "@/components/formulaire/bouton/primary.vue";

import { reactive } from "vue";

const emit = defineEmits(["submit", "cancel"]);

const typeOptions = [
    { value: "credit", label: "Crédit (Entrée)" },
    { value: "debit", label: "Débit (Dépense)" },
];

const categoryOptions = [
    "Salaire",
    "Courses",
    "Loyer",
    "Loisirs",
    "Factures",
    "Transports",
    "Santé",
    "Autre",
].map((c) => ({ value: c, label: c }));

const today = new Date().toISOString().split("T")[0];
const minDate = "2000-01-01"; // optionnel

const form = reactive({
    type: "",
    date: today,
    category: "",
    amount: null,
    title: "",
    comment: "",
});

function submit() {
    if (
        !form.type ||
        !form.date ||
        !form.category ||
        !form.amount ||
        !form.title
    ) {
        alert("Merci de remplir tous les champs obligatoires !");
        return;
    }

    emit("submit", { ...form });
}
</script>

<style scoped>
.form-container {
    margin: auto;
    padding: 1%;
    background-color: var(--background-app);
    border-radius: 0.6rem;
    color: var(--color-black);
}

.form-container form {
    margin: auto;
    width: 80%;
}

h2 {
    text-align: center;
    margin-bottom: 1.5rem;
}

.buttons {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1rem;
}

.primary-btn,
.secondary-btn {
    flex: 1;
    padding: 0.7rem;
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    font-weight: bold;
}

.primary-btn {
    background-color: var(--color-logo-primary);
    color: var(--color-logo-secondary);
}

.primary-btn:hover {
    background-color: var(--color-logo-secondary);
    color: var(--color-logo-primary);
}

.secondary-btn {
    background-color: var(--color-logo2-primary);
    color: var(--color-white-static);
}

.secondary-btn:hover {
    background-color: var(--color-logo2-secondary);
    color: var(--color-black-static);
}

form button {
    width: 100%;
    margin-bottom: 2%;
}
</style>
