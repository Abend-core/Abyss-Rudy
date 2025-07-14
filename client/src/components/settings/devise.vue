<template>
    <div>
        <SelectInput
            v-model="currency"
            label="Devise par défaut :"
            :options="currencyOptions"
            placeholder="-- Choisir --"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import SelectInput from "@/components/formulaire/input/select.vue";

const currency = ref("€");

const currencyOptions = [
    { value: "€", label: "€ Euro" },
    { value: "$", label: "$ Dollar" },
    { value: "£", label: "£ Livre" },
    { value: "¥", label: "¥ Yen" },
    { value: "₹", label: "₹ Roupie" },
];
</script>
