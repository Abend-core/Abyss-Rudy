<template>
    <div class="form-container">
        <h2>Nouvelle transaction</h2>

        <form @submit.prevent="submit">
            <div class="form-group">
                <label>Type de transaction</label>
                <select v-model="form.type" required>
                    <option disabled value="">-- Choisir --</option>
                    <option value="credit">Crédit (Entrée)</option>
                    <option value="debit">Débit (Dépense)</option>
                </select>
            </div>

            <div class="form-group">
                <label>Date</label>
                <input type="date" v-model="form.date" required />
            </div>

            <div class="form-group">
                <label>Catégorie</label>
                <select v-model="form.category" required>
                    <option disabled value="">-- Choisir --</option>
                    <option v-for="cat in categories" :key="cat" :value="cat">
                        {{ cat }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label>Montant (€)</label>
                <input
                    type="number"
                    v-model.number="form.amount"
                    min="0"
                    step="0.01"
                    required
                />
            </div>

            <div class="form-group">
                <label>Intitulé</label>
                <input
                    type="text"
                    v-model="form.title"
                    placeholder="Intitulé court"
                    required
                />
            </div>

            <div class="form-group">
                <label>Commentaire</label>
                <textarea
                    v-model="form.comment"
                    placeholder="Commentaire facultatif"
                ></textarea>
            </div>

            <div class="buttons">
                <button
                    type="button"
                    class="secondary-btn"
                    @click="$emit('cancel')"
                >
                    Annuler
                </button>
                <button type="submit" class="primary-btn">Enregistrer</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive } from "vue";

const emit = defineEmits(["submit", "cancel"]);

const categories = [
    "Salaire",
    "Courses",
    "Loyer",
    "Loisirs",
    "Factures",
    "Transports",
    "Santé",
    "Autre",
];

const today = new Date().toISOString().split("T")[0];

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

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.form-group label {
    margin-bottom: 0.4rem;
    font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 0.5rem;
    border: 1px solid var(--color-logo-primary);
    border-radius: 0.4rem;
    background-color: var(--color-white);
    color: var(--color-black);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--color-logo-secondary);
    box-shadow: 0 0 0 2px var(--color-logo-secondary);
}

textarea {
    resize: vertical;
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
</style>
