<template>
  <div v-clickOutside="close" class="inline-block relative active:cursor-pointer">
    <div ref="iconRef" @click="toggleModal">
      <slot>
        <div>
          <img :class="iconSize" :src="icon.src" :alt="icon.name">
        </div>
      </slot>
    </div>

    <teleport to="#main_section">
      <div
        v-if="isDropdownVisible"
        class="dropdown absolute w-[320px] bg-primary text-app-color rounded-8 shadow-dropdown z-[10000] py-12"
        :class="[{'dropdown--sub-project': project?.parentId }, direction, { 'dropdown--project-default-icon': !project }]"
        :style="position"
        @click.stop
      >
        <div class="flex items-center mx-15 mb-10 px-10 rounded-4 bg-grey-400">
          <i
            class="icon-search cursor-pointer opacity-50 hover:opacity-100 anim-opacity"
            :class="{'opacity-100': isFocused}"
            @click.stop="toggleInput"
          />
          <input
            ref="inputRef"
            v-model="searchValue"
            type="text"
            placeholder="search"
            class="w-full text-14 bg-transparent pr-10 pl-10 py-6 focus:outline-none placeholder-app-color opacity-50 focus:opacity-100 anim-opacity"
            @input="onInput"
            @focus="toggleFocus(true)"
            @blur="toggleFocus(false)"
            @click.stop
          >
        </div>
        <div class="flex text-center text-14 gap-8 px-15 pb-8">
          <p
            class="py-5 px-23 cursor-pointer rounded-full anim-color-200 -mb-1 hover:bg-menu-hover"
            :class="activeState === 'original' ? 'bg-menu-hover' : 'bg-transparent'"
            @click="changeState('original')"
          >
            Original
          </p>
          <p
            class="py-5 px-23 cursor-pointer rounded-full anim-color-200 -mb-1 hover:bg-menu-hover"
            :class="activeState === 'outlined' ? 'bg-menu-hover' : 'bg-transparent'"
            @click="changeState('outlined')"
          >
            Outlined
          </p>
        </div>
        <div
          v-if="computedIcons.length"
          id="icons"
          ref="iconsRef"
          class="wrapper grid grid-cols-7 gap-8 px-10 max-h-[200px] overflow-y-auto pt-16 no-horizontal-scroll-bar"
        >
          <div v-for="(item, index) in computedIcons" :key="item">
            <Icon
              :chunkSize="chunkSize"
              :icon="item"
              :index="index"
              :hasRightTooltipPosition="tooltipPosition(index)"
              class="z-5"
              @updateChunkSize="updateChunkSize"
              @click="setIcon(item)"
            />
          </div>
        </div>
        <div v-else class="px-15 pt-20 pb-5 text-15 ml-5">
          No results
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import icons from '@/core/icons'

const props = withDefaults(defineProps<{
  project?: IProject
  optionalTop?: number
  optionalCoefficient?: number
  iconHeight?: number
  disableModalToggle?: boolean
}>(), {
  optionalTop: 0,
  optionalCoefficient: 0,
  iconHeight: 35
})

const emit = defineEmits(['leave', 'setIcon'])

const { defaultProjectIcon } = useSettings()
const { isMobile, blockHotKey } = useGeneral()

const isDropdownVisible = ref(false)
const position = ref(null)
const direction = ref('dropdown__top')
const searchValue = ref('')
const isFocused = ref(false)
const inputRef = ref(null)
const iconsRef = ref(null)
const iconRef = ref(null)
const indexRefs = ref([])
const chunkSize = ref(70)

const activeState = ref('original')

const icon = computed(() => {
  const icon = props.project?.icon && icons.icons.some(item => item === props.project.icon)
    ? props.project.icon
    : defaultProjectIcon.value || 'purple_circle'

  return {
    src: `https://helloivy-icons.s3.eu-central-1.amazonaws.com/${icon}.png`,
    name: icon
  }
})

const iconSize = computed(() => {
  const icons = ['FC5EFF', 'FF00A8', '00FF19', '1400FF', '7E5EFF', 'FF5E67', 'FFEF5E', 'F0A411', '00D1FF', '14A6F9', '5EFFF5', 'F91466', '00FFC2', '14F98B']

  return icons.includes(props.project?.icon) ? 'w-16 h-16' : 'w-18 h-18'
})

