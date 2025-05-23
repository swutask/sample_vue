<template>
  <ButtonModule
    v-for="button in buttonModuleOptions"
    :key="button.label"
    :prefix="button?.prefix"
    :suffix="button?.suffix"
    :tag="button?.tag"
    :classes="button?.classes"
    :text="button.label"
    :hasHover="button?.hasHover"
    :tooltipText="button?.tooltipText"
    :tooltipPosition="button?.tooltipPosition"
    :teleportTooltip="button?.teleportTooltip"
    :disabled="button?.disabled"
    class="px-35 py-12 text-15 my-5"
    :class="{'border-2 border-brand rounded-4 ': !button?.tag}"
  >
    <template v-if="button?.tooltipText" #tooltip>
      <div class="text-white">{{ button?.tooltipText }}</div>
    </template>
  </ButtonModule>
</template>

<script setup>
const buttonModuleOptions = ref([
  { label: 'Default button' },
  { label: 'Disabled button', disabled: true },
  { label: 'Tag button(anchor tag)', tag: 'a', classes: 'text-main-color group-scope-hover:text-app-color' },
  {
    label: 'Tooltip button',
    teleportTooltip: true,
    tooltipText: 'Button with tooltip',
    tooltipClasses: 'text-12 font-medium px-10 py-4 rounded-4 capitalize',
    tooltipBgOpacity: 'bg-opacity-80'
  },
  { label: 'PrefixIcon button', prefix: 'icon-design mr-14 text-main-color group-scope-hover:text-app-color' },
  { label: 'SuffixIcon button', suffix: 'icon-design mr-14 text-main-color group-scope-hover:text-app-color' },
  { label: 'HasHover button', hasHover: true }
])
</script>
