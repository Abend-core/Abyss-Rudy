<template>
    <div class="form-group">
        <label v-if="label" :for="id">{{ label }}</label>
        <div class="input-wrapper">
            <input
                :id="id"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="placeholder"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                class="form-input"
                :disabled="disabled"
            />
            <button
                type="button"
                class="toggle-button"
                @click="toggleShow"
                :aria-label="
                    showPassword
                        ? 'Cacher le mot de passe'
                        : 'Afficher le mot de passe'
                "
            >
                <i
                    :class="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'"
                ></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    modelValue: String,
    placeholder: String,
    label: String,
    id: String,
    disabled: Boolean,
});

const showPassword = ref(false);
const toggleShow = () => {
    showPassword.value = !showPassword.value;
};
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

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
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

.toggle-button {
    position: absolute;
    right: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1;
    display: flex;
    align-items: center;
    color: var(--color-black);
}

.toggle-button:hover {
    opacity: 0.8;
}
</style>
