<template>
  <div class="h-full w-full flex flex-col justify-between overflow-y-auto">
    <div class="w-full max-w-[320px] mx-auto md:max-w-full md:pl-[100px] pt-31 text-dark-300">
      <div class="flex items-center md:hidden text-app-color" @click="back">
        <i class="text-12 mr-10 icon-keyboard-arrow-left opacity-50" />
        <p class="text-opacity-80">Back</p>
      </div>

      <h2 class="text-app-color mb-15 font-bold text-35 md:text-21">Account</h2>

      <div class="md:flex items-center mb-12">
        <p class="w-[120px] mr-30 mb-5 md:mb-0">Avatar:</p>
        <div class="w-full md:w-[120px] flex items-center ml-50">
          <input ref="inputAvatarRef" type="file" class="hidden" @change="upload($event, 'avatar')">
          <UserBadge
            :showName="false"
            :first-name="user.profile.firstName"
            :last-name="user.profile.lastName"
            :avatarUrl="user.avatar?.url"
            :color="user.profile.color"
            :size="40"
            class="cursor-pointer"
            @click="toggleAvatarUploadInput"
          />
        </div>
      </div>

      <div class="md:flex items-center mb-12">
        <p class="w-[120px] mr-30 mb-5 md:mb-0">First name:</p>
        <InputModule
          v-model="generalData.localUser.profile.firstName"
          class="w-full md:w-[240px] ml-50"
          inputClasses="input-classes"
          @keypress.enter="update"
          @blur="update"
        />
      </div>

      <div class="md:flex items-center mb-12">
        <p class="w-[120px] mr-30 mb-5 md:mb-0">Last name:</p>
        <InputModule
          v-model="generalData.localUser.profile.lastName"
          class="w-full md:w-[240px] ml-50"
          inputClasses="input-classes"
          @keypress.enter="update"
          @blur="update"
        />
      </div>

      <div class="border-b !border-grey-500 my-22 w-[440px]" />

      <div class="md:flex items-center mb-12">
        <p class="w-[120px] mr-30 mb-5 md:mb-0">Email:</p>
        <div>
          <InputModule
            v-model="generalData.localUser.email"
            class="w-full md:w-[240px] ml-50"
            inputClasses="input-classes"
            @clearErrorMessage="generalData.emailError = null"
            @keypress.enter="update"
            @blur="update"
          />
          <p v-if="generalData.emailError" class="text-error text-12">
            {{ generalData.emailError }}
          </p>
        </div>
      </div>

      <div class="md:flex items-center mb-12">
        <p class="w-[120px] mr-30 mb-5 md:mb-0">Password:</p>
        <div class="ml-50">
          <div v-if="generalData.isChangePassword && user.isPassword" class="w-full md:w-[240px] mb-12 ">
            <InputModule
              v-model="generalData.oldPassword"
              type="password"
              placeholder="Old password"
              maxLength="64"
              inputClasses="input-classes tracking-wide"
            />
          </div>
          <div class="w-full md:w-[240px] relative">
            <InputModule
              v-model="generalData.newPassword"
              type="password"
              maxLength="64"
              :readonly="!generalData.isChangePassword"
              :placeholder="generalData.isChangePassword ? 'New password' : '**********'"
              inputClasses="input-classes tracking-wide"
            />
            <p
              class="text-10 text-main-color absolute right-0 top-1/2 -translate-y-1/2 mr-10 cursor-pointer"
              @click="changePassword"
            >
              {{ buttonTitle }}
            </p>
          </div>
        </div>
      </div>

      <div class="border-b border-grey-500 my-22 w-[440px]" />

      <div v-if="isTeamAccount && isAdmin" class="md:flex items-center mb-12">
        <p class="w-[120px] mr-30 mb-5 md:mb-0">Workspace name:</p>
        <InputModule
          v-model="teamName"
          class="w-full md:w-[240px] ml-50"
          inputClasses="input-classes"
          @keypress.enter="updateTeamName"
          @blur="updateTeamName"
        />
      </div>

      <div v-if="isTeamAccount" class="md:flex items-center mb-12">
        <p class="w-[120px] mr-30 mb-5 md:mb-0">Logo:</p>
        <div class="w-full md:w-[240px] flex items-center ml-50">
          <input ref="inputRef" type="file" class="hidden" @change="upload($event, 'logo')">
          <ButtonModule
            v-if="isTeamAccount && !teamLogo"
            text="Upload"
            class="text-13 rounded-6 px-12 py-9 justify-center
            border-grey-700 bg-grey-200 text-grey-950 hover:text-grey-main"
            border-width="border-2"
            @click="toggleUploadInput"
          />

          <div
            v-if="isTeamAccount && teamLogo"
            class="relative"
            @mouseenter="handleChangeLogo(true)"
            @mouseleave="handleChangeLogo(false)"
          >
            <transition name="fade">
              <div
                v-if="showChangeLogoButton"
                class="absolute w-full h-full bg-[rgba(0_0_0_0.1)] flex z-[50] cursor-pointer"
                @click="toggleUploadInput"
              >
                <p class="m-auto py-2 bg-primary border border-sidebar w-[70px] text-10 rounded-4 text-center">
                  Change logo
                </p>
              </div>
            </transition>

            <transition name="fade">
              <button
                v-show="showChangeLogoButton && isAdmin"
                class="absolute top-2 right-5 z-100"
                @click="deleteLogo"
              >
                <i class="icon-close text-14" />
              </button>
            </transition>

            <img class="w-[80px]" :src="teamLogo" alt="TeamLogo" :class="{ 'opacity-50': showChangeLogoButton }">
          </div>
        </div>
      </div>

      <div class="md:flex items-center mb-12">
        <p class="w-[120px] mr-30 mb-5 md:mb-0">Domain:</p>
        <div
          class="relative w-full md:w-[240px] flex items-center ml-50"
          @mouseenter="isDomainHovered = true"
          @mouseleave="isDomainHovered = false"
        >
          <InputModule
            class="w-full"
            :readonly="true"
            :placeholder="domain"
            inputClasses="input-classes"
          />

          <p
            v-if="isDomainHovered"
            class="absolute top-1/2 -translate-y-1/2 right-10 text-main-color cursor-pointer text-10"
            @click="copyDomain"
          >
            Copy
          </p>
        </div>
      </div>

      <div class="border-b border-grey-500 my-22 w-[440px]" />

      <div class="md:flex items-center mb-12">
        <p class="w-[120px] mr-30 mb-5 md:mb-0">Location:</p>
        <InputModule
          v-model="generalData.localUser.profile.location"
          class="w-full md:w-[240px] ml-50"
          inputClasses="input-classes"
          @keypress.enter="update"
          @blur="update"
        />
      </div>

      <div class="md:flex items-center mb-12">
        <p class="w-[120px] mr-30 mb-5 md:mb-0">Timezone:</p>
        <SelectModule
          v-model="generalData.timezone"
          class="w-full md:w-[240px] text-14 ml-50"
          :options="timezones"
          @change="update"
        />
      </div>
    </div>

    <div class="text-right border-hover">
      <ButtonModule
        text="Delete account"
        :has-hover="true"
        class="text-14 py-15 px-5 text-error mr-20 mb-10"
        @click="deleteAccount"
      />
    </div>

    <DeleteAccount ref="confirm" />
  </div>
