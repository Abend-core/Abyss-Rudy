<template>
    <div class="form-group">
        <label v-if="label" :for="id">{{ label }}</label>
        <textarea
            :id="id"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="form-textarea"
            :rows="rows"
            :placeholder="placeholder"
            :disabled="disabled"
        ></textarea>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: String,
    label: String,
    id: String,
    rows: {
        type: Number,
        default: 3,
    },
    placeholder: String,
    disabled: Boolean,
});
</script>

<style scoped>
.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.form-group label {
    color: var(--color-black);
    margin-bottom: 0.25rem;
}

.form-textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.3rem;
    outline: none;
    resize: vertical;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    font-family: inherit;
    font-size: 1rem;
}

.form-textarea:focus {
    border-color: var(--color-logo-primary);
    box-shadow: 0 0 0 3px rgba(46, 99, 123, 0.3);
    outline: none;
}
</style>
