<template>
    <main class="profile-page">
        <div class="account-summary">
            <h2>Informations du compte</h2>
            <ul>
                <li><strong>Pseudo :</strong> {{ user.username }}</li>
                <li>
                    <strong>Date de création :</strong> {{ user.createdAt }}
                </li>
                <li>
                    <strong>Dernière importation :</strong>
                    {{ user.lastImport ?? "Jamais" }}
                </li>
            </ul>
        </div>

        <div class="actions">
            <PrimaryButton @click="downloadData">
                Télécharger mes données
            </PrimaryButton>

            <PrimaryButton @click="uploadData">
                Importer des données
            </PrimaryButton>

            <PrimaryButton variant="red" @click="deleteAccount">
                Supprimer mon compte
            </PrimaryButton>
        </div>
    </main>
</template>

<script setup>
import { ref } from "vue";
import PrimaryButton from "@/components/formulaire/bouton/primary.vue";

const user = ref({
    username: "JeanDupont",
    createdAt: "2024-03-10",
    lastImport: "2025-07-05",
});

const downloadData = () => {
    console.log("Téléchargement des données...");
    alert("Fonction pour télécharger toutes les transactions au format JSON.");
};

const uploadData = () => {
    // Ici tu proposes un input file pour importer des données
    console.log("Importation des données...");
    alert("Fonction pour importer des transactions depuis un fichier.");
};

const deleteAccount = () => {
    if (
        confirm(
            "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
        )
    ) {
        console.log("Suppression du compte...");
        alert("Compte supprimé !");
    }
};
</script>

<style scoped>
.profile-page {
    color: var(--color-black);
}

.profile-page h1 {
    text-align: center;
    margin-bottom: 1rem;
}

.account-summary {
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 2rem;
}

.account-summary h2 {
    margin-bottom: 0.5rem;
}

.account-summary ul {
    list-style: none;
    padding: 0;
}

.account-summary li {
    margin-bottom: 0.5rem;
}

.actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.danger {
    background-color: red;
    color: var(--color-white-static);
}

.danger:hover {
    background-color: darkred;
}
</style>
