<template>
  <div v-clickOutside="close" class="no-drag" :class="{'relative': hasRelatedClass}">
    <div ref="referenceRef" class="flex w-full" @click="preventOpenOnClick ? '' : toggle()">
      <slot name="button" :isOpen="isDropdownVisible" :classes="classes">
        <ButtonModule
          :hasHover="!isDropdownVisible && iconHasHover"
          class="text-app-color p-5"
          :classes="`${classes} ${buttonClasses}`"
          :prefix="prefix"
          v-bind="$attrs"
        />
      </slot>
    </div>

    <!-- local -->
    <TransitionExpand>
      <div
        v-if="!isTeleported && isDropdownVisible"
        ref="contentRef"
        class="dropdown shadow-new-dropdown absolute"
        :class="[zIndex, dropdownClasses, dropdownShadow,
                 {
                   'full-screen-dropdown': isMobile && allowFullScreen && !allowHalfScreen,
                   'rounded-10' : !allowFullScreen,
                   'half-screen-dropdown rounded-t-10': isMobile && allowHalfScreen
                 }]"
        :style="`top: ${topPosition}; ${menuPositionHorizontalDirection}; width: ${width}px`"
      >
        <div class="rounded-10" :class="background" @click="onClick">
          <i
            v-if="allowFullScreen && isMobile"
            class="icon-close-smooth absolute right-10 top-8 p-6 text-app-color text-25"
            @click="close"
          />
          <div :class="{'default-dropdown': defaultStyles}">
            <slot />
          </div>
        </div>
      </div>
    </TransitionExpand>

    <!-- Teleport -->
    <teleport
      v-if="isTeleported"
      to="#main_section"
    >
      <TransitionExpand>
        <div
          v-if="isDropdownVisible"
          ref="contentRef"
          class="dropdown shadow-dropdown absolute"
          :class="[
            zIndex, dropdownShadow,
            {
              'full-screen-dropdown': isMobile && allowFullScreen && !allowHalfScreen,
              'rounded-10': !allowFullScreen,
              'half-screen-dropdown rounded-t-10': isMobile && allowHalfScreen
            }
          ]"
          :style="`${isMobile && allowFullScreen ? '' : position}; width: ${width}px`"
        >
          <div class="rounded-10" :class="[background, dropdownClasses]" @click="onClick">
            <i
              v-if="allowFullScreen && isMobile"
              class="icon-close-smooth absolute right-10 top-8 p-6 text-app-color text-20"
              @click="close"
            />

            <div :class="{'default-dropdown': defaultStyles}">
              <slot />
            </div>
          </div>
        </div>
      </TransitionExpand>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import TransitionExpand from '@/components/shared/TransitionExpand'

const props = withDefaults(defineProps<{
  // general
  openByDefault?: boolean
  prefix?: string
  dropdownClasses?: string
  hasRelatedClass?: boolean
  customClasses?: string
  buttonClasses?: string
  width?: number
  iconHasHover?: boolean
  background?: string
  closeOnClick?: boolean
  disabled?: boolean
  preventCloseOnClick?: boolean
  preventOpenOnClick?: boolean
  positionDirection?: string
  zIndex?: string
  // for teleport only
  positionLeft?: number | null
  removeOptionalTopGap?: boolean
  topGap?: number
  isTeleported?: boolean
  contentHeight?: number
  dropdownShadow?: string
  // for local only
  positionMenu?: string
  isAutoMenuPosition?: boolean
  topPosition?: string
  isClient?: boolean
  allowFullScreen?: boolean
  allowHalfScreen?: boolean
  defaultStyles?: boolean
  bottom?: boolean
}>(), {
  hasRelatedClass: true,
  buttonClasses: 'px-5 py-3',
  width: 225,
  iconHasHover: true,
  zIndex: 'z-50',
  isTeleported: true,
  positionDirection: 'right',
  topPosition: '38px',
  topGap: 0,
  closeOnClick: true
})

const emit = defineEmits(['close', 'input', 'open'])

const { isMobile } = useGeneral()

const isDropdownVisible = ref(false)
const referenceRef = ref(null)
const contentRef = ref(null)

const position = ref(`top: 0px; left: ${props.positionLeft || 0}px`)

const menuPositionHorizontalDirection = computed(() => {
  const rect = referenceRef.value.getBoundingClientRect()

  if (props.positionDirection === 'next-to') {
    return rect.right + props.width > innerWidth ? 'top: 0; right: 150px' : 'top: 0; left: 150px'
  }

  const contentRect = contentRef.value?.getBoundingClientRect()

  if (props.isAutoMenuPosition) {
    return contentRect?.left < 0 ? 'left: 0' : 'right: 0'
  } else {
    return `${props.positionMenu || props.positionDirection}: 0`
  }
})

const classes = computed(() => {
  if (props.customClasses) return props.customClasses

  const prefix = isDropdownVisible.value ? '' : 'hover:'
  return `${prefix}bg-menu-hover rounded-8 anim-color-200`
})

onMounted(() => {
  setTimeout(() => {
    if (props.openByDefault) {
      isDropdownVisible.value = true
    }
  }, 300)
})

function toggle (value?: boolean, e?: MouseEvent) {
  if (props.disabled) return

  isDropdownVisible.value = typeof value !== 'undefined' ? value : !isDropdownVisible.value

  emit('input', isDropdownVisible.value)

  if (isDropdownVisible.value) {
    setPosition(e)
    emit('open')
  } else {
    emit('close')
  }
}

function blur () {
  emit('close')
  isDropdownVisible.value = false
}

function close () {
  if (props.closeOnClick) {
    emit('close')
    isDropdownVisible.value = false
  }
}

function setPosition (e?: MouseEvent) {
  const rect = referenceRef.value.getBoundingClientRect()
  const gap = 15

  let left = e?.clientX || props.positionLeft || rect.left + rect.width - props.width

  if (props.positionDirection === 'left') {
    left = props.positionLeft || rect.left
  }

  if (left < 10) left = gap
  if (left + props.width > window.innerWidth) {
    left = window.innerWidth - props.width - gap
  }

  if ((props.contentHeight && window.innerHeight < rect.bottom + props.topGap + props.contentHeight) || props.bottom) {
    position.value = `bottom: ${window.innerHeight - rect.top + props.topGap}px; left: ${left}px`
  } else {
    position.value = `top: ${e?.clientY || rect.bottom + props.topGap}px; left: ${left}px`
  }
}

function onClick () {
  if (props.preventCloseOnClick) return
  close()
}

defineExpose({
  isDropdownVisible,
  close,
  toggle,
  blur
})
</script>

<style scoped lang="scss">
.dropdown__arrow {
  position: absolute;
  width: 25px;
  height: 26px;
  right: 10px;
  transform: rotate(45deg);
  z-index: -1;
  box-shadow: 2.5px 2.5px 8.5px rgba(0, 0, 0, 0.2);
}

.full-screen-dropdown {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: calc(100dvh);
  background-color: white;
  z-index: 10001;
  overflow-y: auto;
  overflow-x: hidden;
}

.half-screen-dropdown {
  position: fixed;
  top: 15%;
  bottom: 0;
  left: 0;
  width: 100vw !important;
  height: calc(100dvh);
  background-color: white;
  z-index: 10001;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
