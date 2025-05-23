<template>
  <div v-if="showAside" class="text-17 text-app-color bg-primary flex flex-col justify-between h-full w-full overflow-y-auto">
    <div class="w-full pt-30 pb-50 max-w-[320px] mx-auto">
      <h2 class="mb-30 font-bold text-24">Settings</h2>

      <div v-if="isTeamAccount && logo">
        <img :key="logo" class="w-[100px] mb-15" :src="logo" alt="logo">
      </div>

      <!-- Account -->
      <div>
        <p class="font-bold mb-5 text-18">Account</p>

        <div
          class="menu-item hover:bg-hover rounded-10 px-20 bg-grey-450"
          @click="update('Account')"
        >
          <p>General</p>
          <i class="text-14 icon-keyboard-arrow-left rotate-180 opacity-50" />
        </div>
      </div>

      <!-- Design -->
      <div v-if="!isTeamAccount" class="mt-40">
        <p class="font-bold mb-5 text-18">Design</p>
        <div class="rounded-10 bg-grey-450">
          <!-- Font family -->
          <div class="hover:bg-hover px-20">
            <div class="menu-item border-b border-hover" @click="scrollTo('font-family')">
              <p>Font family</p>
              <div class="flex items-center text-14 opacity-50">
                <p>{{ settings.fontFamily }}</p>
                <i class="icon-keyboard-arrow-left rotate-180 ml-16" />
              </div>
            </div>
          </div>

          <!-- Font size -->
          <div class="hover:bg-hover px-20">
            <div class="menu-item border-b border-hover" @click="scrollTo('font-size')">
              <p>Font size</p>
              <div class="flex items-center text-14 opacity-50">
                <p>{{ settings.fontSize }}</p>
                <i class="icon-keyboard-arrow-left rotate-180 ml-16" />
              </div>
            </div>
          </div>

          <!-- Theme -->
          <div class="hover:bg-hover px-20 rounded-b-10" @click="scrollTo('theme')">
            <div class="menu-item border-b border-hover">
              <p>Theme</p>
              <div class="flex items-center text-14 opacity-50">
                <p>{{ settings.theme }}</p>
                <i class="icon-keyboard-arrow-left rotate-180 ml-16" />
              </div>
            </div>
          </div>

          <!-- mode -->
          <div class="menu-item hover:bg-hover px-20" @click="scrollTo('document-mode')">
            <p>Paper mode</p>
            <div class="flex items-center text-14 opacity-50">
              <p>{{ settings.mode }}</p>
              <i class="icon-keyboard-arrow-left rotate-180 ml-16" />
            </div>
          </div>
        </div>
      </div>

      <!-- Preferences -->
      <div class="mt-40">
        <p class="font-bold mb-5 text-18">Preferences</p>
        <div class="rounded-10 bg-grey-450">
          <!-- Checkboxes -->
          <div class="px-20 rounded-t-10">
            <div class="menu-item" @click="update('Preferences')">
              <p>Preferences</p>
              <div class="flex items-center text-14 opacity-50">
                <i class="icon-keyboard-arrow-left rotate-180 ml-16" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!isClient" class="mt-40">
        <p class="font-bold mb-5 text-18">Team notifications</p>
        <div class="rounded-10 bg-grey-450">
          <!-- Checkboxes -->
          <div class="px-20 rounded-t-10">
            <div class="menu-item" @click="update('Notifications')">
              <p>Team notifications</p>
              <div class="flex items-center text-14 opacity-50">
                <i class="icon-keyboard-arrow-left rotate-180 ml-16" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Help -->
      <div class="mt-40">
        <p class="font-bold mb-5 text-18">Help</p>
        <div class="rounded-10 bg-grey-450">
          <!-- Keyboard -->
          <div class="hover:bg-hover px-20 rounded-t-10">
            <div class="menu-item border-b border-hover" @click="update('Keyboard')">
              <p>Keyboard shortcuts</p>
              <div class="flex items-center text-14 opacity-50">
                <i class="icon-keyboard-arrow-left rotate-180 ml-16" />
              </div>
            </div>
          </div>

          <!-- Send -->
          <a href="mailto:hey@complex.so" target="_blank" class="menu-item hover:bg-hover rounded-b-10 px-20">
            <p>Send us a message</p>
            <span class="flex items-center text-14 opacity-50">
              <i class="icon-keyboard-arrow-left rotate-180 ml-16" />
            </span>
          </a>
        </div>
      </div>

      <!-- Payment & plans -->
      <div v-if="hasBillingAccess && !isClient && false" class="mt-40">
        <p class="font-bold mb-5 text-18">Payment & plans</p>
        <div class="rounded-10 bg-grey-450">
          <!-- Billing -->
          <div class="hover:bg-hover px-20 rounded-t-10">
            <div class="menu-item border-b border-hover" @click="update('Billing')">
              <p>Billing</p>
              <div class="flex items-center text-14 opacity-50">
                <i class="icon-keyboard-arrow-left rotate-180 ml-16" />
              </div>
            </div>
          </div>

          <!-- Plans -->
          <div class="menu-item hover:bg-hover rounded-b-10 px-20" @click="update('Plans')">
            <p>Plans & pricing</p>
            <div class="flex items-center text-14 opacity-50">
              <i class="icon-keyboard-arrow-left rotate-180 ml-16" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="!isClient" class="mt-40">
        <p class="font-bold mb-5 text-18">Reminders</p>
        <div
          class="menu-item hover:bg-hover rounded-10 px-20 bg-grey-450"
          @click="update('Reminders')"
        >
          <p>Reminders</p>
          <i class="text-14 icon-keyboard-arrow-left rotate-180 opacity-50" />
        </div>
      </div>

      <!-- Restore -->
      <div v-if="showTrash && !isClient" class="mt-40">
        <p class="font-bold mb-5 text-18">Restore</p>
        <div
          class="menu-item hover:bg-hover rounded-10 px-20 bg-grey-450"
          @click="update('Trash')"
        >
          <p>Trash</p>
          <i class="text-14 icon-keyboard-arrow-left rotate-180 opacity-50" />
        </div>
      </div>

      <div v-if="!isClient" class="mt-40">
        <p class="font-bold mb-5 text-18">Other</p>
        <div class="rounded-10 bg-grey-450">
          <div v-if="isTeamAccount" class="hover:bg-hover px-20 rounded-t-10">
            <div class="menu-item border-b border-hover" @click="update('Integrations')">
              <p>Integrations</p>
              <div class="flex items-center text-14 opacity-50">
                <i class="icon-keyboard-arrow-left rotate-180 ml-16" />
              </div>
            </div>
          </div>

          <div v-if="showStatisticButton && isTeamAccount" class="hover:bg-hover px-20 rounded-t-10">
            <div class="menu-item border-b border-hover" @click="goToStatistic">
              <p>Statistic</p>
              <div class="flex items-center text-14 opacity-50">
                <i class="icon-keyboard-arrow-left rotate-180 ml-16" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- L O G  O U T  B U T T O N -->
      <ButtonModule
        text="Log out"
        class="bg-link-color text-white rounded-4 py-12 px-40 mt-30 mb-50 w-full flex flex-col items-center"
        @click="logout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import localStorageService from '@/core/local-storage'
