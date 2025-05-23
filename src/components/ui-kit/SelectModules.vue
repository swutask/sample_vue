<template>
  <SelectModule
    v-for="selectModule in selectModuleOptions"
    :key="selectModule.modelValue"
    :options="defaultOptions"
    :modelValue="selectModule.modelValue"
    :itemClass="selectModule?.itemClass"
    :disabled="selectModule?.disabled"
    :selectedClass="selectModule?.selectedClass"
    :width="selectModule?.width ? selectModule?.width : 'w-[200px]'"
  />
</template>

<script setup>
const defaultOptions = [
  { id: 1, name: 'defaultOption1' },
  { id: 2, name: 'defaultOption2' },
  { id: 3, name: 'defaultOption3' },
  { id: 4, name: 'defaultOption4' }
]
const selectModuleOptions = ref([
  { modelValue: { name: 'Default Select' } },
  { modelValue: { name: 'Disabled Select' }, disabled: true },
  { modelValue: { name: 'WidthChange SelectModule' }, width: 'w-[350px]' },
  { modelValue: { name: 'itemClass Select' }, itemClass: 'text-brand-active font-bold' },
  { modelValue: { name: 'selectedClass Select' }, selectedClass: 'text-brand-active font-bold' }
])
</script>
