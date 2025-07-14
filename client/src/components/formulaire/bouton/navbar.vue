<template>
    <button
        :class="{ active, ...classes }"
        :aria-label="ariaLabel"
        @click="$emit('click')"
    >
        <i :class="icon"></i>
    </button>
</template>

<script setup>
const props = defineProps({
    icon: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
    ariaLabel: {
        type: String,
        default: "",
    },
    classes: {
        type: [Object, String],
        default: "",
    },
});

defineEmits(["click"]);
</script>

<style scoped>
button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-white-static);
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    transition: color 0.3s ease;
}

button.active,
button:hover {
    color: var(--color-logo-primary);
}
</style>
