<template>
    <label>
        Changer le mot de passe :
        <inputPassword
            v-model="secondaryPassword"
            type="password"
            placeholder="********"
        />
    </label>
    <PrimaryButton @click="save">Sauvegarder</PrimaryButton>
</template>

<script setup>
import { ref } from "vue";
import PrimaryButton from "@/components/formulaire/bouton/primary.vue";
import inputPassword from "@/components/formulaire/input/password.vue";

const secondaryPassword = ref("");

const save = () => {
    alert(`Mot de passe MFA enregistré : ${secondaryPassword.value}`);
    secondaryPassword.value = "";
};
</script>

<style scoped>
input {
    margin-top: 0.5rem;
    padding: 0.5rem;
    width: 100%;
}
</style>
