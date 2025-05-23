<template>
  <div>
    <div
      class="relative group text-app-color flex items-center justify-between
             cursor-pointer transition duration-50 select-none text-15 pr-20 mb-5 h-27"
    >
      <!-- @dblclick="toggleTitleEditMode" -->
      <div
        class="flex items-center w-full py-5"
        :class="projectItemContentClasses"
        @click="setProject"
      >
        <Icons
          ref="iconsRef"
          :project="localProject"
          :disableModalToggle="immediateNavigation || isClient"
          class="pr-10 flex-shrink-0"
          @setIcon="setIcon"
        />
        <TitleEditor
          ref="titleEditorRef"
          editorId="project-sidepanel-editor-id"
          :content="localProject.title"
          :pageId="localProject.id"
          :bookId="book.id"
          class="bg-transparent text-canvas-color text-13 side-panel-title truncate cursor-pointer"
          :class="maxWidth"
          isOneLineTitle
          hasEnterHandler
          :allowEmpty="false"
          style="--title-editor-placeholder: ''"
          @onBlur="edit"
          @onUpdate="edit"
          @click="onClick"
        />
      </div>
      <div class="h-full absolute top-0 right-20 flex items-center pl-5">
        <transition name="fade">
          <div
            v-if="!isClient"
            class="flex items-center"
            :class="showMenu || (isMobile && isActive) ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'"
          >
            <div v-if="(level !== 4 && !immediateNavigation)">
              <ButtonModule
                prefix="icon-add text-12 text-app-color p-5"
                has-hover
                @click="addNewProject"
              />
            </div>

            <DropdownModule
              v-if="!immediateNavigation"
              ref="menuDropdownRef"
              prefix="icon-more-horizontal text-20 opacity-50 hover:opacity-100"
              classes="hover:bg-project-hover p-3 rounded-6 anim-color-200"
              :iconHasHover="false"
              class="flex text-app-color"
              :width="200"
              zIndex="z-100"
              background="bg-canvas"
              removeOptionalTopGap
              :positionLeft="256"
              :content-height="159"
              @click="showMenu = !showMenu"
              @close="showMenu = false"
            >
              <div class="text-13">
                <!-- <div class="hover:bg-selection rounded-t-10">
                  <ButtonModule
                    ref="editButtonRef"
                    text="Rename"
                    prefix="icon-edit mr-15 text-app-color"
                    class="text-app-color p-12 w-full"
                    @click.stop="toggleTitleEditMode"
                  />
                </div> -->
                <MoveTo :project="localProject" :book="book" />
                <div class="hover:bg-selection rounded-b-10">
                  <ButtonModule
                    text="Delete"
                    prefix="icon-delete ml-1 mr-15 text-16 text-app-color"
                    class="text-app-color p-12 w-full"
                    @click.stop="onDelete"
                  />
                </div>
              </div>
            </DropdownModule>
          </div>
        </transition>
        <transition name="fade">
          <ButtonModule
            v-if="localProject.subProject?.length"
            :has-hover="true"
            :prefix="folded ?
              'icon-keyboard-arrow-left opacity-50 group-hover:opacity-100' :
              'icon-keyboard-arrow-down opacity-100'
            "
            class="text-app-color text-12 p-5"
            @click.stop="toggleSubProjects"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import localStorageService from '@/core/local-storage'

const props = defineProps<{
  immediateNavigation?: boolean
  project: IProject
  book: IBook
  folded: IFolder
  level: number
}>()

const emit = defineEmits(['delete', 'fold', 'rename', 'updateDefaultNestedProjects'])

const { files, deleteFile } = useFile()
const { isClient } = useProfile()
const { isMobile, setNotification } = useGeneral()
const { setCurrentProject, addProject, editProject, currentProject, isNewPageCreated } = useProject()
const { setIconAndTitle } = useBook()
const router = useRouter()
const route = useRoute()

const temporaryTitle = ''

const iconsRef = ref(null)
const menuDropdownRef = ref()

const titleEditorRef = ref()
const isEdit = ref(false)
const showMenu = ref(false)

