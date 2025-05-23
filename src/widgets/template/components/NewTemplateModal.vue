<template>
  <teleport to="#main_section">
    <transition name="fade">
      <div
        v-if="isModalOpen" class="fixed top-0 left-0 text-14 p-15 w-full h-full bg-backdrop flex justify-center items-center z-[105]"
        @click.self="close"
      >
        <div class="relative bg-primary max-w-[320px] w-full rounded-4 p-15 text-app-color pb-40 shadow-modal dark:shadow-event-dark">
          <div class="flex justify-end">
            <ButtonModule
              :has-hover="true"
              prefix="icon-close"
              class="text-app-color p-5"
              @click="close"
            />
          </div>
          <p class="text-21 font-bold text-app-color leading-none text-center">New template</p>
          <div class="max-w-[200px] mx-auto mt-20">
            <div class="rounded-10 border-2 border-grey-550 p-10">
              <img :src="image" alt="template">
            </div>
            <input
              v-model="name"
              type="text"
              class="w-full rounded bg-transparent outline-none mt-20 text-center border-b-3 border-grey-700"
              placeholder="Enter name of template"
            >

            <SelectModule v-model="type" class="w-[150px] mx-auto text-14 rounded-4 mt-20" :options="options" />

            <div class="text-center">
              <ButtonModule
                :disabled="isDisabled"
                text="Save as template"
                class="bg-link-color rounded-4 px-35 py-14 text-white mt-20"
                @click="addTemplate"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { preventBodyScroll } from '@/core/helper-functions'

const props = defineProps<{
  image?: string
  content?: string
  blob?: Blob
}>()

const { createTemplate } = useTemplate()
const { handleLoading, setNotification } = useGeneral()
const { currentProject: project } = useProject()

const isModalOpen = ref(false)
const name = ref('')
const type = ref({ name: 'For everyone' })
const options = [{ name: 'For everyone' }, { name: 'For me only' }]

const isDisabled = computed(() => name.value.trim() === '')

function open () {
  isModalOpen.value = true
  preventBodyScroll(true)
}

function close () {
  isModalOpen.value = false
  preventBodyScroll(false)
}

function addTemplate () {
  handleLoading(true)

  if (props.image.trim() !== '' && props.content.trim() !== '' && name.value.trim() !== '') {
    const formData = new FormData()

    formData.append('projectTitle', project.value.title)
    formData.append('projectId', project.value.id)
    formData.append('title', name.value)
    formData.append('isShared', (type.value.name === 'For everyone').toString())
    formData.append('content', props.content)
    formData.append('file', new File([props.blob], `${new Date()}.png`))

    createTemplate(formData)
      .then(() => {
        setNotification({ uuid: window.crypto.randomUUID(), message: 'Template successfully saved', color: 'success' })
        name.value = ''
        close()
      })
  }
}

defineExpose({
  open
})

</script>
