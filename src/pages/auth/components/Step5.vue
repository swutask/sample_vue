<template>
  <div class="overflow-hidden">
    <div class="flex">
      <div class="w-full px-15 md:px-40 flex-shrink-0 z-10">
        <div class="w-full">
          <p class="auth-title">Create your workspace</p>
        </div>

        <div class="flex mt-20 mx-auto items-center">
          <TeamLogo
            v-if="teamLogo"
            class="mr-5"
            :showName="false"
            :sharedPageInfo="{ logo: teamLogo, name: companyName }"
          />

          <p
            v-if="companyName && !teamLogo"
            class="flex justify-center items-center text-22 rounded-[8px] ml-5
         h-45 w-45 leading-[1.6] text-white bg-brand-new flex-shrink-0 mr-15"
          >
            {{ companyName?.charAt(0).toUpperCase() }}
          </p>

          <label class="block cursor-pointer mr-15">
            <p
              class="bg-primary flex items-center px-10 py-7 text-13 border
             border-grey-500 rounded-8 shadow-sharp font-normal"
            >Upload image</p>
            <input ref="inputRef" type="file" class="hidden" @change="uploadLogo">
          </label>

          <p v-if="teamLogo" class="opacity-40 hover:opacity-70 cursor-pointer text-13" @click="deleteImage">Delete image</p>
        </div>

        <InputModule
          v-model="companyName"
          autofocus
          name="companyName"
          label="Workspace name"
          placeholder="My workspace"
          class="w-full mt-30 font-normal"
          inputClasses="auth-input-classes anim-all"
          label-class="mb-5 auth-label-classes"
          :error-message="errorMessages.companyName"
          @clearErrorMessage="clearErrorMessage"
        />

        <p class="mt-20 mb-5 auth-label-classes">Workspace URL</p>
        <div class="auth-input-classes anim-all">
          <span class="text-grey-250 py-2">complex.so/</span>
          <span>{{ link }}</span>
        </div>

        <ButtonModule
          text="Continue"
          class="w-full justify-center text-white rounded-10 mt-30 mb-50 py-16 font-medium text-17"
          :class="companyName.trim() === '' ? 'bg-grey-750 pointer-events-none' : 'bg-dark-1000 hover:bg-black'"
          @click.prevent="continueRegister"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { requiredFieldsValidation } from '@/helpers'

const props = defineProps<{
  user: IAuthUser
  modelValue: IAuthTeam
}>()

const emit = defineEmits(['next', 'update:modelValue'])

const companyName = ref('')
const file = ref(null)
const teamLogo = ref(null)
const teamSize = ref({ name: 'How big is your team?', size: undefined })

const sizes = [
  { name: 'Just me', size: 1 },
  { name: '1-5', size: 5 },
  { name: '5-25', size: 25 },
  { name: '25-100', size: 100 },
  { name: '100-250', size: 250 },
  { name: '250-1000', size: 1000 },
  { name: '1000+', size: -1 },
  { name: 'Prefer not to share', size: null }
]

onMounted(() => {
  nextTick(() => onRender())
})

onBeforeUnmount(() => {
  nextTick(() => onRender())
})

watch(() => [companyName.value, teamSize.value.size, file.value], () => {
  emit('update:modelValue', {
    logo: file.value,
    logoUrl: teamLogo.value,
    name: companyName.value,
    size: teamSize.value.size
  })
})

const errorMessages = reactive({
  companyName: ''
})

function onRender () {
  companyName.value = props.modelValue?.name || ''
  file.value = props.modelValue?.logo
  teamLogo.value = props.modelValue?.logoUrl
  teamSize.value = sizes.find((e) => e.size === props.modelValue?.size) || { name: 'How big is your team?', size: undefined }
}

const link = computed(() => {
  return companyName.value.trim() !== '' ? companyName.value.toLowerCase().split(' ').join('-') : ''
})

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

function createImage (file: File) {
  const reader = new FileReader()

  reader.onload = (e) => {
    teamLogo.value = e.target.result
  }
  reader.readAsDataURL(file)
}

function deleteImage () {
  file.value = null
  teamLogo.value = null
}

const continueRegister = () => {
  requiredFieldsValidation(errorMessages, { companyName: companyName.value })

  if (Object.values(errorMessages).every(i => !i)) {
    emit('next')
    emit('update:modelValue', {
      logo: file.value,
      name: companyName.value,
      logoUrl: teamLogo.value,
      size: teamSize.value.size
    })
  }
}

function clearErrorMessage (name: string) {
  errorMessages[name] = null
}
</script>
