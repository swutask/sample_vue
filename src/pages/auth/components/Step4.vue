<template>
  <div class="overflow-hidden">
    <div class="flex">
      <div class="w-full px-15 md:px-40 flex-shrink-0 z-10">
        <div>
          <p class="auth-title">
            You're in 🎉
          </p>
          <p class="auth-subtitle mb-50">Just a few details to kick things off.</p>
        </div>

        <InputModule
          v-model="account.firstName"
          name="firstName"
          type="text"
          autofocus
          label="First name"
          placeholder="Jane"
          class="w-full mt-30"
          inputClasses="auth-input-classes anim-all"
          label-class="mb-5 auth-label-classes"
          :error-message="errorMessages.firstName"
          @clearErrorMessage="name => errorMessages[name] = null"
        />
        <InputModule
          v-model="account.lastName"
          name="lastName"
          type="text"
          label="Last name"
          placeholder="Doe"
          class="w-full mt-20"
          inputClasses="auth-input-classes anim-all"
          label-class="mb-5 auth-label-classes"
          :error-message="errorMessages.lastName"
          @clearErrorMessage="name => errorMessages[name] = null"
        />

        <div v-if="account.firstName && account.lastName" class="mt-30">
          <span class="font-semibold">Your name badge</span>

          <div class="flex items-center flex-wrap">
            <UserBadge
              :first-name="account.firstName"
              :last-name="account.lastName"
              :avatarUrl="avatar"
              :color="color"
              class="bg-primary flex items-center px-10 py-5 text-14 rounded-8 shadow-sharp font-semibold mr-10 mt-10 max-w-full"
            />  <span class="text-14 font-medium pr-7 pt-9">or</span>

            <label class="block cursor-pointer mt-10">
              <p class="bg-primary flex items-center px-10 py-10 text-13 rounded-8 border border-grey-500 shadow-sharp font-normal">Upload image</p>
              <input ref="inputRef" type="file" class="hidden" @change="uploadLogo">
            </label>

            <p
              v-if="avatar"
              class="cursor-pointer text-13 mt-10 ml-7 opacity-40 hover:opacity-70"
              @click="deleteImage"
            >
              Delete image
            </p>
          </div>

          <ButtonModule
            :prefix="`icon-arrow-circle rotate-${rotateIndex ? '180' : '0'} anim-all`"
            text="Change color"
            class="text-app-color text-14 opacity-40 hover:opacity-70 group mt-10"
            @click.prevent="changeColor"
          />
        </div>

        <ButtonModule
          text="Continue"
          class="w-full justify-center text-white rounded-10 my-30 py-16 font-medium text-17"
          :class="account.firstName.trim() === '' || account.lastName.trim() === ''
            ? 'bg-grey-750 pointer-events-none'
            : 'bg-dark-1000 hover:bg-black'"
          @click.prevent="next"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import colors from '@/core/userColors.json'

import { requiredFieldsValidation } from '@/helpers'
const props = defineProps<{
  modelValue: IAuthUser
}>()

const emit = defineEmits(['next', 'update:modelValue'])

const lastColorIndex = colors.length - 1
const color = ref(colors[Math.floor(Math.random() * lastColorIndex)])
const rotateIndex = ref(true)

const account = reactive({
  firstName: '',
  lastName: ''
})

onMounted(() => {
  nextTick(() => onRender())
})

onBeforeUnmount(() => {
  nextTick(() => onRender())
})

function onRender () {
  account.firstName = props.modelValue.firstName
  account.lastName = props.modelValue.lastName
  color.value = props.modelValue.color || colors[Math.floor(Math.random() * lastColorIndex)]
  file.value = props.modelValue?.avatar
  if (props.modelValue.avatar) {
    for (const a of file.value.entries()) {
      createImage(a[1])
    }
  }
}

const avatar = ref(null)
const file = ref(null)

const errorMessages = reactive({
  firstName: null,
  lastName: null
})

const next = () => {
  requiredFieldsValidation(errorMessages, account)

  if (Object.values(errorMessages).every(i => !i)) {
    emit('update:modelValue', {
      ...props.modelValue,
      color: color.value,
      firstName: account.firstName,
      lastName: account.lastName,
      avatar: file.value,
      avatarURL: avatar.value
    })

    emit('next')
  }
}

watch(() => [color.value, account.firstName, account.lastName, file.value, avatar.value], () => {
  emit('update:modelValue', {
    ...props.modelValue,
    color: color.value,
    firstName: account.firstName,
    lastName: account.lastName,
    avatar: file.value,
    avatarURL: avatar.value
  })
})

function changeColor () {
  rotateIndex.value = !rotateIndex.value
  color.value = colors[Math.floor(Math.random() * lastColorIndex)]
}

function uploadLogo (event: Event) {
  const allFiles = (event.target as HTMLInputElement).files

  if (!allFiles.length) return

  const files = Array
    .from(allFiles)
    .filter(file => (/image/i).test(file.type))

  if (files.length === 0) return

  const formData = new FormData()
  formData.append('data', files[0])

  createImage(files[0])

  file.value = formData
}

function deleteImage () {
  file.value = null
  avatar.value = null
}

function createImage (file: File) {
  const reader = new FileReader()

  reader.onload = (e) => {
    avatar.value = e.target.result
  }

  reader.readAsDataURL(file)
}
</script>
