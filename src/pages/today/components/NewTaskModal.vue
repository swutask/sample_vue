<template>
  <teleport to="#main_section">
    <transition name="fade">
      <div
        v-if="showNewTaskModal && allowAddTasks"
        v-closeOnPressEsc="close"
        class="fixed top-0 left-0 px-15 pt-[75px] md:pt-[60px] w-full h-full bg-light-backdrop z-[110] overflow-y-auto"
        @click.self="close"
      >
        <NewTodayTask class="relative top-0 md:top-[10%] mx-auto md:pb-[120px]" @close="close" />
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
const { showNewTaskModal, toggleNewTaskModal } = useTask()
const { allowAddTasks } = usePlan()

function close () {
  toggleNewTaskModal(false, {})
}
</script>
