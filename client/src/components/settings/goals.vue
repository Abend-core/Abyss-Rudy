<template>
    <div>
        <ul>
            <li v-for="(goal, idx) in goals" :key="idx">
                Alerte si "{{ goal.category }}" dépasse {{ goal.limit }}
                {{ currency }}
                <button @click="removeGoal(idx)">Supprimer</button>
            </li>
        </ul>

        <div class="form">
            <input v-model="category" placeholder="Catégorie" />
            <input
                v-model.number="limit"
                type="number"
                placeholder="Limite de budget"
            />
            <PrimaryButton @click="addGoal">Ajouter un objectif</PrimaryButton>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import PrimaryButton from "@/components/formulaire/bouton/primary.vue";

const goals = ref([]);
const currency = "€";

const category = ref("");
const limit = ref(0);

const addGoal = () => {
    if (category.value && limit.value > 0) {
        goals.value.push({ category: category.value, limit: limit.value });
        category.value = "";
        limit.value = 0;
    }
};

const removeGoal = (index) => {
    goals.value.splice(index, 1);
};
</script>

<style scoped>
.form {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

input {
    padding: 0.5rem;
}
</style>
