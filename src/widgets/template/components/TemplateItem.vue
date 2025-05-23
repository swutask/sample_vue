<template>
  <div class="relative text-app-color group">
    <div v-if="isCreator" class="absolute top-3 right-10 opacity-0 group-hover:opacity-100" :class="{'opacity-100': isModalOpen}">
      <DropdownModule
        prefix="icon-more-horizontal text-25 text-app-color right-0"
        class="select-none z-10 p-5"
        :width="74"
        :isTeleported="false"
        button-opacity="90"
        background="bg-primary dark:bg-grey-110"
        @click="isModalOpen = true"
        @close="isModalOpen = false"
      >
        <ButtonModule
          prefix="icon-edit text-17"
          class="py-13 px-10 relative text-grey-main"
          has-hover
          tooltipText="edit"
          button-opacity="80"
          @click="setEdit"
        />

        <ButtonModule
          prefix="icon-delete text-17"
          class="py-13 px-10 relative text-grey-main"
          has-hover
          tooltipText="delete"
          button-opacity="80"
          @click="deleteTemplate"
        />
      </DropdownModule>
    </div>

    <div
      class="group-scope relative min-h-[200px] rounded-10 border-2 border-grey-550 hover:border-grey-975 p-10 px-30 cursor-pointer anim-color"
      @click="setTemplate"
    >
      <img :src="template.templateAttachments[0].url" alt="template" class="h-[200px] w-full object-cover object-left">

      <div class="hidden group-scope-hover:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full justify-center">
        <button
          class="px-20 py-7 rounded-5 font-medium text-[#1557FF]
               text-14 bg-[#c5d4fa] bg-opacity-100 hover:bg-opacity-[80%] anim-opacity"
        >
          Open template
        </button>
      </div>
    </div>

    <p v-if="!isEdit" class="text-center mt-10">{{ title }}</p>

    <input
      v-else
      ref="inputRef"
      v-model="title"
      v-focus="true"
      type="text"
      class="w-full bg-transparent outline-none mt-10 text-center"
      @blur="unsetEdit"
    >

    <SelectModule v-if="isCreator && isTeamAccount" v-model="select" class="w-[150px] mx-auto text-14 rounded-4 mt-10" :options="options" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  template: ITemplate
  activeState: TActiveState
}>()

const emit = defineEmits(['setTemplate', 'dragStart', 'dragStop'])

const { handleDeleteTemplate, updateTemplate, deleteTemplate: deleteTemplateAction } = useTemplate()
const { handleLoading } = useGeneral()
const { isTeamAccount } = useTeam()
const { user } = useProfile()

let timer = null

const options = [
  { name: 'For everyone' },
  { name: 'For me only' }
]

const isModalOpen = ref(false)
const isEdit = ref(false)
const inputRef = ref(null)

const isCreator = computed(() => props.template.userId === user.value.id)

const select = computed({
  get: () => ({ name: props.template.teamId ? 'For everyone' : 'For me only' }),
  set: (value) => {
    if (value.name !== select.value.name) {
      if (props.activeState !== 'All') handleDeleteTemplate(props.template.id)

      updateTemplate({
        id: props.template.id,
        title: title.value,
        isShared: value.name === 'For everyone'
      })
    }
  }
})

const title = computed({
  get: () => props.template.title,
  set: (value) => {
    clearTimeout(timer)

    if (value.trim() !== '') {
      timer = setTimeout(() => {
        updateTemplate({
          id: props.template.id,
          title: value,
          isShared: !!props.template.teamId
        })
      }, 300)
    }
  }
})

function deleteTemplate () {
  handleLoading(true)
  deleteTemplateAction(props.template.id)
}

function setTemplate () {
  emit('setTemplate', props.template.id)
}

function setEdit () {
  emit('dragStop')
  isEdit.value = true
}

function unsetEdit () {
  emit('dragStart')
  isEdit.value = false
}
</script>
