<template>
  <DropdownModule
    prefix="icon-more-horizontal text-20"
    :width="210"
    zIndex="z-9999"
    :isTeleported="isTeleported"
    background="bg-primary dark:bg-grey-110"
    topPosition="-220px"
    positionMenu="left"
  >
    <template #button>
      <button
        class="inline-flex items-center px-10 py-[6.5px] text-12
                bg-menu-hover text-app-color border border-grey-700 hover:border-grey-675 rounded-6 hover-bg-grey-700"
      >
        <i class="icon-no-notifications mr-5 text-16" />

        {{ mutedUntil && timer ? `Notification paused ${timer}` : 'Pause notifications' }}
      </button>
    </template>
    <div class="flex flex-col text-13">
      <div
        v-for="item in ['30 minutes', '1 hour', '2 hours', '4 hours', '8 hours', 'Until tomorrow']"
        :key="item"
        class="hover:bg-selection px-20 py-8 cursor-pointer"
        :class="{ 'flex items-center justify-between': item === 'Until tomorrow' }"
        @click="pauseNotifications(item)"
      >
        <p class="">{{ item }}</p>

        <p v-if="item === 'Until tomorrow'" class="text-12 text-grey-11">9am</p>
      </div>

      <div
        v-if="mutedUntil"
        class="hover:bg-selection px-20 py-10 cursor-pointer"
        @click="pauseNotifications('Enable notifications')"
      >
        <p class="">Enable notifications</p>
      </div>
    </div>
  </DropdownModule>
</template>

<script setup lang="ts">
import DropdownModule from '@/components/shared/form-controls/DropdownModule.vue'

defineProps<{ isTeleported?: boolean }>()

defineEmits(['update:modelValue'])

const { toggleNotifications, mutedUntil } = useInbox()

function pauseNotifications (item: string) {
  const date = new Date()

  switch (item) {
    case '30 minutes':
      date.setMinutes(date.getMinutes() + 30)

      return toggleNotifications({ key: 'mutedUntil', value: date.toISOString() })

    case '1 hour':
      date.setHours(date.getHours() + 1)

      return toggleNotifications({ key: 'mutedUntil', value: date.toISOString() })

    case '2 hours':
      date.setHours(date.getHours() + 2)

      return toggleNotifications({ key: 'mutedUntil', value: date.toISOString() })

    case '4 hours':
      date.setHours(date.getHours() + 4)

      return toggleNotifications({ key: 'mutedUntil', value: date.toISOString() })

    case '8 hours':
      date.setHours(date.getHours() + 8)

      return toggleNotifications({ key: 'mutedUntil', value: date.toISOString() })

    case 'Until tomorrow':
      date.setDate(date.getDate() + 1)
      date.setHours(9)
      date.setMinutes(0)
      date.setMilliseconds(0)

      return toggleNotifications({ key: 'mutedUntil', value: date.toISOString() })

    case 'Enable notifications':
      return toggleNotifications({ key: 'mutedUntil', value: null })
  }
}

const timer = ref(null)

const myfunc = setInterval(function () {
  if (!mutedUntil.value) {
    timer.value = null

    return
  }

  const now = new Date().getTime()
  const timeLeft = new Date(mutedUntil.value).getTime() - now

  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

  timer.value = `${hours}h ${minutes}m`

  if (timeLeft < 0) {
    timer.value = null
    toggleNotifications({ key: 'mutedUntil', value: null })
    clearInterval(myfunc)
  }
}, 1000)
</script>
