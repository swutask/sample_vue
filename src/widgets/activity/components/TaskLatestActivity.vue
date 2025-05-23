<template>
  <div class="flex flex-col items-start text-13">
    <div class="flex mb-15 justify-between items-center w-full">
      <p class="text-15 font-semibold">Latest activity</p>

      <i
        v-if="!isModal"
        class="cursor-pointer text-grey-250 opacity-80 hover:opacity-100 text-16"
        :class="showLatestActivity ? 'icon-visibility' : 'icon-visibility_off'"
        @click="toggleVisibility"
      />
    </div>

    <template v-if="showLatestActivity">
      <TaskLatestActivityItem
        v-for="(item, index) in latestActivity.slice(0, visibleActivityCount)"
        :key="item.id"
        :isModal="isModal"
        :activity="item"
        :preventShowConnectorTop="index === 0"
        :preventShowConnectorBottom="index === visibleActivityCount - 1 || latestActivity.length === 1"
      />

      <div v-if="latestActivity.length > visibleActivityCount" class="flex items-center mt-10">
        <p
          class="border border-grey-850 bg-primary rounded-8 py-5 px-15 hover:bg-grey-200 cursor-pointer text-12 md:text-11"
          @click="loadMore"
        >
          Load more
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import localStorageService from '@/core/local-storage'

const props = defineProps<{
  latestActivity: ITaskActivity[]
  isModal?: boolean
}>()
const { user } = useProfile()
const showLatestActivity = ref(null)
const minimalLatestActivitiModalViewLoadStep = 6
const minimalLatestActivitiFullScreenViewLoadStep = 5
const visibleActivityCount = ref(props.isModal ? minimalLatestActivitiModalViewLoadStep : minimalLatestActivitiFullScreenViewLoadStep)

function loadMore () {
  visibleActivityCount.value += props.isModal ? minimalLatestActivitiModalViewLoadStep : minimalLatestActivitiFullScreenViewLoadStep
}

watch(() => props.isModal, () => {
  if (props.isModal) {
    showLatestActivity.value = true
  } else {
    showLatestActivity.value = (localStorageService.getItem('latest-activity-visibility') || {})[user.value.id] ?? true
  }
}, { immediate: true })

function toggleVisibility () {
  const localData = localStorageService.getItem('latest-activity-visibility') || {}
  showLatestActivity.value = !showLatestActivity.value

  localData[user.value.id] = showLatestActivity.value

  localStorageService.setItem('latest-activity-visibility', localData)
}
</script>
