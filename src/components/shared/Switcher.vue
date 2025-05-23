<template>
  <div class="tabs text-xs switcher-border-shadow" :class="[wrapperClasses, { 'p-5 gap-8': showHoverOnNonActiveTab }]">
    <div
      v-for="({ name, key, icon, tooltipText }, index) in tabs"
      :key="key"
      :data-tooltip="tooltipText"
      class="flex flex-col items-center h-full justify-center cursor-pointer"
      :class="{ 'text-app-color': modelValue.index === index,
                'py-3 rounded-10 transition-all': showHoverOnNonActiveTab,
                'hover:text-app-color hover:bg-grey-150 hover:bg-opacity-50': showHoverOnNonActiveTab && modelValue.index !== index }"
      @click="changeActiveTab({ index, key })"
    >
      <slot :title="name" :icon="icon" :tooltipText="tooltipText">
        <i v-if="icon" :class="icon" />
        <p v-if="name" :class="nameClasses">{{ name }}</p>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ITab { name?: string; key: string; icon?: string; tooltipText?: string }

withDefaults(defineProps<{
  tabs: ITab[]
  modelValue: any
  width?: string
  height?: string
  borderRadius?: string
  scale?: {x: number; y: number}
  nameClasses?: string
  wrapperClasses?: string
  showHoverOnNonActiveTab?: boolean
}>(), {
  width: '50%',
  height: '40px',
  borderRadius: '9999px',
  scale: () => ({
    x: 0.94,
    y: 0.8
  }),
  showHoverOnNonActiveTab: false
})

const emit = defineEmits(['update:modelValue'])

function changeActiveTab (activeTab: ISwitcherModelValue) {
  emit('update:modelValue', activeTab)
}
</script>

<style scoped lang="scss">
.tabs {
  --tab-width: v-bind('width');
  --tab-height: v-bind('height');
  --tab-radius: v-bind('borderRadius');
  --tab-count: v-bind('tabs.length');
  --tab-scale-x: v-bind('scale.x');
  --tab-scale-y: v-bind('scale.y');
  --active-tab-index: v-bind('modelValue.index');

  @apply grid overflow-hidden isolate relative w-full
  text-grey-250 select-none border border-grey-850
  whitespace-nowrap bg-primary;

  height: var(--tab-height);
  max-width: calc(var(--tab-width) * var(--tab-count));
  border-radius: var(--tab-radius);
  grid-template-columns: repeat(var(--tab-count), minmax(0, 1fr));

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: scale(v-bind('scale.x'), v-bind('scale.y'));
    --width: calc(100% / var(--tab-count));
    width: var(--width);
    background-color: rgb(var(--color-grey-150));
    border-radius: var(--tab-radius);
    z-index: -1;
    margin-left: calc(var(--active-tab-index) * var(--width));
    transition: margin-left 300ms;
  }
}
</style>
