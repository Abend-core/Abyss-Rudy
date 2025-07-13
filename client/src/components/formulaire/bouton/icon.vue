<template>
    <button class="icon-btn" @click="$emit('click')">
        <slot name="icon" />
        <span><slot /></span>
    </button>
</template>

<script setup>
defineEmits(["click"]);
</script>

<style scoped>
.icon-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: 1px solid #ccc;
    padding: 0.4rem 0.8rem;
    border-radius: 0.3rem;
    cursor: pointer;
}
</style>
