<template>
  <div class="flex justify-between items-center">
    <p class="text-13">Assignee</p>

    <div v-clickOutside="close" class="border border-grey-850 rounded-6 h-36" :class="[btnWidth, classes]">
      <div class="relative">
        <div @click="toggle">
          <slot>
            <div class="px-8 py-6 flex justify-between items-center cursor-pointer group h-[34.25px]">
              <span
                v-if="allSelected"
                class="text-13"
              >All</span>
              <span v-else class="text-13 truncate text-center w-full mr-10 flex items-center text-dark-300">
                <UserBadge
                  v-for="item in modelValue.filters.membersFilter.length > 2 ?
                    modelValue.filters.membersFilter.slice(0, 2) :
                    modelValue.filters.membersFilter"
                  :key="item.id"
                  :firstName="item.firstName"
                  :lastName="item.lastName"
                  :avatarUrl="item.avatar?.url"
                  :color="item.color"
                  :showName="false"
                  :size="21"
                  class="mr-6"
                />
              </span>

              <div class="flex items-center">
                <span v-if="modelValue.filters.membersFilter.length > 2 && !allSelected" class="text-12 mr-4 px-2">
                  +{{ modelValue.filters.membersFilter.length - 2 }}
                </span>

                <i
                  v-if="isToday ? !selectedDefault : !allSelected "
                  class="icon-close-smooth hidden cursor-pointer group-hover:block cross-class"
                  @click.stop="resetToDefault"
                />

                <i class="icon-keyboard-arrow-down arrow-class" :class="{ 'expanded': visible }" />
              </div>
            </div>
          </slot>
        </div>

        <div
          v-if="visible"
          class="absolute z-[10000] shadow-new-dropdown rounded-10 max-h-[300px] overflow-y-auto text-app-color top-40 right-0 w-[190px] bg-primary"
        >
          <CheckboxModule
            :model-value="allSelected"
            :customStyle="{
              fontSize: 'text-13 font-medium',
              icon: 'max-h-[80%] max-w-[80%]',
              defaultIcon: 'w-18 h-18',
              iconHover: '',
              background: 'bg-primary',
              margin: 'mr-17'
            }"
            class="py-7 px-10 cursor-pointer hover:bg-selection leading-normal text-13 font-bold"
            label="All"
            @update:modelValue="selectAll"
          />

          <div class="border-b border-grey-500" />

          <CheckboxModule
            v-for="item in options"
            :key="item.id"
            :model-value="allSelected || isSelected(item)"
            class="px-10 py-7 cursor-pointer hover:bg-selection leading-normal text-13"
            :disabled-deselect="props.modelValue.filters.membersFilter.length === 1"
            :bookId="item?.id"
            @update:modelValue="selectItem(item)"
          >
            <UserBadge
              :firstName="item.firstName"
              :lastName="user.id === item.userId ? '' : item.lastName"
              :avatarUrl="item.avatar?.url"
              :color="item.color"
              :size="24"
              class="ml-15"
            />
          </CheckboxModule>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps<{
  isToday: boolean
  modelValue: {
    filters: IFilters
    doRequest: boolean
  }
  options: ITeamMember[]
  btnWidth?: string
}>()

const emit = defineEmits(['onSelect', 'toggle', 'close', 'update:modelValue'])

const { user } = useProfile()

const visible = ref(false)

function isSelected (option) {
  return props.modelValue.filters.membersFilter?.some(item => item.id === option.id)
}

const allSelected = computed(() => {
  return props.modelValue.filters.membersFilter?.length === props.options.length || !props.modelValue.filters.membersFilter?.length
})

const selectedDefault = computed(() => props.modelValue.filters.membersFilter.length === 1 &&
    props.modelValue.filters.membersFilter[0].userId === props.options[0].userId)

const classes = computed(() => {
  const prefix = visible.value ? '' : 'hover:'
  return `${prefix}bg-menu-hover text-app-color border-grey-850 rounded-6 anim-color-200 md:border`
})

const toggle = () => {
  visible.value = !visible.value
  emit('toggle', visible.value)
}

const close = () => {
  emit('close')
  visible.value = false
}

function selectItem (option: ITeamMember) {
  let selectedOptions = cloneDeep(props.modelValue.filters.membersFilter)
  if (props.modelValue.filters.membersFilter.some(item => item.id === option.id)) {
    if (props.modelValue.filters.membersFilter.length === 1) return
    selectedOptions = selectedOptions.filter(i => i.id !== option.id)
  } else {
    selectedOptions = [...selectedOptions, option]
  }

  emit('update:modelValue', {
    filters: {
      ...props.modelValue.filters,
      membersFilter: selectedOptions
    },
    doRequest: true
  })
}

function selectAll () {
  let selectedOptions: ITeamMember[]
  if (allSelected.value) {
    selectedOptions = [props.options[0]]
  } else {
    selectedOptions = [...props.options]
  }

  emit('update:modelValue', {
    filters: {
      ...props.modelValue.filters,
      membersFilter: selectedOptions
    },
    doRequest: true
  })
}

function resetToDefault () {
  let selectedOptions: ITeamMember[]
  if (!props.isToday) {
    if (allSelected.value) {
      selectedOptions = [props.options[0]]
    } else {
      selectedOptions = [...props.options]
    }
  } else {
    selectedOptions = [props.options[0]]
  }

  emit('update:modelValue', {
    filters: {
      ...props.modelValue.filters,
      membersFilter: selectedOptions
    },
    doRequest: true
  })
}
</script>