const localProject = computed(() => props.project)
const isCurrentProject = computed(() => currentProject.value?.id === props?.project?.id)

const isActive = computed(() => {
  return +route.query?.page === localProject.value.id
})

const maxWidth = computed(() => {
  switch (props.level) {
    case 1:
      return localProject.value.subProject?.length ? 'group-hover:max-w-[117px] max-w-[163px]' : 'group-hover:max-w-[135px]'
    case 2:
      return localProject.value.subProject?.length ? 'group-hover:max-w-[97px] max-w-[159px]' : 'group-hover:max-w-[117px]'
    case 3:
      return localProject.value.subProject?.length ? 'group-hover:max-w-[77px] max-w-[138px]' : 'group-hover:max-w-[100px]'
    case 4:
      return 'max-w-[140px] group-hover:max-w-[110px]'
    default:
      return ''
  }
})

const projectItemContentClasses = computed(() => {
  // if project doesn't have a sub projects
  if (!localProject.value.subProject) {
    return 'max-w-[185px] pl-20 md:pl-40'
  }

  return localProject.value.parentId ? 'max-w-[185px] pl-20 md:pl-18' : 'max-w-[225px] pl-25 md:pl-18'
})

onMounted(() => {
  window.onbeforeunload = () => {
    Object.entries(files.value).forEach(([id, item]) => {
      if (item.percent >= 0) {
        deleteFile(+id)
      }
    })
  }
})

function toggleSubProjects () {
  emit('fold')
  const subProjects = localStorageService.getItem('default-nested-projects') || []

  if (!props.folded) {
    subProjects.push(props.project.id)
    localStorageService.setItem('default-nested-projects', subProjects)
  } else {
    const filteredSubProjects = subProjects.filter(p => p !== props.project.id)
    localStorageService.setItem('default-nested-projects', filteredSubProjects)
  }

  emit('updateDefaultNestedProjects', localStorageService.getItem('default-nested-projects') || [])
}

function onDelete () {
  emit('delete', localProject.value)
  nextTick(() => {
    menuDropdownRef.value.close()
  })
}

function setProject (event) {
  if (Object.values(files.value).some(item => item?.percent >= 0 && item.bookId === props.book.id)) {
    return setNotification({
      uuid: window.crypto.randomUUID(),
      message: 'Your file is still uploading, please wait for it to finish'
    })
  }

  if (iconsRef.value.$el.contains(event.target)) return

  if (props.immediateNavigation) {
    router.push({ name: 'TeamBook', query: { page: localProject.value.id } })
  } else {
    router.replace({ query: { page: localProject.value.id } })
  }

  isNewPageCreated.value = false
}

function addNewProject () {
  addProject(localProject.value.id)
}

function edit (event) {
  if (isClient.value) return
  localProject.value.title = event

  if (localProject.value.title.trim() === '') {
    localProject.value.title = temporaryTitle
  } else if (temporaryTitle !== localProject.value.title) {
    // handleLoading(true)
    editProject({
      id: localProject.value.id,
      data: {
        title: localProject.value.title
      }
    })
    emit('rename', {
      id: localProject.value.id,
      title: localProject.value.title
    })
    if (isCurrentProject.value) {
      setCurrentProject(localProject.value)
    }
  }
}

// function toggleTitleEditMode () {
//   temporaryTitle = localProject.value.title
//   isEdit.value = true

//   nextTick(() => {
//     titleEditorRef.value.focus()
//     titleEditorRef.value.selectContent()
//     menuDropdownRef.value.close()
//   })
// }

function setIcon (icon) {
  localProject.value.icon = icon

  setIconAndTitle({
    projectId: localProject.value.id,
    title: localProject.value.title,
    icon
  })

  return editProject({
    id: localProject.value.id,
    data: {
      title: localProject.value.title,
      icon
    }
  })
}

function onClick (e: Event) {
  if (isEdit.value) {
    e.stopPropagation()
  }
}
</script>

<style lang="scss">
.side-panel-title p {
  @apply flex flex-row items-center text-13 truncate cursor-pointer;
}

.side-panel-title .ProseMirror {
  @apply p-0;
}
</style>
