<template>
  <div v-if="!isClient && !isChatPage" class="fixed bottom-[75px] lg:bottom-15 right-20 rounded-20 z-[100] md:hidden">
    <ButtonModule @click="showNewTask">
      <template #wrapper>
        <div
          class="rounded-full flex items-center dark:bg-grey-110 bg-primary font-medium dark:shadow-dark-500-05
           shadow-add-task px-18 py-12 active:bg-[#E4FFFA] active:shadow-event-hover transition-colors duration-300"
        >
          <img src="@/assets/images/rounded-plus.svg" class="w-24 h-24 mr-7">

          <p class="font-medium text-brand-new">Task</p>
        </div>
      </template>
    </ButtonModule>
  </div>
</template>

<script setup lang="ts">
const { showNewTaskModal } = useTask()
const { isClient } = useProfile()
const route = useRoute()

const isChatPage = computed(() => route.name === 'Chat')

function showNewTask () {
  showNewTaskModal.value = true
}
</script>
