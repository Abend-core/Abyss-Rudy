<template>
    <div>
        <ul>
            <li v-for="(goal, idx) in goals" :key="idx">
                Alerte si "{{ goal.category }}" dépasse {{ goal.limit }}
                {{ currency }}
                <PrimaryButton variant="red" @click="removeGoal(idx)">
                    Supprimer
                </PrimaryButton>
            </li>
        </ul>

        <form class="form" @submit.prevent="addGoal">
            <TextInput
                v-model="category"
                placeholder="Catégorie"
                label="Catégorie"
                required
            />

            <NumberInput
                v-model.number="limit"
                placeholder="Limite de budget"
                label="Limite (€)"
                min="0"
                step="0.10"
                required
            />

            <PrimaryButton type="submit">Ajouter un objectif</PrimaryButton>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import PrimaryButton from "@/components/formulaire/bouton/primary.vue";
import TextInput from "@/components/formulaire/input/text.vue";
import NumberInput from "@/components/formulaire/input/number.vue";

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
    flex-direction: column;
    gap: 0.75rem;
    max-width: 400px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}
</style>