</template>

<script setup lang="ts">
import { authService, profileService, teamsService } from '@/services'
import { emailValidation } from '@/helpers'
import { timezones } from './timezones'

import { copy } from '@/core/helper-functions'

interface IOptions {
  email: string
  firstName: string
  lastName: string
  location: string
  timezone: string
  position: string
}

const emit = defineEmits(['back'])

const { toggleSettingsModal } = useSettings()
const { user, isClient, setUser, getProfile, setUserAvatar } = useProfile()
const { setNotification, handleLoading } = useGeneral()
const { isAdmin, isTeamAccount, setLogo, team, setTeamName } = useTeam()

const teamLogo = computed(() => team.value?.teamLogo?.url)

const domain = computed(() => {
  if (isClient.value || !isTeamAccount.value) {
    return `app.complex.so/${user.value.profile.userName}`
  } else {
    return `app.complex.so/${team.value.link}`
  }
})
const teamName = ref('')

const confirm = ref(null)
const inputRef = ref(null)
const inputAvatarRef = ref(null)
const showChangeLogoButton = ref(false)

const isDomainHovered = ref(false)
const generalData = reactive({
  isChangePassword: false,
  oldPassword: '',
  newPassword: '',
  localUser: {} as IUser,
  emailError: null,
  timezone: timezones.find(item => {
    const timezone = user.value?.profile?.timezone?.split(' ')[1] || Intl.DateTimeFormat().resolvedOptions().timeZone

    return item.name.split(' ')[1] === timezone
  })
})

