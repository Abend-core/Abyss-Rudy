<template>
    <button class="primary-btn" :class="variant" @click="$emit('click')">
        <slot />
    </button>
</template>

<script setup>
const props = defineProps({
    variant: {
        type: String,
        default: "default",
    },
});
defineEmits(["click"]);
</script>

<style scoped>
.primary-btn {
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 0.4rem;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.primary-btn.default {
    background-color: var(--color-logo-primary);
    color: var(--color-logo-secondary);
}

.primary-btn.default:hover {
    background-color: var(--color-logo-secondary);
    color: var(--color-logo-primary);
}

.primary-btn.active {
    color: var(--color-logo-primary);
    background-color: var(--color-logo-secondary);
}

.primary-btn.red {
    background-color: #e53e3e;
    color: var(--color-white-static);
}

.primary-btn.red:hover {
    background-color: #c53030;
    color: var(--color-white-static);
}
</style>
