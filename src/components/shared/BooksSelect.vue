<template>
  <div v-clickOutside="close">
    <div class="relative">
      <div @click="toggle">
        <slot>
          <ButtonModule
            type="transparent"
            main
            class="w-[125px] group !h-[34px]"
            borderWidth="1.5"
            :class="[visible ? 'border-black' : '', isMobile ? '!border-none !w-20' : '']"
          >
            <div class="flex items-center w-full justify-center">
              <div v-if="selectedBooks.length === 1 && !isMobile" class="flex items-center w-full">
                <BookLabel
                  class="cursor-pointer text-14 w-full justify-center"
                  size="w-15 h-15 !mr-7"
                  :customStyle="{iconHover: 'group-hover:!bg-transparent',
                                 fontSize: 'text-13 font-medium',
                                 defaultIcon: ' !w-15 !h-15 !m-0'}"
                  :bookId="selectedBooks[0]"
                  showTitle
                  :has-border="false"
                />
              </div>
              <div v-else class="flex items-center text-app-color md:px-0 px-5">
                <div
                  v-if="selectedBooks.length > 1 || isMobile"
                  class="icon-books-v2 mr-7 md:text-16 text-20"
                />

                <div
                  v-if="selectedBooks.length > 1 && selectedBooks.length !== options.length && !isMobile"
                  :class="btnFontSize"
                  class="w-[69px]"
                >
                  {{ selectedBooks.length }} spaces
                </div>

                <p
                  v-if="selectedBooks.length === options.length && !isMobile"
                  :class="btnFontSize"
                  class="w-[69px]"
                >
                  {{ allOptionsName ?? 'All spaces' }}
                </p>
              </div>
            </div>
          </ButtonModule>
        </slot>
      </div>

      <div
        v-if="!disableDropdown"
        class="md:absolute fixed z-[10000] shadow pb-10 md:pb-0 rounded-10 md:max-h-[300px] md:w-auto w-screen
          md:h-auto h-[calc(100dvh)] overflow-y-auto text-app-color thinner-scroll-bar  dark:bg-grey-110  bg-primary"
        :class="[position, top, { hidden : !visible, visible }, width]"
      >
        <i
          v-if="isMobile"
          class="icon-close-smooth text-app-color text-25 absolute right-10 top-4 p-5"
          @click="close"
        />
        <CheckboxModule
          :model-value="allSelected"
          class="pt-7 pb-5 pl-20 pr-15 cursor-pointer md:hover:bg-selection leading-normal text-13 font-medium"
          :label="allOptionsName"
          icon="icon-books-v2 ml-7 mr-8 lg:mr-15 text-16 h-30 flex items-center"
          @update:modelValue="selectAll"
        />

        <div class="border-b border-grey-500" />

        <CheckboxModule
          v-for="item in computedOptions"
          :key="item.id"
          :model-value="isSelected(item)"
          class="pt-7 pb-5 pl-20 pr-15 cursor-pointer md:hover:bg-selection leading-normal text-13"
          :label="item.title"
          :disabled-deselect="selectedBooks.length === 1"
          :bookIcon="item?.icon"
          :bookId="item?.id"
          :customBooksLabelStyle="customBooksLabelStyle"
          :customStyle="{ fontSize: 'text-13 ml-11',
                          icon: 'max-h-[80%] max-w-[80%]',
                          defaultIcon: 'w-18 h-18 ml-16',
                          iconHover: '',
                          background: 'bg-primary',
                          margin: '' }"
          @update:modelValue="selectItem(item)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cloneDeep from 'lodash/cloneDeep'
import localStorageService from '@/core/local-storage'

const props = withDefaults(defineProps<{
  selectedBooks: number[]
  options: IBook[]
  top?: string
  width?: string
  defaultBookId?: number
  position?: string
  allOptionsName?: string
  customBooksLabelStyle?: string
  btnFontSize?: string
  weekPlanner?: boolean
  disableDropdown?: boolean
}>(), {
  top: 'top-50',
  width: 'w-[250px]',
  position: 'left-0',
  allOptionsName: 'All spaces',
  btnFontSize: 'text-14'
})

const emit = defineEmits(['onSelect', 'toggle', 'close'])

const { user } = useProfile()
const { isMobile } = useGeneral()

const visible = ref(false)

const computedOptions = computed(() => {
  const options = props.options
  return options.sort((a, b) => a.title.localeCompare(b.title))
})

const isSelected = computed(() => (option: IBook) => {
  return props.selectedBooks.some(item => item === option.id)
})

const allSelected = computed(() => {
  return props.selectedBooks.length === props.options.length
})

const toggle = () => {
  visible.value = !visible.value
  emit('toggle', visible.value)
}

const close = () => {
  emit('close')
  visible.value = false
}

const selectItem = (option: IBook) => {
  let selectedItems = cloneDeep(props.selectedBooks)

  if (selectedItems.includes(option.id)) {
    if (selectedItems.length === 1) return
    selectedItems = selectedItems.filter(i => i !== option.id)
  } else {
    selectedItems = [...selectedItems, option.id]
  }

  emit('onSelect', selectedItems)
}

function selectAll (value: boolean) {
  let selectedItems = cloneDeep(props.selectedBooks)

  if (!value) {
    if (props.defaultBookId) {
      const item = props.options.find(opt => opt.id === props.defaultBookId)
      selectedItems = item ? [item.id] : []
    } else {
      selectedItems = [props.options[0].id]
    }
  } else {
    selectedItems = props.options.map(opt => opt.id)
  }

  emit('onSelect', selectedItems)
}

watch(() => props.options, (newValue, oldValue) => {
  const conditionByPlace = localStorageService.getItem(props.weekPlanner
    ? 'isAllBooksSelectedWeekPlanner'
    : 'isAllBooksSelected')?.[user.value.id]

  if ((newValue.length > oldValue.length) && conditionByPlace) {
    selectAll(true)
  }
})
</script>
