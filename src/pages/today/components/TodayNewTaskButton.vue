<template>
  <div
    class="flex w-full justify-between items-center p-15 rounded-12 cursor-pointer
        border border-primary anim-color card bg-grey-200"
    @click.stop="toggleNewTaskModal(true)"
  >
    <span class="text-14">+ Add task</span>
    <div class="hidden group-hover:flex">
      <ShortCutLabel v-if="!isMobile" class="text-10" first="ALT" second="C" classes="opacity-70 rounded-3" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { toggleNewTaskModal } = useTask()
const { isMobile } = useGeneral()
</script>