const computedIcons = computed(() => {
  if (searchValue.value.toLowerCase().trim() !== '') {
    const filteredIcons = icons.icons.filter(item => item.toLowerCase().match(searchValue.value.toLowerCase()))
    return filteredIcons.slice(0, chunkSize.value)
  } else {
    return icons[activeState.value].slice(0, chunkSize.value)
  }
})

const indexArray = computed(() => (startPosition) => {
  const arr = startPosition === 0 ? [0] : []

  for (let i = startPosition; i < computedIcons.value.length; i = i + 7) {
    arr.push(i)
  }

  return arr
})

const tooltipPosition = computed(() => index => {
  const hasRightPosition = indexArray.value(-1)
  const hasLeftPosition = indexArray.value(0)

  if (hasRightPosition.includes(index)) return 'right-0'
  if (hasLeftPosition.includes(index)) return 'left-0'
  return 'left-1/2 -translate-x-1/2'
})

// to reset the refs before each update
onBeforeUpdate(() => {
  indexRefs.value = []
})

function close () {
  searchValue.value = ''
  isDropdownVisible.value = false
  chunkSize.value = 70
  activeState.value = 'original'
}

function toggleModal () {
  if (props.disableModalToggle) return

  nextTick(() => {
    isDropdownVisible.value = !isDropdownVisible.value

    getPosition()

    setTimeout(() => {
      if (isDropdownVisible.value) {
        inputRef.value.focus()
      }
    }, 100)
  })
}

function setIcon (value) {
  emit('setIcon', value)
  close()
}

function getPosition () {
  const coefficient = props.project?.parentId ? isMobile.value ? 35 : 45 : 20
  const innerHeight = window.innerHeight
  const innerWidth = window.innerWidth
  const iconRect = iconRef.value.getBoundingClientRect()
  const containerHeight = 264
  const offset = iconRect.top + props.iconHeight + containerHeight
  const modalHeight = 280 // height of icons container and height of arrow on it and gap = 5px
  const modalWidth = 312 // width of icons container

  direction.value = offset > innerHeight ? 'dropdown__bottom' : 'dropdown__top'
  const top = offset > innerHeight ? iconRect.top - (modalHeight + props.optionalTop) : iconRect.top + props.iconHeight

  const left = iconRect.left + modalWidth > innerWidth
    ? innerWidth - modalWidth
    : iconRect.left - (coefficient + props.optionalCoefficient)

  position.value = `left: ${left}px; top: ${top}px`
}

function toggleInput () {
  isFocused.value = !isFocused.value
  inputRef.value.focus()
}

function changeState (state) {
  activeState.value = state
  searchValue.value = ''
  chunkSize.value = 70
  iconsRef.value.scrollTo(0, 0)
}

function onInput () {
  activeState.value = 'original'
  chunkSize.value = 70
}

let timer = null

function updateChunkSize (value) {
  clearTimeout(timer)

  timer = setTimeout(() => {
    chunkSize.value = value + 14
  }, 100)
}

function toggleFocus (value) {
  isFocused.value = value
  blockHotKey(value)
}

defineExpose({
  toggleModal
})
</script>

<style scoped lang="scss">
.dropdown {
  left: -20px;

  &::after {
    content: " ";
    position: absolute;
    left: 15px;
    border-style: solid;
  }

  &--sub-project {
    left: -45px;

    &::after {
      left: 41px;
    }

    @media (max-width: 767px) {
      left: -35px;

      &::after {
        left: 30px;
      }
    }
  }

  &--project-default-icon {
    &::after {
      left: 15px;
    }

    @media (max-width: 767px) {
      &::after {
        left: 65px;
      }
    }
  }
}

.dropdown__top {
  &::after {
    bottom: 100%;
    border-width: 0 15px 11px 15px;
    border-color: transparent transparent rgb(var(--color-canvas)) transparent;
  }
}
.dropdown__bottom {
  &::after {
    top: 100%;
    border-width: 11px 15px 0 15px;
    border-color: rgb(var(--color-canvas)) transparent transparent transparent;
  }
}
</style>
