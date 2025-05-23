<template>
  <component
    :is="tag"
    ref="buttonModuleRef"
    v-clickOutside="closeTooltip"
    class="inline-flex items-center whitespace-nowrap focus:outline-none leading-tight transition-all"
    :class="[
      types[type],
      sizes[size],
      {'hover:opacity-100': hasHover },
      opacityStyle,
      classes,
      borderWidth,
      {'bg-primary border border-grey-300 dark:border-black shadow-main-button hover:shadow-black-05': main}
    ]"
    :href="href"
    :disabled="disabled"
    @mouseenter="setTooltip(true)"
    @mouseleave="setTooltip(false)"
    @click="toggleTooltip()"
  >
    <!-- T O O P T I P  T E X T -->
    <p
      v-if="(tooltipText && showTooltip && !teleportTooltip)"
      class="shadow absolute whitespace-nowrap bg-black bg-opacity-80 text-white"
      :class="[tooltipPosition, tooltipClasses]"
    >
      <slot name="tooltip">
        {{ tooltipText }}
      </slot>
    </p>

    <teleport v-if="teleportTooltip" to="#main_section">
      <p
        v-if="tooltipText && showTooltip"
        ref="tooltipRef"
        class="shadow fixed whitespace-nowrap z-9999 bg-black bg-opacity-80 text-white"
        :class="[tooltipClasses]"
        :style="position"
      >
        <slot name="tooltip">
          {{ tooltipText }}
        </slot>
      </p>
    </teleport>

    <!-- PREFIX -->
    <i v-if="prefix" :class="[prefix, { 'mr-10': iconHasMargin && text }]" />

    <!-- TEXT -->
    <slot>
      <span v-if="text" :class="titleClass">{{ text }}</span>
    </slot>

    <!-- SUFFIX -->
    <slot name="suffix">
      <i v-if="!!suffix" :class="suffix" />
    </slot>

    <slot name="wrapper" />
  </component>
</template>

<script setup lang="ts">
import type { EButtonSize, EButtonType } from '@/types/enum'

const props = withDefaults(defineProps<{
  type?: keyof typeof EButtonType
  size?: keyof typeof EButtonSize
  text?: string | number
  prefix?: string
  hoveredIconBtnSize?: string
  suffix?: string
  hasHover?: boolean
  disabled?: boolean
  tag?: string
  href?: string
  buttonOpacity?: string
  iconHasMargin?: boolean
  groupHoverColor?: string
  classes?: string
  borderWidth?: string
  showOnMobile?: boolean
  skipGap?: boolean

  titleClass?: string
  tooltipText?: string
  tooltipPosition?: string
  tooltipClasses?: string
  teleportTooltip?: boolean
  tooltipBottom?: boolean
  tooltipTop?: boolean
  tooltipOptionalGap?: number
  isWhiteTooltip?: boolean
  showTooltipByCondition?: any
  main?: boolean
}>(), {
  tag: 'button',
  buttonOpacity: '50',
  iconHasMargin: true,
  groupHoverColor: '',
  classes: 'duration-50',
  // borderWidth: 'border-0',
  titleClass: '',
  tooltipText: '',
  tooltipPosition: 'bottom-40 left-1/2 -translate-x-1/2',
  tooltipClasses: 'text-13 px-10 py-7 rounded-8 z-9999',
  tooltipOptionalGap: 30,
  hoveredIconBtnSize: '24px'
})

const { isMobile } = useGeneral()

const showTooltip = ref(false)
const buttonModuleRef = ref(null)
const position = ref(null)
const tooltipRef = ref()
const hoveredIconBtnSize = ref(props.hoveredIconBtnSize)

const types = {
  transparent: 'transparent-type-class',
  black: 'black-type-class',
  navigate: 'navigate-type-class',
  footer: 'footer-type-class',
  grey: 'grey-type-class',
  dark: 'dark-type-class',
  icon: 'icon-type-class'
}

const sizes = {
  filterButton: 'filter-button-size-class'
}

const opacityStyle = computed(() => props.hasHover ? `opacity-${props.buttonOpacity}` : '')

watch(() => props.showTooltipByCondition, (value) => {
  setTooltip(!!value)
})

function setTooltip (value) {
  if (!isMobile.value) {
    showTooltip.value = value
    if (props.teleportTooltip) setTimeout(() => getTooltipPosition())
  }
}

function toggleTooltip () {
  if (isMobile.value && props.showOnMobile) {
    showTooltip.value = !showTooltip.value
  }
}

function closeTooltip () {
  if (isMobile.value && props.showOnMobile && showTooltip.value) {
    showTooltip.value = false
  }
}

function getTooltipPosition () {
  if (!showTooltip.value) return

  const btnRect = buttonModuleRef.value?.getBoundingClientRect()
  const tooltipRect = tooltipRef.value?.getBoundingClientRect()

  if (!btnRect || !tooltipRect) return

  const leftGap = 8
  const top = props.skipGap ? btnRect.top : btnRect.top - 8

  const halfTooltipWidth = tooltipRect?.width / 2
  const halfButtonWidth = btnRect?.width / 2

  let left = btnRect.left - halfTooltipWidth + halfButtonWidth

  if (left <= 0) left = 10

  if (left > window.innerWidth - tooltipRect?.width) {
    left = window.innerWidth - tooltipRect?.width - 10
  }

  if (props.tooltipBottom || (top < tooltipRect?.height && props.tooltipTop)) {
    position.value = `top: ${btnRect.bottom + 5}px; left: ${left}px`
  } else if (props.tooltipTop || (tooltipRect?.top + tooltipRect?.height > window.innerHeight && props.tooltipBottom)) {
    position.value = `top: ${btnRect.bottom - btnRect.height - props.tooltipOptionalGap}px; left: ${left}px`
  } else {
    position.value = `top: ${top}px; left: ${btnRect.right + leftGap}px`
  }
}
</script>

<style lang="scss">
.filter-button-size-class {
  @apply h-43 px-20 py-6;
}

.transparent-type-class {
  @apply border-[1.5px] flex items-center rounded-7 border-grey-850 opacity-100 text-13 px-11 py-7 h-36 bg-primary;
  &:hover {
    @apply border-black;
  }
}

.navigate-type-class {
  @apply rounded-20 text-grey-1050;
  &:hover {
    @apply bg-grey-150;
  }
}

.footer-type-class {
  @apply rounded-20 text-grey-1050;
}

.black-type-class {
  @apply bg-dark-200 dark:bg-sidebar border border-dark-200 dark:text-grey-1050 dark:border-black rounded-10 text-grey-450;
  &:hover {
    @apply dark:bg-transparent bg-black;
  }
  &:disabled {
    @apply bg-grey-light border-grey-light  dark:bg-sidebar opacity-[0.6] dark:border-black text-dark-default;
  }
}

.grey-type-class {
  @apply justify-center items-center text-grey-1050;
  &:hover {
    @apply bg-grey-150;
  }
  &:active {
    @apply bg-grey-150 text-dark-default;
  }
}

.dark-type-class {
  @apply bg-dark-400 text-white;
  &:hover {
    @apply bg-dark-1000;
  }
}

.icon-type-class {
  width:  v-bind(hoveredIconBtnSize);
  height:  v-bind(hoveredIconBtnSize);

  @apply flex items-center justify-center rounded-6 text-app-color opacity-100 #{!important};

  &:hover {
    @apply bg-grey-150 text-dark-default #{!important};
  }
}
</style>
