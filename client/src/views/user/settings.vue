<template>
    <main class="settings-page">
        <nav class="settings-menu">
            <PrimaryButton
                v-for="section in sections"
                :key="section"
                :variant="selectedSection === section ? 'active' : 'default'"
                @click="selectedSection = section"
            >
                {{ section }}
            </PrimaryButton>
        </nav>

        <div v-if="selectedSection === 'Général'">
            <section>
                <h2>Thème</h2>
                <Theme />
            </section>
            <section>
                <h2>Devise par défaut</h2>
                <Devise />
            </section>
        </div>

        <div v-if="selectedSection === 'Transactions'">
            <section>
                <h2>Catégories</h2>
                <Categories />
            </section>
            <section>
                <h2>Dépenses fixes</h2>
                <FixedExpenses />
            </section>
            <section>
                <h2>Objectifs / Alertes</h2>
                <Goals />
            </section>
        </div>

        <div v-if="selectedSection === 'Sécurité'">
            <section>
                <h2>Authentification</h2>
                <Security />
            </section>
        </div>
    </main>
</template>

<script setup>
import { ref } from "vue";

import Theme from "@/components/settings/theme.vue";
import Devise from "@/components/settings/devise.vue";
import Categories from "@/components/settings/categories.vue";
import FixedExpenses from "@/components/settings/fixedExpenses.vue";
import Goals from "@/components/settings/goals.vue";
import Security from "@/components/settings/authentification.vue";

import PrimaryButton from "@/components/formulaire/bouton/primary.vue";

const sections = ["Général", "Transactions", "Sécurité"];
const selectedSection = ref("Général");
</script>

<style scoped>
.settings-page {
    margin: 0 auto;
}

.settings-menu {
    display: flex;
    gap: 1%;
    width: 80%;
    margin: auto;
    padding: 1%;
}

.settings-menu button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--background-border);
    border-radius: 0.4rem;
    background-color: var(--background-app);
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s ease;
}

.settings-page section {
    width: 80%;
    margin: 2% auto;
    margin-bottom: 2%;
    padding: 1%;
    border: 1px solid var(--background-border);
    border-radius: 0.5rem;
    background-color: var(--background-app);
}
</style>
