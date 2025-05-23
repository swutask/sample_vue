<template>
  <Modal :is-modal-open="showModal" @close="closeModal">
    <div class="md:flex h-full w-full">
      <TemplateAside class="flex-shrink-0" @toggle="toggle" />

      <div v-for="item in map" :key="item.activeState" :class="{'h-full w-full': activeState === item.activeState}">
        <SavedTemplates
          v-if="!showAside && activeState === item.activeState"
          :title="item.title"
          :activeState="item.activeState"
          :editor="editor"
          @back="toggle"
        />
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
defineProps<{
  editor: any
}>()

const { activeState, showAside, showModal, toggleTemplateAside, toggleTemplateModal } = useTemplate()
const { isMobile } = useGeneral()

const map = [
  {
    title: 'All templates',
    activeState: 'All'
  },
  {
    title: 'Template library',
    activeState: 'Library'
  },
  {
    title: 'My templates',
    activeState: 'Private'
  },
  {
    title: 'Shared templates',
    activeState: 'Shared'
  }
]

toggleTemplateAside(isMobile.value)

function closeModal () {
  toggleTemplateModal(false)

  nextTick(() => {
    toggleTemplateAside(isMobile.value)
  })
}

function toggle () {
  toggleTemplateAside(!showAside.value)
}
</script>
