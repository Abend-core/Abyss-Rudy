<template>
    <div class="month-selector">
        <label>
            Mois A
            <select v-model="localPeriodA">
                <option disabled value="">Choisir un mois</option>
                <option
                    v-for="month in months"
                    :key="month.value"
                    :value="month.value"
                >
                    {{ month.label }}
                </option>
            </select>
        </label>

        <label>
            Mois B
            <select v-model="localPeriodB">
                <option disabled value="">Choisir un mois</option>
                <option
                    v-for="month in months"
                    :key="month.value"
                    :value="month.value"
                >
                    {{ month.label }}
                </option>
            </select>
        </label>

        <PrimaryButton @click="emitCompare">Comparer</PrimaryButton>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import PrimaryButton from "@/components/formulaire/bouton/primary.vue";

const props = defineProps({
    periodA: String,
    periodB: String,
    months: Array, // 👈 On passe la liste depuis le parent
});

const emits = defineEmits(["update:periodA", "update:periodB", "compare"]);

const localPeriodA = ref(props.periodA);
const localPeriodB = ref(props.periodB);

watch(localPeriodA, (val) => emits("update:periodA", val));
watch(localPeriodB, (val) => emits("update:periodB", val));

function emitCompare() {
    emits("compare");
}
</script>

<style scoped>
.month-selector {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.month-selector label {
    display: flex;
    flex-direction: column;
}
</style>
