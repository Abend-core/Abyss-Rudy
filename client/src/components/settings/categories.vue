<template>
    <form class="form" @submit.prevent="addCategory">
        <TextInput
            v-model="newCategory"
            label="Nouvelle catégorie"
            placeholder="Nouvelle catégorie"
            required
        />
        <PrimaryButton type="submit">Ajouter</PrimaryButton>
    </form>

    <table class="category-table">
        <thead>
            <tr>
                <th>Intitulé</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(cat, idx) in categories" :key="idx">
                <td>{{ cat }}</td>
                <td class="actions">
                    <PrimaryButton variant="default" @click="editCategory(idx)">
                        <i class="ri-edit-line"></i>
                    </PrimaryButton>
                    <PrimaryButton variant="red" @click="removeCategory(idx)">
                        <i class="ri-delete-bin-line"></i>
                    </PrimaryButton>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref } from "vue";
import PrimaryButton from "@/components/formulaire/bouton/primary.vue";
import TextInput from "@/components/formulaire/input/text.vue";

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

const editCategory = (index) => {
    const updated = prompt("Modifier la catégorie :", categories.value[index]);
    if (updated !== null && updated.trim()) {
        categories.value[index] = updated.trim();
    }
};
</script>
<style scoped>
.form {
    margin-bottom: 1.5rem;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    flex-direction: column;
}

.category-table {
    width: 100%;
    border-collapse: collapse;
}

.category-table th,
.category-table td {
    border: 1px solid var(--color-border, #ccc);
    padding: 0.5rem;
    text-align: left;
}

.category-table th {
    background-color: var(--background-app);
}

.actions {
    display: flex;
    gap: 0.5rem;
}

.actions button {
    padding: 0.4rem 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
}
</style>
