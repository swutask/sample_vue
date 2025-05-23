<template>
  <DropdownModule
    ref="dropdownRef"
    class="text-app-color h-full flex items-center"
    :width="317"
    :zIndex="isMobile ? 'z-[106]' : 'z-[1000]'"
    :topPosition="isMobile ? '0px' : '38px'"
    :allowFullScreen="isMobile"
    background="bg-primary dark:bg-grey-110"
    :isTeleported="false"
    preventCloseOnClick
  >
    <template #button="{isOpen}">
      <ButtonModule
        type="transparent"
        main
        :class="[
          isOpen ? 'border-black' : '',
          {'px-5 border-none': isMobile}
        ]"
        :style="`height: ${height}px`"
      >
        <p class="icon-filters md:text-15 text-20 md:w-15 md:h-15 md:mr-7" />

        <p v-if="!isMobile" class="text-13" :class="[filtersAmount ? 'mr-7' : '']">{{ title }}</p>

        <div
          v-if="filtersAmount"
          class="py-4 px-6 md:ml-0 ml-5 bg-grey-500 text-dark-default text-9 font-medium rounded-5 leading-none mt-1 mr-3"
        >
          {{ filtersAmount }}
        </div>

        <p
          v-if="filtersAmount && !isMobile"
          class="icon-close-smooth mt-1 ml-3 text-grey-250 text-16" @click.stop="$emit('resetToDefault')"
        />
      </ButtonModule>
    </template>
    <div class="flex flex-col px-18 pt-20 pb-10">
      <div class="flex flex-col md:space-y-7 space-y-12 md:mt-0 mt-15">
        <div v-if="showViewTypeSwitcher">
          <p class="text-15 font-semibold mb-4">Task view</p>
          <Switcher
            v-model="taskBoardViewType"
            class="mt-8 mb-10 bg-primary"
            borderRadius="10px"
            nameClasses="text-12 leading-[1.2] mt-2 -mb-2"
            height="58px"
            :scale="{ x: 0.9, y: 0.84 }"
            :width="isMobile || isToday ? '50%' : '33%'"
            :tabs="switcherTabs"
            :optionsNumber="isMobile || isToday ? 2 : 3"
            showHoverOnNonActiveTab
          />
        </div>

        <GroupBy
          v-model="localFilters"
          :isToday="isToday"
          :btnWidth="btnWidth"
        />

        <Sorting
          v-model="localFilters"
          :isToday="isToday"
          :btnWidth="btnWidth"
        />

        <ShowCompletedFilter
          v-model="localFilters"
          :btnWidth="btnWidth"
        />

        <div class="flex justify-between items-center pt-30">
          <p class="text-15 font-semibold">Filter by</p>

          <div
            v-show="isFilterUpdated && !isEdit"
            class="flex text-brand text-12 cursor-pointer select-none md:hover:text-dark-default mb-2"
            @click="$emit('clearFilters')"
          >
            Clear filters
          </div>
        </div>

        <div class="flex flex-col md:space-y-6 space-y-12">
          <TaskBoardFilterByMembers
            v-if="!isClient"
            v-model="localFilters"
            :isToday="isToday"
            :options="membersOptions"
            :btnWidth="btnWidth"
          />

          <UrgencyFilter
            v-model="localFilters"
            :btnWidth="btnWidth"
          />

          <div class="flex justify-between items-center">
            <p class="text-13">Labels</p>

            <TagFilter
              v-model="localFilters"
              :showDropDownTitle="false"
              :btnWidth="btnWidth"
              :tags="filteredTags"
              hideTooltip
              :hideBookTitle="!isToday"
            />
          </div>

          <TaskBoardDateFilter
            v-model="localFilters"
            :btnWidth="btnWidth"
          />
        </div>
      </div>

      <ShowOnTask
        v-model="localFilters"
        :isToday="isToday"
      />

      <div v-if="!isClient && !isEdit" class="flex md:justify-end justify-between space-x-10 mt-15 md:mt-0">
        <div
          class="flex justify-end text-grey-275 text-12 cursor-pointer select-none md:hover:text-dark-default mt-10"
          @click="$emit('resetToDefault')"
        >
          Reset to default
        </div>

        <SaveFiltersModal @updateFilters="$emit('updateFilters')" />
      </div>
    </div>
  </DropdownModule>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  initialFilters: IFilters
  filters: IFilters
  filteredTags: TIndexedObject<ITag[]>
  membersOptions: ITeamMember[]
  isToday?: boolean
  isEdit?: boolean
  height?: number
  modelValue?: ISwitcherModelValue
  showViewTypeSwitcher?: boolean
  title?: string
}>(),
{
  isToday: true,
  height: 34,
  title: 'Display'
})

const emit = defineEmits(['filterBy',
  'resetToDefault',
  'clearFilters',
  'updateFilters',
  'update:modelValue'
])

const { isMobile } = useGeneral()
const { isClient } = useProfile()

const dropdownRef = ref()

const btnWidth = ref('w-[140px]')

const switcherTabs = computed(() => {
  const tabs = [
    { key: 'board-view', icon: 'icon-spaces text-14', tooltipText: 'Board view', name: 'Board' },
    { key: 'list-view', icon: 'icon-task-list text-12', tooltipText: 'List view', name: 'List' }
  ]

  if (!isMobile.value && !props.isToday) {
    return [
      ...tabs,
      { key: 'calendar', icon: 'icon-calendar text-18', tooltipText: 'Calendar view', name: 'Calendar' }
    ]
  }

  return tabs
})

const taskBoardViewType = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
})

const localFilters = computed({
  get: () => {
    return {
      filters: {
        ...props.filters
      },
      doRequest: true
    }
  },
  set: (value) => {
    emit('filterBy', value)
  }
})

const filtersAmount = computed(() => {
  if (props.isEdit) return 0

  const filterChecks = [
    JSON.stringify(props.filters.groupBy) !== JSON.stringify(props.initialFilters.groupBy),
    JSON.stringify(props.filters.sortedBy) !== JSON.stringify(props.initialFilters.sortedBy),
    JSON.stringify(props.filters.showCompletedFilter) !== JSON.stringify(props.initialFilters.showCompletedFilter),
    JSON.stringify(props.filters.tagsFilter) !== JSON.stringify(props.initialFilters.tagsFilter),
    JSON.stringify(props.filters.urgencyFilter) !== JSON.stringify(props.initialFilters.urgencyFilter),
    JSON.stringify(props.filters.dateFilter) !== JSON.stringify(props.initialFilters.dateFilter),
    JSON.stringify(props.filters.membersFilter) !== JSON.stringify(props.initialFilters.membersFilter),
    JSON.stringify(props.filters.showOnTask) !== JSON.stringify(props.initialFilters.showOnTask)
  ]

  return filterChecks.filter(Boolean).length
})

const isFilterUpdated = computed(() => {
  const filterChecks = [
    JSON.stringify(props.filters.tagsFilter) !== JSON.stringify(props.initialFilters.tagsFilter),
    JSON.stringify(props.filters.urgencyFilter) !== JSON.stringify(props.initialFilters.urgencyFilter),
    JSON.stringify(props.filters.dateFilter) !== JSON.stringify(props.initialFilters.dateFilter),
    JSON.stringify(props.filters.membersFilter) !== JSON.stringify(props.initialFilters.membersFilter)
  ]

  return filterChecks.filter(Boolean).length
})

defineExpose({
  dropdownRef
})
</script>
