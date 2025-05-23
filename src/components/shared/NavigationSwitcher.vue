<template>
  <div
    class="text-app-color flex items-center select-none"
    :class="{'h-36': !isMainNavigation}"
  >
    <div class="flex items-center w-full h-full" :class="additionalGap">
      <template v-for="(item, idx) in routes" :key="item.name">
        <div
          v-if="visibilityCondition(item)"
          :ref="el => indexRefs[idx] = el"
          :data-onboarding-id="item.id"
          class="cursor-pointer z-5 flex justify-center items-center rounded-20 relative"
          :class="[customHeight, marginRight]"
          @click="toggle(idx)"
        >
          <ButtonModule
            :prefix="item.icon"
            :tooltipText="isMainNavigation ? item.text : null"
            :text="item.text"
            :titleClass="isMainNavigation ? 'flex lg:hidden text-11' : ''"
            :type="hideActiveItem ? 'footer' : 'navigate'"
            teleportTooltip
            :iconHasMargin="false"
            skipGap
            classes="flex flex-col"
            class="h-full justify-center"
            :class="[isMainNavigation ? 'text-18 w-[68px] lg:w-[51px] px-15 py-5' : 'text-13 px-15 py-10 w-full',
                     !(isMainNavigation && route.params.id) && route.name !== 'Onboarding' ?
                       activeIndex === idx && (!showSearch || isLargeScreen) ? activeTextColor : '' : '',
                     route.params.id ? activeIndex === idx ? 'text-dark-default' : '' : ''
            ]"
          />

          <div
            v-if="item.isForPro && isFreePlan"
            class="absolute right-[-8px] top-[-12px]  bg-[#DEFBF4] dark:bg-primary rounded-4 ml-3 mt-1 border border-grey-700
                  text-9 px-4 py-2 font-bold items-center justify-center flex"
          >
            PRO
          </div>

          <NotificationDot
            v-if="showDot(item)"
            :unreadCount="showDot(item)"
            class="absolute top-6 lg:left-28 left-40"
          />
        </div>
      </template>
    </div>

    <div
      v-if="!(route.params.id && isMainNavigation)
        && !hideActiveItem
        && dynamicItemVisibilityCondition
        && route.name !== 'Onboarding'
        && route.name !== 'TeamMembers'"
      class="active-item fixed z-1 bg-grey-150 rounded-20"
      :class="[customHeight, isMainNavigation ? 'px-15 py-5' : 'px-20 py-8']"
      :style="{width: `${width}px`,
               left: `${newPositionLeft}px`,
               top: `${topPosition}px`
      }"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  customHeight?: string
  routes: INavigationRoute[]
  isMainNavigation?: boolean
  bookId?: number
  updateValue?: any
  activeTextColor?: string
  hideActiveItem?: boolean
  additionalGap?: string
  marginRight?: string
}>(), {
  customHeight: 'h-30',
  marginRight: 'mr-10',
  activeTextColor: 'text-dark-default'
})

const { team } = useTeam()

const route = useRoute()
const router = useRouter()
const { unreadMessageCount } = useChat()
const { isSidebarCollapsed } = useSidebar()
const { showSearch, isLargeScreen } = useGeneral()
const { togglePlansInfoModal, isFreePlan } = usePlan()

const indexRefs = ref([])
const activeIndex = ref()
const width = ref()
const newPositionLeft = ref()
const topPosition = ref()

const showDot = computed(() => (item) => {
  // TODO rewrite it
  if (item.name === 'Chat') {
    return unreadMessageCount.value
  } else {
    return 0
  }
})

const visibilityCondition = computed(() => (item) => {
  return item.isVisible && (item.isPined || !props.isMainNavigation)
})

const dynamicItemVisibilityCondition = computed(() => {
  return props.isMainNavigation
    ? props.routes.find((item) => item.name === route.name)?.isPined
    : true
})

onMounted(() => {
  setTimeout(() => {
    setInitialActiveIndex()

    setPosition()

    // reset position because sometimes it goes to wrong position
    setTimeout(() => {
      setPosition()
    })
  }, 300)
})

onUpdated(() => {
  setPosition()
})

watch(() => props.updateValue, () => {
  setTimeout(() => {
    setPosition()
  }, 300)
})

watch(() => route.name, () => {
  setInitialActiveIndex()

  setTimeout(() => {
    setPosition()
  }, 100)
})

watch(() => isSidebarCollapsed.value, () => {
  setTimeout(() => {
    setPosition()
  }, 200)
})

function setPosition () {
  const newElement = indexRefs.value[activeIndex.value]
  const rect = newElement?.getBoundingClientRect()

  newPositionLeft.value = rect?.left
  topPosition.value = rect?.top
  width.value = rect?.width
}

function setInitialActiveIndex () {
  activeIndex.value = props.routes.map(item => item.name)?.indexOf(route.name.toString())
}

function toggle (val: number) {
  activeIndex.value = val

  const params: {
    team: string
    id?: number
  } = { team: team.value.link }

  if (props.bookId) {
    params.id = props.bookId
  }

  if (props.routes[val]?.isForPro && isFreePlan.value) {
    togglePlansInfoModal(true)
    return
  }

  const name = props.routes[val].name

  router.push({ name, params })

  setPosition()
}
</script>

<style lang="scss" scoped>
.active-item {
  transition: all ease-in-out 0.2s;
}
</style>
