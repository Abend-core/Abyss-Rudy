<script setup lang="ts">
import { ref } from "vue";
import TextInput from "@/components/formulaire/input/text.vue";
import PasswordInput from "@/components/formulaire/input/password.vue";
import PrimaryButton from "@/components/formulaire/bouton/primary.vue";
import LogoAbyss from "@/components/logo.vue";
import router from "../../router";

const username = ref("");
const password = ref("");

const submitLogin = () => {
    router.push("/");
};

const goToRegister = () => {
    router.push("/register");
};
</script>

<template>
    <main class="login">
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

        <PrimaryButton @click="submitLogin">Se connecter</PrimaryButton>

        <PrimaryButton @click="goToRegister">S'inscrire</PrimaryButton>
    </main>
</template>

<style scoped>
.login {
    width: 70%;
    margin: auto;
}

.login button {
    width: 100%;
    margin-bottom: 2%;
}
</style>
