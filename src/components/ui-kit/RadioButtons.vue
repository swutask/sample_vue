<template>
  <RadioModule
    v-for="button in radioModuleOptions"
    :key="button.label"
    :value="button.value"
    inputValue="true"
    :disabled="button?.disabled"
    :labelClass="button?.labelClass"
    :label="button.label"
    class="text-14 w-auto"
  />
</template>

<script setup lang="ts">
const radioModuleOptions = ref([
  { label: 'Default radio', value: 'true', disabled: false, labelClass: '' },
  { label: 'Disabled radio', disabled: true, value: 'false', labelClass: '' },
  { label: 'labelClass radio', labelClass: 'text-brand-active font-bold', value: 'true', disabled: false }
])
</script>
