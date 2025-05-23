<template>
  <div class="h-full w-full flex flex-col justify-between overflow-y-auto text-app-color">
    <div class="w-full max-w-[320px] mx-auto md:max-w-full md:pl-[100px] pt-31 md:px-50 pb-50">
      <div class="flex items-center md:hidden" @click="back">
        <i class="text-12 mr-10 icon-keyboard-arrow-left opacity-50" />
        <p class="text-opacity-80">Back</p>
      </div>

      <h2 class="font-bold text-35 md:text-21">Trashed items</h2>
      <p class="text-dark-300">All items will be permanently deleted after 20 days in trash</p>

      <p class="font-bold mt-35">Folders</p>
      <div v-if="trashedFolders.length">
        <TrashItem
          v-for="(folder, index) in trashedFolders"
          :key="folder.id"
          isFolder
          :hasSize="false"
          :item="folder"
          :class="{ 'border-b border-hover': index !== trashedFolders.length - 1}"
          @restore="restoreF(folder.id)"
          @delete="deleteFolder(folder.id)"
        />
      </div>
      <div v-else class="text-14 text-grey-800">
        No folders have been deleted yet
      </div>

      <p class="font-bold mt-35">Spaces</p>
      <div v-if="trashedBooks.length">
        <TrashItem
          v-for="(book, index) in trashedBooks"
          :key="book.id"
          :hasSize="false"
          :item="book"
          :icon="book.icon"
          :class="{ 'border-b border-hover': index !== trashedBooks.length - 1}"
          @restore="restoreB(book.id)"
          @delete="deleteBook(book.id)"
        />
      </div>
      <div v-else class="text-14 text-grey-800">
        No spaces have been deleted yet
      </div>

      <p class="font-bold mt-35">Notes</p>
      <div v-if="trashedProjects.length">
        <TrashItem
          v-for="(project, index) in trashedProjects"
          :key="project.id"
          :item="project"
          :hasSize="true"
          :size="sizes[project.id]"
          :icon="project.icon"
          :class="{ 'border-b border-hover': index !== trashedProjects.length - 1}"
          @restore="restoreP(project.id)"
          @delete="deleteProject(project.id)"
        />
      </div>
      <div v-else class="text-14 text-grey-800">
        No notes have been deleted yet
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['back'])

const { trash: trashedProjects, sizes, getDeletedProjects, restoreProject } = useProject()
const { trash: trashedBooks, getDeletedBooks, restoreBook, trashedFolders, restoreFolder } = useBook()

onMounted(() => {
  getDeletedBooks()
  getDeletedProjects()
})

function deleteBook (id: number) {
  bookService.permanentDelete(id).then(() => getDeletedBooks())
}

function deleteFolder (id: number) {
  bookService.deleteFolder(id, true).then(() => getDeletedBooks())
}

function deleteProject (id: number) {
  projectService.permanentDelete(id).then(() => getDeletedProjects())
}

function restoreB (id: number) {
  restoreBook(id).then(() => getDeletedBooks())
}

function restoreF (id: number) {
  restoreFolder(id).then(() => getDeletedBooks())
}

function restoreP (id: number) {
  restoreProject(id).then(() => getDeletedProjects())
}

function back () {
  emit('back')
}
</script>
