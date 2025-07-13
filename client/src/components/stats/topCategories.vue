<template>
    <div class="top-categories">
        <h3>Top 3 des dépenses</h3>
        <ul>
            <li v-for="cat in categories" :key="cat.name">
                {{ cat.name }} : {{ cat.amount }} {{ currency }}
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    categories: Array,
    currency: {
        type: String,
        default: "€",
    },
});
</script>

<style scoped>
.top-categories {
    background: var(--background-app);
    border-radius: 0.5rem;
    padding: 1rem;
}
ul {
    list-style: none;
    padding: 0;
}
li {
    margin: 0.3rem 0;
}
</style>
