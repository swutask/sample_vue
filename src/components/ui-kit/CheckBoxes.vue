<template>
  <CheckboxModule
    v-for="button in checkBoxModuleOptions"
    :key="button.label"
    :disabled="button?.disabled"
    :label="button.label"
    :hasBg="button?.hasBg"
    :tooltip="button?.tooltip"
    :bookIcon="button?.bookIcon"
    :icon="button?.icon"
    class="text-14 w-auto"
  />
</template>

<script setup>
const checkBoxModuleOptions = ref([
  { label: 'Default checkbox' },
  { label: 'Disabled checkbox', disabled: true },
  { label: 'Bg checkbox', hasBg: true },
  { label: 'Tooltip checkbox', tooltip: 'Tooltip checkbox' },
  { label: 'Book icon checkbox', bookIcon: 'icon-keyboard-arrow-down' },
  { label: 'Icon checkbox', icon: 'icon-keyboard-arrow-down' }
])
</script>
