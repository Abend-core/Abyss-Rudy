<template>
    <div class="form-group">
        <label v-if="label" :for="id">{{ label }}</label>
        <select
            :id="id"
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)"
            class="form-input"
            :disabled="disabled"
        >
            <option v-if="placeholder" disabled value="">
                {{ placeholder }}
            </option>
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: [String, Number],
    label: String,
    id: String,
    disabled: Boolean,
    options: {
        type: Array,
        default: () => [],
    },
    placeholder: String,
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

.form-input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.3rem;
    outline: none;
    appearance: none;
    background: #2b2a33;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3csvg%20width%3d%2210%22%20height%3d%227%22%20viewBox%3d%220%200%2010%207%22%20xmlns%3d%22http%3a//www.w3.org/2000/svg%22%3e%3cpolygon%20fill%3d%22%23666%22%20points%3d%220%200%205%207%2010%200%22/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 10px 7px;
}

.form-input:focus {
    border-color: var(--color-logo-primary);
    box-shadow: 0 0 0 3px rgba(46, 99, 123, 0.3);
    outline: none;
}
</style>
