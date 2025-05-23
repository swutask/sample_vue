<template>
  <Modal
    ref="modal"
    size="w-full md:max-w-[1300px] md:max-h-[850px]"
    :is-modal-open="showSettingsModal"
    @close="closeModal"
  >
    <div class="md:flex h-full w-full text-14">
      <AsideMobile v-if="isMobile" @toggle="toggle" @closeModal="closeModal" />
      <Aside v-if="!isMobile" class="flex-shrink-0" :active-state="activeState" @closeModal="closeModal" />

      <General v-if="!showAside && activeState === 'Account'" key="General" @back="toggle" />
      <Design v-if="!showAside && activeState === 'Design'" key="Design" @back="toggle" />
      <Preferences v-if="!showAside && activeState === 'Preferences'" key="Preferences" @back="toggle" />
      <Notifications v-if="!showAside && activeState === 'Notifications'" key="Notifications" @back="toggle" />
      <Keyboard v-if="!showAside && activeState === 'Keyboard'" key="Keyboard" @back="toggle" />
      <Billing v-if="!showAside && activeState === 'Billing'" key="Billing" @back="toggle" />
      <RemindersSettings v-if="!showAside && activeState === 'Reminders'" key="Reminders" @back="toggle" />
      <Plans v-if="!showAside && activeState === 'Plans'" key="Plans" @back="toggle" />
      <Trash v-if="!showAside && activeState === 'Trash'" key="Trash" @back="toggle" />
      <Integrations v-if="!showAside && activeState === 'Integrations'" key="Integrations" @back="toggle" />
    </div>
  </Modal>
</template>

<script setup lang="ts">
const router = useRouter()

const {
  activeState,
  showAside,
  showSettingsModal,
  toggleAside,
  toggleSettingsModal,
  updateBackButton
} = useSettings()

const { isMobile } = useGeneral()

watch((isMobile), (value) => {
  toggleAside(value)
}, { immediate: true })

function closeModal () {
  toggleSettingsModal(false)
  updateBackButton(true)

  nextTick(() => {
    toggleAside(isMobile.value)
  })

  router.replace({ query: {} })
}

function toggle () {
  toggleAside(!showAside.value)
}
</script>
