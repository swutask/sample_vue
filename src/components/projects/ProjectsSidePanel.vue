<template>
  <div
    v-if="book"
    class="pt-15 pb-20 border-grey-500 group-scope"
    :class="showSidebar ? 'min-w-[260px]' : ''"
  >
    <div class="text-app-color flex items-center justify-between mb-12 md:pl-10">
      <p v-if="showSidebar" class="font-Relative text-17 font-semibold truncate pr-5">Notes</p>

      <div class="flex items-center space-x-5">
        <More
          v-if="currentProject && !isClient && showSidebar"
          :projectId="currentProject.id"
          tooltipText="Note settings"
          isGreyBtn
          positionMenu="left"
          class="hidden group-scope-hover:flex"
          :text="null"
        />

        <ButtonModule
          v-if="!isClient"
          :prefix="`text-grey-1050 ${showSidebar ? 'icon-close-sidebar text-14' : 'icon-menu text-18'}`"
          :tooltipText="showSidebar ? 'Hide sidebar' : 'Show sidebar'"
          teleportTooltip
          tooltip-top
          class="p-7 rounded-8 hover:bg-grey-500 h-29"
          :class="showSidebar ? 'w-29 hidden group-scope-hover:flex' : ''"
          @click="toggle"
        />

        <ButtonModule
          v-if="!isClient && showSidebar"
          borderWidth="1"
          tooltipText="Add new note"
          teleportTooltip
          tooltipTop
          prefix="icon-add text-12 text-grey-1050"
          class="p-7 rounded-8 hover:bg-grey-500 w-29 h-29 flex justify-center"
          @click="addProject(null)"
        />
      </div>
    </div>

    <div
      v-if="showSidebar"
      id="projects show-scrollbar-on-hover"
      class="pb-10 h-full overflow-y-auto min-h-[500px]"
    >
      <Draggable
        :key="filteredProjects.length"
        ref="treeRef"
        :disableDrag="isClient"
        disableDrop="isClient"
        class="fixed-height-side-panel"
        :trigger-class="isMobile ? 'test' : 'tree-node'"
        id-key="id"
        parent-id-key="parentId"
        :flat-data="filteredProjects"
        virtualization
        :indent="20"
        :each-droppable="eachDroppable"
        :edge-scroll="true"
        @drop="onDrop"
        @drag="onDragStart"
      >
        <template #default="{node, path, tree}">
          <ProjectItem
            :project="node"
            :level="node.$level"
            :book="book"
            :folded="node.$folded"
            :immediateNavigation="immediateNavigation"
            @delete="showConfirm"
            @rename="rename"
            @fold="tree.toggleFold(node, path)"
            @updateDefaultNestedProjects="defaultNestedProjects = $event"
          />
        </template>
      </Draggable>
    </div>

    <ConfirmModal
      ref="confirm"
      title="Delete note"
      confirm-btn-title="Delete"
      confirm-btn-class="bg-error"
      @confirm="onDelete"
    >
      <p class="text-14 mt-20 mb-25">Are you sure you want to delete a note with its nested notes?</p>
    </ConfirmModal>
  </div>
</template>

<script setup lang="ts">
import { Draggable } from '@he-tree/vue3'
import localStorageService from '@/core/local-storage'

withDefaults(defineProps<{
  immediateNavigation?: boolean
}>(), {
  immediateNavigation: false
})

const emit = defineEmits(['rename', 'toggle'])

const { isMobile, handleLoading } = useGeneral()
const { deleteProject } = useProject()
const { book, setBookProjects, getBook } = useBook()
const { isClient } = useProfile()
const { currentProject, addProject } = useProject()

const route = useRoute()
const showSidebar = ref(true)

const project = ref(null)
const confirm = ref(null)

const treeRef = ref(null)

const dragNode = ref(null)

const defaultNestedProjects = ref(localStorageService.getItem('default-nested-projects') || [])

const filteredProjects = computed(() => {
  if (!book.value.projects) return []

  return book.value.projects.map(project => {
    return {
      ...project,
      $outerClass: projectItemClasses(project),
      $folded: isFolded(project),
      $draggable: !isClient.value
    }
  }).sort((a, b) => {
    if (a.order > b.order) return 1
    if (a.order < b.order) return -1
    return 0
  })
})

function isFolded (item) {
  return defaultNestedProjects.value.includes(item.id)
}

function projectItemClasses (item) {
  const isActive = +route.query?.page === item.id

  return isActive ? 'rounded-full bg-grey-200' : 'rounded-full hover:bg-grey-200 hover:bg-opacity-50'
}

let timer = null

function onDragStart (value) {
  clearTimeout(timer)
  dragNode.value = value.draggingNode
}

function onDrop (value) {
  const ids = value.targetTree.nodes.map(item => item.id)

  projectService.order(ids)

  value.draggingNode.parentId = value.draggingNode.$pid || null
  handleLoading(true)

  projectService.edit(value.draggingNode.id, {
    title: value.draggingNode.title,
    parentId: value.draggingNode.$pid || null
  }).then(() => {
    timer = setTimeout(() => {
      handleLoading(true)
      getBook(book.value.id)
    }, 500)
  })
}

function eachDroppable (data) {
  const dropLevel = dragNode.value.$level
  const hasChildren = dragNode.value.$children?.length > 0

  const firstCondition = dropLevel === 1 && hasChildren && dragNode.value.$children.some(i => i.subProject.length > 0) && data.$level >= 1
  const secondCondition = dropLevel <= 2 && hasChildren && data.$level >= 2
  const thirdCondition = dropLevel <= 3 && hasChildren && data.$level >= 3

  if (firstCondition || secondCondition || thirdCondition || data.$level >= 4) return false
}

function rename (event) {
  const data = treeRef.value.outputFlatData()
  setBookProjects(data)
  emit('rename', event)
}

function onDelete () {
  deleteProject(project.value.id)
  confirm.value.close()
}

function toggle () {
  showSidebar.value = !showSidebar.value
  emit('toggle', showSidebar.value)
}

function showConfirm (value) {
  if (value.subProject?.length) {
    project.value = value
    confirm.value.open()
  } else {
    deleteProject(value.id)
  }
}
</script>

<style lang="scss">
.he-tree .tree-placeholder{
  opacity: .25 !important;
  background: theme('colors.blue.5fe2ff') !important;
  border-radius: 12px;
  height: 32px;
}

.he-tree .dragging .tree-node:hover{
  background-color: inherit;
}

.fixed-height-side-panel {
  .vl-items {
    height: calc(100vh - 230px) !important;
 }
}
</style>
