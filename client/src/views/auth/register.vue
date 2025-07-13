<script setup lang="ts">
import { ref } from "vue";
import TextInput from "@/components/formulaire/input/text.vue";
import PasswordInput from "@/components/formulaire/input/password.vue";
import PrimaryButton from "@/components/formulaire/bouton/primary.vue";
import LogoAbyss from "@/components/logo.vue";
import router from "../../router";

const username = ref("");
const password = ref("");

const submitRegister = () => {
    console.log("S'inscrire avec", username.value, password.value);
};

const goToLogin = () => {
    router.push("/login");
};
</script>

<template>
    <main class="register">
        <LogoAbyss />
        <TextInput
            v-model="username"
            label="Pseudo"
            placeholder="Entrez votre pseudo"
        />

        <PasswordInput
            v-model="password"
            label="Mot de passe"
            placeholder="••••••••••"
        />

        <PasswordInput
            v-model="password"
            label="Confirmation du mot de passe"
            placeholder="••••••••••"
        />

        <PrimaryButton @click="submitRegister">S'inscrire</PrimaryButton>
        <PrimaryButton @click="goToLogin" variant="red">Retour</PrimaryButton>
    </main>
</template>

<style scoped>
.register {
    width: 70%;
    margin: auto;
}

.register button {
    width: 100%;
    margin-bottom: 2%;
}

.btn-red {
    background-color: #e53e3e; /* rouge sympa */
    color: white;
}

/* Optionnel : si tu veux aussi gérer le hover */
.btn-red:hover {
    background-color: #c53030;
}
</style>
