<template>
  <div id="main" class="h-full">
    <LoadingModule class="fixed" :loading="loading" />
    <template v-if="loaded">
      <div v-if="share && share.isActive && currentProject" class="h-full">
        <div class="h-full">
          <div class="fixed top-0 left-0 w-full z-50 bg-primary">
            <div class="flex max-w-[1000px] mx-auto p-20 justify-between w-full">
              <TeamLogo v-if="share.team" :sharedPageInfo="share.team" />

              <LogoModule v-else />

              <div class="flex items-center">
                <ButtonModule
                  v-if="isWriteMode"
                  :text="isMobile ? '' : 'lock'"
                  class="text-app-color mr-20 px-0 py-0"
                  :class="currentProject.isLocked ? 'opacity-100' : 'opacity-50'"
                  :prefix="currentProject.isLocked ? 'icon-lock-close' : 'icon-lock-open'"
                  @click="lock"
                />

                <More
                  isShared
                  :projectId="currentProject.id"
                />
              </div>
            </div>
          </div>
          <Workspace
            :key="currentProject.id"
            class="mt-[60px] md:mt-[75px] bg-primary"
            :project="currentProject"
            :bookId="currentProject.bookId"
            :allowEdit="!currentProject.isLocked && isWriteMode"
            isShared
          />
        </div>
      </div>
      <div v-else class="flex h-full w-full">
        <div class="m-auto">
          <p class="text-22 md:text-30 font-bold">This share link is no longer active</p>

          <p class="mb-15 md:mb-40">Check with the person who shared this with you if they have access to the shared document.</p>

          <ButtonModule
            text="Back to Home"
            class="text-blue-main text-18 p-5"
            prefix="icon-keyboard-arrow-left text-13"
            @click="back"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { removeHTMLTags } from '@/core/helper-functions'

const route = useRoute()
const router = useRouter()

const { isMobile, loading, handleLoading } = useGeneral()
const { share, currentProject, setCurrentProject, getShareAndProject } = useProject()

const loaded = ref(false)

const isWriteMode = computed(() => share.value?.mode === 'write')

function lock () {
  handleLoading(true)

  projectService.editSharedProject(
    share.value.projectId,
    route.params.shareId,
    {
      isLocked: !currentProject.value.isLocked
    }
  ).then(() => {
    setCurrentProject({
      ...currentProject.value,
      isLocked: !currentProject.value.isLocked
    })
    handleLoading(false)
  })
}

onMounted(() => {
  initPage()
})

async function initPage () {
  handleLoading(true)

  const project = await getShareAndProject(route.params.shareId)
  loaded.value = true

  if (project) {
    document.title = removeHTMLTags(project.title) + ' - complex'
  }

  handleLoading(true)
}

function back () {
  router.push({ name: 'Today', params: { team: 'team' } })
}
</script>
