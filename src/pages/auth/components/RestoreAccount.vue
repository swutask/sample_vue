<template>
  <teleport to="#main_section">
    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed top-0 left-0 p-15 w-full h-full bg-backdrop flex justify-center items-center z-[110]"
        @click.self="close"
      >
        <div class="relative bg-primary max-w-[420px] w-full rounded-4 pl-20 pt-20 pr-16 pb-12">
          <div class="text-grey-main">
            <p class="text-22 font-black">{{ title }}</p>

            <slot />

            <PasswordInput
              v-model="password"
              name="password"
              maxLength="64"
              placeholder="password"
              class="w-full"
              inputClasses="px-22 py-13 rounded-10 border border-grey-11 anim-all bg-primary focus:shadow-signup"
            />
            <p class="text-14 mb-20 mt-5 text-grey-main">* You only have {{ deletedAt }} left to do it.</p>
          </div>
          <div class="flex justify-end items-center">
            <ButtonModule
              text="No, thank you"
              :has-hover="true"
              class="text-grey-main text-15 mr-12"
              @click="close"
            />
            <ButtonModule
              :disabled="!password"
              text="Restore"
              class="rounded-10 bg-[#17DB6D] hover:bg-[#13c861] px-35 py-12 text-white text-15"
              @click="restore"
            />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { preventBodyScroll } from '@/core/helper-functions'

const props = defineProps<{
  email: string | null
  title: string | null
  date: number | null
}>()

const { setNotification } = useGeneral()
const { restoreAccount } = useAuth()
const router = useRouter()

const isModalOpen = ref(false)
const password = ref('')

const deletedAt = computed(() => {
  const day = 1000 * 60 * 60 * 24 // milliseconds in one day
  const currentDate = new Date().getTime()

  const daysLeft = 30 - Math.floor((currentDate - props.date) / day)

  return daysLeft === 1 ? `${daysLeft} day` : `${daysLeft} days`
})

function open () {
  preventBodyScroll(true)
  isModalOpen.value = true
}

function close () {
  preventBodyScroll(false)
  isModalOpen.value = false
  password.value = null
}

function restore () {
  if (password.value.trim()) {
    restoreAccount({ email: props.email, password: password.value }).then(() => {
      router.push({ name: 'Today', params: { team: 'team' } })
      close()
    }).catch(() => {
      setNotification({
        uuid: window.crypto.randomUUID(),
        message: 'Incorrect email or password. Please try again.',
        color: 'error'
      })
      close()
    })
  }
}

defineExpose({
  open
})
</script>
