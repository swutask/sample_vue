<template>
  <teleport to="#main_section">
    <transition name="fade">
      <div
        v-if="isModalOpen" class="fixed top-0 left-0 p-15 w-full h-full bg-backdrop flex justify-center items-center z-[10000]"
        @click.self="close"
      >
        <div class="relative bg-primary max-w-[420px] w-full rounded-4 pl-20 pt-20 pr-16 pb-12 shadow-modal dark:shadow-event-dark">
          <div class="text-app-color">
            <p class="text-22 font-black">Export</p>
            <p class="text-14 mt-3">Export the note.</p>

            <div class="flex items-center my-20">
              <p class="text-14 font-semibold mr-7">Choose format:</p>
              <SelectModule
                v-model="exportType"
                class="text-14 w-[110px] rounded-4"
                item-class="uppercase"
                selectedClass="uppercase font-semibold"
                :options="[{id: 1, name: 'pdf'}, {id: 2, name: 'docx'}]"
              />
            </div>
          </div>
          <div class="flex justify-end items-center">
            <ButtonModule
              text="Cancel"
              :has-hover="true"
              class="text-app-color text-15 mr-12 p-5"
              @click="close"
            />
            <ButtonModule
              text="Export"
              class="bg-link-color rounded-4 px-35 py-12 text-white text-15"
              @click="exportFile"
            />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { preventBodyScroll, generateHTML } from '@/core/helper-functions'

const route = useRoute()
const { settings } = useSettings()
const { handleLoading } = useGeneral()
const { currentProject, share } = useProject()

const isModalOpen = ref(false)
const exportType = ref({ id: 1, name: 'pdf' })

function open () {
  preventBodyScroll(true)
  isModalOpen.value = true
}

function close () {
  preventBodyScroll(false)
  isModalOpen.value = false
}

function download (url: string) {
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${currentProject.value.title}`)
  link.click()
}

async function _exportPdf (html: string) {
  handleLoading(true)

  if (route.name === 'Share') {
    return projectService.exportSharedProjectAsPdf(currentProject.value.id, share.value.id, html)
  }

  return projectService.exportPdf(currentProject.value.id, html)
}

async function _exportDocx (html: string) {
  handleLoading(true)

  if (route.name === 'Share') {
    return projectService.exportSharedProjectAsDocx(currentProject.value.id, share.value.id, html)
  }

  return projectService.exportDocx(currentProject.value.id, html)
}

function exportFile () {
  const html = generateHTML(settings.value, currentProject.value.title)

  if (exportType.value.name === 'docx') {
    _exportDocx(html).then(res => {
      download(res.data.url)
      close()
    })
  } else {
    _exportPdf(html).then(res => {
      const blob = new Blob([res.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      download(url)
      close()
    })
  }
}

defineExpose({
  open
})
</script>
