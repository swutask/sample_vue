<template>
  <DropdownModule
    :width="200"
    :appendToBody="false"
    remove-optional-top-gap
    background="bg-primary dark:bg-grey-110"
    z-index="z-9999"
  >
    <template #button>
      <ButtonModule
        prefix="icon-milestone"
        :text="buttonText"
        class="p-3 hover:bg-menu-hover text-dark-default !opacity-100 hover:opacity-50 rounded-8 cursor-pointer"
        hasHover
      />
    </template>

    <div
      v-for="(item, idx) in milestones"
      :key="item.id"
      class="hover:bg-menu-hover py-5 px-10 cursor-pointer"
      :class="[idx === 0 ? 'rounded-t-10' : '', idx === milestones.length - 1 ? 'rounded-b-10' : '',
               task.milestoneId === item.id ? 'bg-menu-hover' : '']"
      @click.stop="assignTaskToMilestone(item)"
    >
      {{ item.title }}
    </div>
  </DropdownModule>
</template>

<script setup lang="ts">
const props = defineProps<{
  task: ITask
}>()

const emit = defineEmits(['assignToMilestone'])
const { milestones } = useBook()

const buttonText = computed(() => {
  return milestones.value.find(item => item.id === props.task.milestoneId)?.title || 'Milestone'
})

function assignTaskToMilestone (milestone: IMilestone) {
  emit('assignToMilestone', milestone)
}
</script>
