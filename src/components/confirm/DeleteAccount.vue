<template>
  <teleport to="#main_section">
    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed top-0 left-0 p-15 w-full h-full bg-backdrop flex justify-center items-center z-[110]"
        @click.self="close"
      >
        <div class="relative bg-primary max-w-[420px] w-full rounded-4 pl-20 pt-20 pr-16 pb-12">
          <div class="text-app-color">
            <p class="text-22 font-black">Delete account</p>
            <p class="text-14 mt-20 mb-25">
              Are you sure you want to delete your user account?
            </p>
            <div class="relative mb-40">
              <SelectModule v-model="deleteType" class="text-14 rounded-4" :options="options" />
              <p
                v-if="isRestore"
                class="absolute top-full left-0 text-14 text-app-color mt-5"
              >
                * you'll have 30 days to restore it if you decide to
              </p>
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
              text="Confirm"
              type="black"
              class="px-20 py-6"
              @click="openConfirm"
            />
          </div>
        </div>
        <ConfirmModal
          ref="confirmRef"
          title="Delete account"
          confirm-btn-title="Yes, delete it"
          confirm-btn-cancel="No, I'll keep it"
          @confirm="deleteAccount"
        >
          <p class="text-14 mt-20 mb-25">
            Are you sure?
          </p>
        </ConfirmModal>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { preventBodyScroll } from '@/core/helper-functions'

const { toggleSettingsModal } = useSettings()
const router = useRouter()
const options = [{
  id: 1,
  name: 'Delete with ability to restore'
}, {
  id: 2,
  name: 'Delete completely'
}]

const isModalOpen = ref(false)
const confirmRef = ref(null)
const deleteType = ref({ id: 1, name: 'Delete with ability to restore' })

const isRestore = computed(() => deleteType.value.name === 'Delete with ability to restore')

function open () {
  preventBodyScroll(true)
  isModalOpen.value = true
}

function close () {
  preventBodyScroll(false)
  isModalOpen.value = false
}

function openConfirm () {
  confirmRef.value.open()
}

function deleteAccount () {
  profileService.delete(isRestore.value).then(() => {
    router.push({ name: 'Login' })
    toggleSettingsModal(false)
  })
  close()
}

defineExpose({
  open
})

</script>
