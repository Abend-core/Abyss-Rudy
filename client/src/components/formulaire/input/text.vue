<template>
    <div class="form-group">
        <label v-if="label">{{ label }}</label>
        <input
            type="text"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="form-input"
        />
    </div>
</template>

<script setup>
defineProps({
    modelValue: String,
    placeholder: String,
    label: String,
});
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.form-group label {
    color: var(--color-black);
}

.form-input {
    flex: 1;
    padding: 0.5rem;
    padding-right: 2.5rem;
    border: 1px solid #ccc;
    border-radius: 0.3rem;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus {
    border-color: var(--color-logo-primary);
    box-shadow: 0 0 0 3px rgba(46, 99, 123, 0.3);
    outline: none;
}
</style>
