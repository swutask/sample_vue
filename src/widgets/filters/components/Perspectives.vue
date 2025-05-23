<template>
  <div class="flex items-center flex-wrap">
    <PerspectiveItem
      v-for="perspective in perspectives"
      :key="perspective.id"
      class="mr-7 mb-7"
      :perspective="perspective"
      :isActive="+activePerspective === +perspective.id"
      isToday
      @setPerspective="setPerspective"
      @changeFilter="$emit('updatePerspectiveFilters', $event)"
      @click="setPerspective(perspective)"
    />

    <PerspectiveItem
      v-if="isNewVisible"
      class="mr-7 mb-7"
      :perspective="newPerspective"
      isToday
      isNew
      @setPerspective="setPerspective"
      @close="isNewVisible = false"
    />

    <ButtonModule
      v-if="!isNewVisible"
      type="transparent"
      tooltipText="New overview"
      tooltipBottom
      teleportTooltip
      tooltipClasses="text-12 px-10 py-7 rounded-8 z-9999"
      main
      prefix="icon-add text-10"
      class="p-8 h-full hidden md:flex mb-7 relative shadow-none border-grey-250  dark:border-black"
      @click.stop="isNewVisible = true"
    />
  </div>
</template>

<script setup lang="ts">
import { initialFiltersForToday } from '@/pages/task-board/tasks-utils'

defineProps<{
  isToday?: boolean
  activePerspective: number
}>()

const emit = defineEmits(['setPerspective', 'updatePerspectiveFilters'])

const { perspectives } = usePerspectives()
const { member } = useTeam()
const { books } = useBook()

const newPerspective = ref<IPerspective>({
  id: null,
  name: '',
  task: {
    ...initialFiltersForToday,
    membersFilter: [member.value],
    selectedBooksFilter: books.value.filter(b => !b.isSample).map(e => e.id)
  }
})

const isNewVisible = ref(false)

function setPerspective (perspective: IPerspective) {
  emit('setPerspective', perspective)
}
</script>
