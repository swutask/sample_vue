<template>
  <teleport to="#main_section">
    <transition name="fade">
      <div
        v-if="isModalOpen" class="fixed top-0 left-0 p-15 w-full h-full bg-backdrop flex justify-center items-center z-[105]"
        @click.self="close"
      >
        <div class="relative bg-primary max-w-[420px] w-full rounded-4 p-20 shadow-modal dark:shadow-event-dark">
          <div class="text-app-color">
            <p class="text-22 font-black">Send to mail</p>
            <p class="text-14 mt-3 max-w-full">Send the document to any mail address. Separate emails with a comma for multiple addresses.</p>

            <div class="mt-20 mb-25">
              <InputModule
                v-model="email"
                type="email"
                class="max-w-full"
                placeholder="complex@gmail.com"
                inputClasses="bg-grey-400 px-22 py-11 text-15 rounded-4 focus:shadow-[0px_0px_0px_1.6px_rgba(0,93,218,0.7)]"
                :error-message="error"
                @keypress.enter="send"
                @clearErrorMessage="error = null"
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
              text="Send"
              class="bg-link-color rounded-4 px-35 py-12 text-white text-15 "
              @click="send"
            />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { preventBodyScroll, generateHTML } from '@/core/helper-functions'
import { emailValidation } from '@/helpers'
import localStorageService from '@/core/local-storage'

const props = defineProps<{
  project: IProject
}>()

const route = useRoute()
const { settings } = useSettings()
const { setNotification } = useGeneral()
const { share } = useProject()

const isModalOpen = ref(false)
const email = ref(localStorageService.getItem('sendTo') || '')
const error = ref(null)

function open () {
  preventBodyScroll(true)
  isModalOpen.value = true
}

function close () {
  preventBodyScroll(false)
  isModalOpen.value = false
}

function send () {
  localStorageService.setItem('sendTo', email.value)

  if (!error.value) {
    error.value = emailValidation(email.value)
  }

  const html = generateHTML(settings.value, props.project.title)

  if (!error.value && email.value.trim() !== '') {
    if (route.name === 'Share') {
      projectService.sendShared({ email: email.value, projectId: props.project.id, shareId: share.value.id, html })
        .then(() => {
          setNotification({ uuid: window.crypto.randomUUID(), message: 'Note was successfully sent', color: '' })
          close()
        }).catch(() => close())
    } else {
      projectService.send({ email: email.value, projectId: props.project.id, html })
        .then(() => {
          setNotification({ uuid: window.crypto.randomUUID(), message: 'Note was successfully sent', color: '' })
          close()
        }).catch(() => close())
    }
  }
}

defineExpose({
  open
})
</script>
