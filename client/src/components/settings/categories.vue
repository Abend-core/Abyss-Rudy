<template>
    <div>
        <ul>
            <li v-for="(cat, idx) in categories" :key="idx">
                {{ cat }}
                <button @click="removeCategory(idx)">Supprimer</button>
            </li>
        </ul>

        <input v-model="newCategory" placeholder="Nouvelle catégorie" />
        <PrimaryButton @click="addCategory">Ajouter</PrimaryButton>
    </div>
</template>

<script setup>
import { ref } from "vue";
import PrimaryButton from "@/components/formulaire/bouton/primary.vue";

const categories = ref(["Alimentation", "Transport", "Loisirs"]);
const newCategory = ref("");

const addCategory = () => {
    if (newCategory.value.trim()) {
        categories.value.push(newCategory.value.trim());
        newCategory.value = "";
    }
};

const removeCategory = (index) => {
    categories.value.splice(index, 1);
};
</script>

<style scoped>
ul {
    list-style: none;
    padding: 0;
}

li {
    margin-bottom: 0.5rem;
}

input {
    margin-top: 1rem;
    padding: 0.5rem;
}
</style>
