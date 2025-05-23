<template>
  <div
    class="group flex flex-col items-center px-10 pt-12 pb-20 w-[283px]
    border-2 border-grey-11 rounded-10 hover:border-grey-275 anim-color cursor-pointer select-none"
    :class="[isMobile && 'm-auto']"
    @click="handleClick"
    @mouseenter="mouseOver = true"
    @mouseleave="mouseOver = false"
  >
    <div class="flex w-full">
      <div
        v-if="isFreePlan"
        class="bg-[#DEFBF4] rounded-4 ml-3 mt-1 border border-grey-700
                  text-9 px-4 py-2 font-bold items-center justify-center flex"
        @click.stop="toggleLimitModal({ show: true })"
      >
        PRO
      </div>
      <button
        v-if="item.showCancelAction"
        :class="mouseOver ? 'text-[#1557FF] bg-[#1557ff]' : 'bg-green-main'"
        class="px-10 h-[30px] rounded-6 font-medium text-13 bg-opacity-10 anim-opacity hover:opacity-100 ml-auto"
        @click.stop="handleCancel"
      >
        {{ mouseOver ? 'Disconnect' : 'Connected' }}
      </button>

      <button
        v-if="!item.showCancelAction && !isFreePlan"
        class="opacity-0 group-hover:opacity-70 px-15 rounded-5 ml-auto
        font-medium text-[#1557FF] text-14 bg-[#1557ff] bg-opacity-10  hover:opacity-100 anim-opacity"
        @click.stop="item.action"
      >
        Connect
      </button>
    </div>

    <img :src="src" alt="Google calendar icon" class="mb-20 h-[80px] w-[80px]">

    <p class="mb-4 text-17 font-normal-plus text-center">{{ item.title }}</p>

    <p class="text-13 text-center">{{ item.text }}</p>
  </div>
  <div v-if="calendarSynced">
    <div class="flex-1 p-6 pr-40 select-none">
      <p class="font-bold text-gray-800 mb-25 mt-20" :class="[isMobile && 'ml-4 font-extrabold  text-16 !mb-15']">Your calendars</p>
      <div class="rounded-8 overflow-hidden">
        <div
          v-for="(event, index) in events"
          :key="index"
          class="flex justify-between items-center h-50 p-10 bg-gray-50
          hover:bg-gray-100 rounded-lg border-grey-425 shadow-sm border-t"
          :class="events.length - 1 === index && 'border-b'"
        >
          <div class="flex items-center gap-10">
            <span :style="{ backgroundColor: event?.backgroundColor }" :class="`h-20 w-5 rounded-full`" />
            <span class="text-14 font-medium text-app-color" :class="event.visible ? '' : 'opacity-50'">{{ event.name }}</span>
          </div>
          <i
            class="text-gray-500 hover:text-gray-700 focus:outline-none"
            :class="[event.visible ? 'icon-visibility' : 'icon-visibility_off']"
            @click="toggleVisibility(index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: IIntegrationItem
}>()

const emit = defineEmits(['hideCancelAction'])

const mouseOver = ref(false)
const { isFreePlan, toggleLimitModal } = usePlan()
const { calendarSynced } = useGoogleCalendar()
const { setNotification, isMobile } = useGeneral()

const src = computed(() => {
  return new URL(`/src/assets/images/${props.item.icon}.svg`, import.meta.url).href
})

function handleCancel () {
  props.item.cancelAction()

  emit('hideCancelAction', false)
}

function handleClick () {
  if (!isFreePlan.value && !props.item.showCancelAction) {
    props.item.action()
  } else {
    setNotification({
      uuid: window.crypto.randomUUID(),
      message: 'Google Calendar integration is a PRO functionality, please upgrade.',
      color: 'success'
    })
  }
}
const { setEventType, disableEventType, getCalendarList } = useTask()

const backgroundColors = [
  'rgb(197,239,255)',
  'rgb(239,227,255)',
  'rgb(203,247,237)',
  'rgb(255,224,231)',
  'rgb(214,214,214)',
  'rgb(196,255,251)',
  'rgb(255,255,185)',
  'rgb(237,255,202)',
  'rgb(255,207,184)',
  'rgb(229,229,229)'
]

const events = reactive([])

watchEffect(async () => {
  if (calendarSynced.value) {
    try {
      const list = await getCalendarList()
      Object.entries(list).forEach(([key, type]) => {
        if (key === 'success') return

        const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)]

        events.push({
          name: type,
          type,
          visible: true,
          backgroundColor: randomColor
        })
      })
    } catch (error) {
    }
  }
})

watchEffect(() => {
  events.forEach((event) => {
    event.visible = !disableEventType.value.includes(event.type)
  })
})

const toggleVisibility = (index: number) => {
  events[index].visible = !events[index].visible

  const type = events[index].type
  const isVisible = events[index].visible

  if (isVisible) {
    setEventType(disableEventType.value.filter((eventType) => eventType !== type))
  } else {
    setEventType([...disableEventType.value, type])
  }
}

</script>
