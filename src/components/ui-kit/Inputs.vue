<template>
  <InputModule
    v-for="input in inputModuleOptions"
    :key="input.label"
    :modelValue="input?.modelValue || input.label"
    :labelClass="input?.labelClass || 'text-14'"
    :inputClasses="input?.inputClasses"
    :errorMessage="input?.errorMessage"
    :disabled="input?.disabled"
    :readonly="input?.readonly"
    :placeholder="input?.placeholder"
    :label="input.label"
    class="text-14 my-5 w-auto"
  />
</template>

<script setup>
const inputModuleOptions = ref([
  { label: 'Default input' },
  { label: 'Disabled input', disabled: true },
  { label: 'Readonly input', readonly: true, modelValue: 'Readonly input' },
  { label: 'Placeholder input', placeholder: 'Placeholder input' },
  { label: 'No bg input', inputClasses: 'bg-transparent', modelValue: 'No bg input' },
  { label: 'labelClass input', labelClass: 'text-brand-active font-bold', modelValue: 'labelClass input' },
  { label: 'inputClasses input', inputClasses: 'px-20 py-10 text-brand-active font-bold', modelValue: 'inputClasses input' },
  { label: 'errorMessage input', errorMessage: 'errorMessage', modelValue: 'errorMessage input' }
])

</script>