const buttonTitle = computed(() => generalData.isChangePassword ? generalData.newPassword.trim() !== '' ? 'confirm' : 'cancel' : 'change')

const deleteAccount = () => {
  confirm.value.open()
}

const handleChangeLogo = (value) => {
  showChangeLogoButton.value = value
}

const changePassword = () => {
  if (generalData.isChangePassword && generalData.newPassword.trim() !== '') {
    authService.passwordUpdate({
      oldPassword: generalData.oldPassword,
      newPassword: generalData.newPassword
    })
      .then((res) => {
        if (res.data.success) {
          toggleSettingsModal(false)

          setNotification({
            uuid: window.crypto.randomUUID(),
            message: 'Your password was successfully changed!',
            color: 'success'
          })
        }
      })
      .catch(({ data }) => {
        toggleSettingsModal(false)

        setNotification({
          uuid: window.crypto.randomUUID(),
          message: data.error.message,
          color: 'error'
        })
      })
  }

  generalData.oldPassword = ''
  generalData.newPassword = ''

  generalData.isChangePassword = !generalData.isChangePassword
}

// const logout = () => {
//   router.push({ name: 'Login' })
//
//   toggleSettingsModal(false)
//   localStorageService.removeItem('lastOpenedProject')
//   localStorageService.removeItem('startOnboarding')
// }

const back = () => {
  emit('back')
}

const update = () => {
  const options = {} as IOptions
  const email = generalData.localUser?.email?.trim()
  const firstName = generalData.localUser.profile?.firstName?.trim()
  const lastName = generalData.localUser.profile?.lastName?.trim()
  const location = generalData.localUser.profile?.location?.trim()
  const timezone = generalData.timezone?.name
  const position = generalData.localUser.profile?.position?.trim()

  if (email) options.email = email
  if (firstName) options.firstName = firstName
  if (lastName) options.lastName = lastName
  if (location) options.location = location
  if (timezone) options.timezone = timezone
  if (position) options.position = position

  const needUpdate = firstName !== user.value.profile.firstName ||
                         lastName !== user.value.profile.lastName ||
                            email !== user.value.email ||
                            location !== user.value.profile.location ||
                            timezone !== user.value.profile.timezone ||
                            position !== user.value.profile.position

  if (needUpdate) {
    generalData.emailError = emailValidation(email)

    if (!generalData.emailError) {
      profileService
        .update(options)
        .then(() => getProfile())
    }
  } else {
    generalData.emailError = null
    setUser(JSON.parse(JSON.stringify(user.value)))
  }
}

const toggleUploadInput = () => {
  inputRef.value.click()
}

const toggleAvatarUploadInput = () => {
  inputAvatarRef.value.click()
}

const upload = (event: Event, type: string) => {
  const allFiles = (event.target as HTMLInputElement).files

  if (!allFiles.length) return

  const file = allFiles[0]

  if (!(/image/i).test(file.type)) {
    return
  }

  const formData = new FormData()
  formData.append('data', file)

  if (type === 'logo') {
    return teamsService.upload(formData)
      .then(res => {
        setLogo(res.data)
      })
  }

  if (type === 'avatar') {
    return profileService.uploadAvatar(formData)
      .then(res => {
        setUserAvatar(res.data.url)
      })
  }
}

user.value && (generalData.localUser = JSON.parse(JSON.stringify(user.value)))

onMounted(() => {
  nextTick(() => {
    teamName.value = team.value?.name
  })
})

onUnmounted(() => {
  generalData.isChangePassword = false
})

function updateTeamName () {
  if (teamName.value.trim() !== '' && teamName.value.trim() !== team.value.name.trim()) {
    setTeamName(teamName.value.trim())
  }
}

function copyDomain () {
  copy(domain.value, () => setNotification({ uuid: window.crypto.randomUUID(), message: 'Link copied' }))
}

function deleteLogo () {
  handleLoading(true)

  return teamsService.deleteLogo()
    .then(() => {
      setLogo(null)
    })
    .finally(() => handleLoading(false))
}
</script>

<style lang="scss">
.input-classes {
  &:focus {
    box-shadow: 0px 0px 0px 1.6px rgba(0,93,218,0.7);
  }

  @apply bg-grey-400 rounded-4 pl-15 py-10 text-14;
}
</style>