const emit = defineEmits(['toggle'])

const router = useRouter()
const {
  settings,
  showAside,
  changeActiveState,
  toggleSettingsModal
} = useSettings()
const { user, isClient } = useProfile()
const { team, isAdmin, isTeamAccount, hasBillingAccess } = useTeam()

const showTrash = computed(() => isTeamAccount.value ? isAdmin.value : true)
const logo = computed(() => team.value?.teamLogo?.url)
const showStatisticButton = computed(() => user.value.role.name === 'admin')

const update = (value: string) => {
  changeActiveState(value)
  emit('toggle')
}

const scrollTo = (to: string) => {
  update('Design')

  setTimeout(() => {
    const el = document.getElementById(to)
    if (el) el.scrollIntoView(true)
  }, 100)
}

const logout = () => {
  router.push({ name: 'Login' })
  toggleSettingsModal(false)
  localStorageService.removeItem('lastOpenedProject')
  localStorageService.removeItem('startOnboarding')

  const html = document.getElementsByTagName('html').item(0)
  html.removeAttribute('class')
}

function goToStatistic () {
  router.push({ name: 'Statistic' })

  toggleSettingsModal(false)
}
</script>

<style lang="scss">
.menu-item {
  @apply flex items-center w-full justify-between py-15 cursor-pointer;
}
</style>
