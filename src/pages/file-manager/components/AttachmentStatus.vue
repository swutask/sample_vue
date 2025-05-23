<template>
  <DropdownModule
    icon="icon-more-horizontal text-20 text-grey-275"
    :width="160"
    positionDirection="left"
    background="bg-primary dark:bg-grey-110"
    buttonClasses="!p-4"
    z-index="z-9999"
  >
    <template #button="{isOpen}">
      <div
        class="flex items-center px-10 py-4 w-max rounded-6 cursor-pointer hover:bg-grey-150"
        :class="{'bg-grey-150' : isOpen || hasNoStatus, 'text-grey-975': hasNoStatus}"
      >
        <p class="rounded-full w-7 h-7 mr-8" :style="{background : currentStatus.color}" />
        <p class="text-14">
          {{ currentStatus.name }}
        </p>
      </div>
    </template>

    <div
      v-for="(item, idx) in statuses"
      :key="item.name"
      class="hover:bg-menu-hover py-5 cursor-pointer first:rounded-t-10 last:rounded-b-10"
      :class="{'bg-grey-150' : item.name === currentStatus.name}"
      @click="updateStatus(idx)"
    >
      <div class="flex items-center px-10 py-2">
        <p class="rounded-full w-7 h-7 mr-8" :style="{background : item.color}" />

        <p class="text-14">
          {{ item.name }}
        </p>
      </div>
    </div>
  </DropdownModule>
</template>

<script lang="ts" setup>
import { statuses } from '../utils/file-manager-utils'

const props = defineProps<{
  attachmentId: number
  statusId: number | null
}>()

const emit = defineEmits(['updateStatus'])

const setStatus = { name: 'Set Status', color: '#CCCCCC' }

const currentStatus = ref(statuses[props.statusId] || setStatus)

const hasNoStatus = computed(() => currentStatus.value.name === 'Set Status')

watch(() => props.attachmentId, () => {
  currentStatus.value = statuses[props.statusId] || setStatus
})

async function updateStatus (statusId: number) {
  if (currentStatus.value.name !== statuses[statusId]?.name) {
    currentStatus.value = statuses[statusId]
  } else {
    currentStatus.value = setStatus
  }
  emit('updateStatus', statusId)
}
</script>
