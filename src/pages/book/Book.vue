<template>
  <div class="flex h-full relative md:overflow-hidden">
    <div
      class="z-100 h-full bg-primary"
      :class="showSidebar ? 'px-10 md:px-13 ' : 'px-10 absolute'"
      data-onboarding-id="onboardingPagesMenuDropdown"
    >
      <ProjectsSidePanel @rename="renameProject" @toggle="showSidebar = $event" />
    </div>

    <div class="h-full w-full mt-45 md:mt-0">
      <Portal :to="isLargeScreen ? 'rightHeaderProjectContent' : 'rightToolsHeaderMobile'">
        <div id="menu-items" class="flex items-center bg-primary gap-10">
          <div v-if="!isLargeScreen" class="pr-5 border-r border-grey-150">
            <ButtonModule
              type="transparent"
              prefix="icon-task-board text-20"
              class="h-[34px] px-5 border-none"
              @click="goToTaskBoard"
            />
          </div>
          <ButtonModule
            v-if="currentProject?.isLocked"
            class="relative text-app-color text-14 p-11 font-medium hover:bg-menu-hover
                      rounded-8 border-0 opacity-50 hover:opacity-100 anim-color-200 mr-5"
            prefix="icon-lock-close text-14"
            tooltipText="Unlock"
            teleportTooltip
            tooltipBottom
            :disabled="isClient"
            @click="lock"
          />

          <Share
            v-if="currentProject && !isClient"
            id="share-menu"
            :project="currentProject"
          />
        </div>
      </Portal>

      <Portal to="projectsSidePanelSlot">
        <div class="flex space-x-5">
          <More
            v-if="currentProject && !isClient"
            :projectId="currentProject.id"
            isGreyBtn
            :text="null"
          />

          <ButtonModule
            v-if="!isClient"
            borderWidth="1"
            prefix="icon-add text-12 text-grey-1050"
            class="p-7 rounded-8 hover:bg-grey-500"
            @click="addProject(null)"
          />
        </div>
      </Portal>

      <div
        class="h-full relative bg-primary"
        :class="isMobile ? '' : 'overflow-y-auto'"
      >
        <Workspace
          v-if="currentProject"
          :key="currentProject.id"
          :project="currentProject"
          :bookId="currentProject.bookId"
          :isNewPageCreated="isNewPageCreated"
          :allowEdit="!currentProject.isLocked"
          @onEnter="isNewPageCreated = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import localStorageService from '@/core/local-storage'
import { removeHTMLTags } from '@/core/helper-functions'
import { Portal } from 'portal-vue'

const { hasTemplates, getTemplates } = useTemplate()
const { isMobile, isLargeScreen, toggleBookLoading, handleLoading } = useGeneral()
const { team, isTeamAccount } = useTeam()
const { getAttachments } = useAttachment()
const {
  currentProject,
  isNewPageCreated,
  addProject,
  getProject,
  getShare,
  setCurrentProject,
  clearProject,
  editProject
} = useProject()
const { booksMemory, getBook, setBooksMemory } = useBook()
const { isClient } = useProfile()

const route = useRoute()
const router = useRouter()

const showSidebar = ref(true)

const bookId = computed(() => +route.params.id)
const projectId = computed(() => +route.query.page)

watch(projectId, (value) => {
  if (value) {
    getProject(projectId.value).then(res => {
      document.title = removeHTMLTags(res.title) + ' - complex'
      localStorageService.setItem('lastOpenedProject', { bookId: bookId.value, projectId: projectId.value })
    })
  }
})

watch(() => route.params.id, (value) => {
  if (value) {
    getBookById()
  }
})

if (!hasTemplates.value) {
  getTemplates('All')
}

function renameProject (event) {
  if (currentProject.value.id === event.id) {
    currentProject.value.title = event.title
  }
}

onMounted(() => {
  if (isTeamAccount.value && team.value.link !== route.params.team) {
    router.push({ name: 'Today', params: { team: team.value.link } })
  } else {
    getBookById()

    getAttachments({
      bookIds: [+route.params.id],
      limit: 50
    })
  }
})

onBeforeRouteLeave((_, from) => {
  if (from.params?.id && from.query?.page) {
    setBooksMemory({
      bookId: +from.params.id,
      projectId: +from.query.page
    })
  }
  clearProject()
})

async function getBookById () {
  toggleBookLoading(true)

  try {
    if (!bookId.value) {
      toggleBookLoading(false)
      return
    }

    const localBook = await getBook(bookId.value)

    if (route.query.page) {
      getShare(route.query.page)

      const project = localBook.projects.find(item => item.id === +route.query.page)
      if (project) {
        document.title = removeHTMLTags(project.title) + ' - complex'
        localStorageService.setItem('lastOpenedProject', { bookId: bookId.value, projectId: route.query.page })
        setCurrentProject(project)
      } else {
        router.replace({ query: { ...route.query, page: localBook.projects[0]?.id } })
        if (localBook.projects[0].id) {
          getShare(localBook.projects[0].id)
        }
      }
    } else {
      const query = localBook.id && booksMemory.value[localBook.id] ? booksMemory.value[localBook.id] : localBook.projects[0]?.id
      getShare(query)

      router.replace({ query: { ...route.query, page: query } })
    }

    toggleBookLoading(false)
  } catch (error) {
    toggleBookLoading(false)
  }
}

function lock () {
  handleLoading(true)

  editProject({
    id: currentProject.value.id,
    data: {
      isLocked: !currentProject.value.isLocked
    }
  }).then(() => {
    setCurrentProject({
      ...currentProject.value,
      isLocked: !currentProject.value.isLocked
    })
  })
}

function goToTaskBoard () {
  router.push({
    name: 'TaskBoardTeam',
    params: {
      team: team.value.link,
      id: bookId.value
    }
  })
}
</script>
