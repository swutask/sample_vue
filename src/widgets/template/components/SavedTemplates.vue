<template>
  <div class="h-full w-full flex flex-col justify-between overflow-y-auto text-app-color pr-8 -mr-8">
    <div class="w-full max-w-[300px] mx-auto md:max-w-full md:px-[100px] py-35 md:py-[67px]">
      <div class="flex items-center md:hidden text-app-color" @click="back">
        <i class="text-12 mr-10 icon-keyboard-arrow-left opacity-50" />
        <p class="text-opacity-80">Back</p>
      </div>

      <h2 class="text-app-color mb-35 font-bold text-25 md:text-21 mt-20">{{ title }}</h2>

      <draggable
        v-if="orderedTemplates.length"
        v-model="orderedTemplates"
        :delay="300"
        :delay-on-touch-only="true"
        :force-fallback="true"
        :disabled="dragDisabled || isClient"
        item-key="id"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20"
        @end="onDragEnd"
        @start="onStart"
      >
        <template #item="{ element }">
          <TemplateItem
            :activeState="activeState"
            :template="element"
            @setTemplate="setTemplate"
            @dragStop="dragDisabled = true"
            @dragStart="dragDisabled = false"
          />
        </template>
      </draggable>

      <div v-else>No templates</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
// import draggableMixin from '@/mixins/draggable'

// [draggableMixin]

const props = defineProps<{
  editor: any
  title: string
  activeState: TActiveState
}>()

const emit = defineEmits(['back'])

const { templates } = useTemplate()
const { paste, toggleTemplateModal, setTemplates, orderTemplates, getTemplates } = useTemplate()
const { handleLoading } = useGeneral()
const { isClient } = useProfile()
const { currentProject, setCurrentProject } = useProject()

const dragDisabled = ref(false)

getTemplates(props.activeState)

const orderedTemplates = computed({
  get: () => {
    return templates.value
  },
  set: (value) => {
    const ids = value.map(item => item.id)
    setTemplates(value)

    orderTemplates({ ids })
  }
})

function back () {
  emit('back')
}

function setTemplate (templateId: number) {
  handleLoading(true)

  const project = currentProject.value

  paste(templateId, project.id).then(({ data }) => {
    props.editor.chain().setContent(data.project.body).run()

    setCurrentProject({
      ...project,
      ...data.project
    })

    setTimeout(() => {
      const el = document.querySelector('.title')
      if (el) el.scrollIntoView(false)
      toggleTemplateModal(false)
    }, 400)
  })
}
// todo: move this to helpers
function onDragEnd () {
  const className = 'grabbing'
  const html = document.getElementsByTagName('html').item(0)
  if (html && new RegExp(className).test(html.className) === true) {
    // Remove className with the added space (from setClassToHTMLElement)
    html.className = html.className.replace(
      new RegExp(' ' + className),
      ''
    )
    // Remove className without added space (just in case)
    html.className = html.className.replace(new RegExp(className), '')
  }
}

function onStart () {
  const className = 'grabbing'
  const html = document.getElementsByTagName('html').item(0)
  if (html && new RegExp(className).test(html.className) === false) {
    html.className += ' ' + className // use a space in case there are other classNames
  }
}
</script>
