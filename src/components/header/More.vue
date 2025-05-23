<template>
  <div class="flex">
    <DropdownModule
      ref="dropdownRef"
      :prefix="`icon-logo-dropdown-settings text-15 ${isGreyBtn ? 'text-grey-1050' : ''}`"
      :text="text"
      :tooltipText="tooltipText"
      teleportTooltip
      tooltipTop
      class="flex"
      :width="220"
      :isTeleported="false"
      :classes="isGreyBtn ? 'p-7 rounded-8 hover:bg-grey-500 !opacity-100' : ''"
      :positionMenu="positionMenu"
      background="bg-primary dark:bg-grey-110"
      @open="openModal"
    >
      <div class="rounded-10 text-14">
        <div v-if="!isSharePage" class="rounded-t-10">
          <div class="rounded-t-10 hover:bg-selection group-scope">
            <ButtonModule
              text="Change design"
              prefix="icon-design mr-14"
              class="text-app-color px-20 pt-16 pb-9 w-full"
              @click="changeDesign"
            />
          </div>
        </div>
        <div class="border-b border-hover">
          <div class="hover:bg-selection group-scope" :class="{'pt-10 pb-6 rounded-t-10': isSharePage}">
            <ButtonModule
              text="Send to mail"
              prefix="icon-email text-14 mr-15"
              class="text-app-color px-20 py-9 w-full"
              @click="send"
            />
          </div>

          <div v-if="!isSharePage">
            <ButtonModule
              text="Save as template"
              prefix="icon-note-add text-17 mr-12"
              class="text-app-color px-20 py-9 w-full hover:bg-selection"
              @click="openTemplateModal"
            />
            <ButtonModule
              text="Note templates"
              prefix="icon-templates text-16 mr-12"
              class="text-app-color px-20 py-9 w-full hover:bg-selection"
              @click="openTemplates"
            />
          </div>

          <ButtonModule
            text="Export"
            prefix="icon-export mr-16"
            class="text-app-color pl-20 py-9 w-full"
            @click="toggleExport"
          />

          <div v-if="allowWrite" class="hover:bg-selection group-scope">
            <ButtonModule
              :text="currentProject.isLocked ? 'Unlock' : 'Lock'"
              class="text-app-color px-20 py-9 w-full"
              :prefix="`${currentProject.isLocked ?
                'icon-lock-close mr-14' : 'icon-lock-open mr-14'}`"
              @click="lock"
            />
          </div>

          <div class="hover:bg-selection group-scope">
            <ButtonModule
              text="Print"
              prefix="icon-print text-17 mr-12"
              class="text-app-color px-20 py-9 w-full"
              @click="print"
            />
          </div>
          <div v-if="!isSharePage" class="hover:bg-selection group-scope">
            <ButtonModule
              text="Delete"
              prefix="icon-delete text-17 mr-12"
              class="text-app-color px-20 py-9 w-full"
              @click="onDeleteProject"
            />
          </div>
        </div>

        <div class="px-20 py-12 text-app-color text-13 opacity-80" @click.stop>
          <p>Word count: <span class="font-bold">{{ words }}</span></p>
          <p>File size: <span class="font-bold">{{ fileSize }}</span></p>
          <p class="pr-10">Auto-saved: <span class="font-bold">{{ parseDate(currentProject.updatedAt, 'lastUpdate') }}</span></p>
        </div>
      </div>

      <ButtonModule
        :has-hover="true"
        prefix="icon-info_outline text-main-color"
        class="text-app-color absolute bottom-0 right-0 px-10 py-16 text-19"
        @click="openNoteInfo"
      />
    </DropdownModule>
    <iframe v-if="currentProject && settings" ref="iframeRef" class="w-0 h-0 opacity-0" :srcdoc="html()" />

    <SendModal ref="sendModalRef" :project="currentProject" />
    <ExportModal ref="exportModalRef" />
    <NoteInfo ref="noteInfoRef" :project="currentProject" :size="fileSize" :words="words" />
    <NewTemplateModal
      ref="templateRef"
      :image="templateImage"
      :blob="templateBlob"
      :content="currentProject.body"
    />
    <HeaderDesign ref="headerDesignRef" />
  </div>
</template>

<script setup lang="ts">
import { generateHTML } from '@/core/helper-functions'

import { parseDate } from '@/plugins/filters'
import designConfig from '@/core/design-config'

const loadHtml2Canvas = () => import('html2canvas')

const props = withDefaults(defineProps<{
  isShared?: boolean
  projectId: number
  isGreyBtn?: boolean
  text?: string
  positionMenu?: string
  tooltipText?: string
}>(), {
  isShared: false,
  text: 'Settings',
  positionMenu: 'right'
})

const {
  settings,
  toggleSettingsModal,
  toggleAside,
  updateBackButton,
  changeActiveState
} = useSettings()

const { changeTemplateState, toggleTemplateAside, toggleTemplateModal } = useTemplate()
const { isMobile, handleLoading, toggleBookLoading } = useGeneral()
const {
  currentProject, words, projectSize, share, editProject, deleteProject,
  setCurrentProject, getSize, getSizeOfSharedProject, getProject
} = useProject()
const route = useRoute()

const templateImage = ref(null)
const templateBlob = ref(null)

const headerDesignRef = ref(null)
const dropdownRef = ref(null)
const exportModalRef = ref(null)
const sendModalRef = ref(null)
const iframeRef = ref(null)
const noteInfoRef = ref(null)
const templateRef = ref(null)

const isSharePage = computed(() => route.name === 'Share')

const allowWrite = computed(() => isSharePage.value ? share.value.mode === 'write' : true)

const fileSize = computed(() => {
  if (projectSize.value / 1024 / 1024 < 1) return `${(projectSize.value / 1024).toFixed(0)}kb`
  return `${(projectSize.value / 1024 / 1024).toFixed(2)}Mb`
})

onMounted(() => {
  if (!props.isShared) {
    getProject(props.projectId)
  }
})

function close () {
  dropdownRef.value.close()
}

function toggleExport () {
  exportModalRef.value.open()
  close()
}

function send () {
  sendModalRef.value.open()
  close()
}

function changeDesign () {
  setTimeout(() => {
    close()

    if (isMobile.value) {
      changeActiveState('Design')
      toggleSettingsModal(true)
      toggleAside(false)
      updateBackButton(false)
    } else {
      headerDesignRef.value.open()
    }
  }, 10)
}

function onDeleteProject () {
  close()
  deleteProject(currentProject.value.id)
}

function html () {
  const data = generateHTML(settings.value, currentProject.value.title)

  return data.replace(/insert_body_here/g, currentProject.value.body)
}

function print () {
  const frame = iframeRef.value
  frame.contentWindow.print()
}

function openNoteInfo () {
  noteInfoRef.value.open()
}

async function openTemplateModal () {
  toggleBookLoading(true)
  const element = document.querySelector('#editor-wrapper')
  const maxWidth = designConfig.columns[settings.value.columnWidth]

  const config = {
    backgroundColor: settings.value.theme === 'dark' ? '#201D25' : '#fff',
    proxy: `${import.meta.env.VITE_APP_API}/api/attachments/proxy`,
    height: isMobile.value ? 300 : maxWidth
  }
  const html2canvas = await loadHtml2Canvas()

  html2canvas.default(element as HTMLElement, config)
    .then(canvas => {
      templateImage.value = canvas.toDataURL()
      canvas.toBlob(blob => (templateBlob.value = blob))
      templateRef.value.open()
    })
    .finally(() => toggleBookLoading(false))
}

function openTemplates () {
  if (route.name !== 'Share') {
    changeTemplateState('All')
    toggleTemplateModal(true)
    toggleTemplateAside(false)
  }
}

async function lock () {
  handleLoading(true)

  if (props.isShared) {
    await projectService.editSharedProject(
      share.value.projectId,
      route.params.shareId,
      {
        isLocked: !currentProject.value.isLocked
      }
    )
  } else {
    await editProject({
      id: currentProject.value.id,
      data: {
        isLocked: !currentProject.value.isLocked
      }
    })
  }

  setCurrentProject({
    ...currentProject.value,
    isLocked: !currentProject.value.isLocked
  })
}

function openModal () {
  if (props.isShared) {
    getSizeOfSharedProject(currentProject.value.id)
  } else {
    getSize(currentProject.value.id)
  }
}

</script>
