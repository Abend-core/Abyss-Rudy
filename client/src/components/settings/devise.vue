<template>
    <div>
        <label>Devise par défaut :</label>
        <select v-model="currency">
            <option value="€">€ Euro</option>
            <option value="$">$ Dollar</option>
            <option value="£">£ Livre</option>
            <option value="¥">¥ Yen</option>
            <option value="₹">₹ Roupie</option>
        </select>
    </div>
</template>

<script setup>
import { ref } from "vue";
const currency = ref("€");
</script>

<style scoped>
select {
    padding: 0.5rem;
}
</style>
