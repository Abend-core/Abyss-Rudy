<template>
    <main class="budget-alerts-page">
        <h1>Alertes de dépassement budgetaire</h1>

        <section class="summary">
            <p>
                <strong>{{ alerts.length }}</strong> alertes actives ce mois-ci
            </p>
            <p>
                Catégories impactées :
                <span>{{ impactedCategories.join(", ") }}</span>
            </p>
        </section>

        <section class="alerts-list">
            <h2>Liste des alertes</h2>
            <ul>
                <li
                    v-for="alert in alerts"
                    :key="alert.id"
                    :class="{ resolved: alert.resolved }"
                >
                    <div class="alert-info">
                        <p>
                            <strong>{{ alert.category }}</strong> a dépassé le
                            seuil de <strong>{{ alert.threshold }}€</strong>
                        </p>
                        <p>Date : {{ alert.date }}</p>
                        <p>
                            Status :
                            <span>{{
                                alert.resolved ? "Réglée" : "Active"
                            }}</span>
                        </p>
                    </div>
                    <button
                        @click="markResolved(alert.id)"
                        :disabled="alert.resolved"
                    >
                        Marquer comme réglée
                    </button>
                </li>
            </ul>
        </section>
    </main>
</template>

<script setup>
import { ref, computed } from "vue";

// Mocks
const alerts = ref([
    {
        id: 1,
        category: "Courses",
        threshold: 300,
        date: "2025-06-15",
        resolved: false,
    },
    {
        id: 2,
        category: "Loisir",
        threshold: 150,
        date: "2025-06-20",
        resolved: true,
    },
    {
        id: 3,
        category: "Essence",
        threshold: 100,
        date: "2025-06-25",
        resolved: false,
    },
]);

const impactedCategories = computed(() => {
    return [
        ...new Set(
            alerts.value.filter((a) => !a.resolved).map((a) => a.category)
        ),
    ];
});

function markResolved(id) {
    const alert = alerts.value.find((a) => a.id === id);
    if (alert) alert.resolved = true;
}
</script>

<style scoped>
.budget-alerts-page {
    padding: 1rem;
    max-width: 600px;
    margin: 0 auto;
    background: var(--background-app);
    border-radius: 0.5rem;
}

.summary {
    margin-bottom: 1.5rem;
    padding: 1rem;
    border-radius: 0.3rem;
}

.alerts-list ul {
    list-style: none;
    padding: 0;
}

.alerts-list li {
    background: #f8d7da;
    border: 1px solid #f5c2c7;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.alerts-list li.resolved {
    background: #d1e7dd;
    border-color: #badbcc;
    color: #0f5132;
}

.alert-info p {
    margin: 0.2rem 0;
}

button {
    background-color: var(--color-logo-primary);
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    cursor: pointer;
}

button:disabled {
    background-color: grey;
    cursor: default;
}
</style>
