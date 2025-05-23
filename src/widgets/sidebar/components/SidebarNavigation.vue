<template>
  <div class="space-y-3 pr-12">
    <template v-for="(item, idx) in sidebarRoutes" :key="item.name">
      <div v-if="item.isPined" class="flex !mt-2">
        <div
          v-if="item.isVisible"
          :ref="el => indexRefs[idx] = el"
          :data-onboarding-id="item.id"
          class="cursor-pointer flex items-center group relative text-[13.5px] w-full
           py-6 px-8 rounded-8 hover:bg-grey-f6f6f6"
          :class="setActiveStyle(item.name)"
          @click="navigationHandler(idx)"
        >
          <ButtonModule
            :prefix="item.icon"
            class="w-full h-full"
            :text="item.text"
            skipGap
          />

          <div
            v-if="item.isForPro && isFreePlan"
            class="absolute right-5  bg-[#DEFBF4] dark:bg-primary rounded-4 ml-3 mt-1 border border-grey-700
                  text-9 px-4 py-2 font-bold items-center justify-center flex"
          >
            PRO
          </div>

          <NotificationDot
            v-if="showDot(item)"
            :unreadCount="showDot(item)"
            class="absolute top-4 left-21"
          />
        </div>
      </div>
    </template>

    <SidebarMore
      v-if="members?.length > 1 || !!clients.length"
      :routes="sidebarRoutes"
    />

    <div
      data-onboarding-id="onboardingProjectsMenuItem"
      class="cursor-pointer items-center group relative text-[13.5px] w-full
           py-6 px-8 rounded-8 hover:bg-grey-425 flex !mt-15"
      :class="setActiveStyle('TeamBooks')"
      @click="navigationHandler('TeamBooks')"
    >
      <ButtonModule
        prefix="icon-books-v2 text-19 mr-10 px-2 -ml-1"
        class="w-full h-full"
        text="Spaces"
        skipGap
      />

      <ButtonModule
        v-if="isSidebarHovered"
        id="onboardingCreateProject"
        tooltipText="Create space"
        teleportTooltip
        tooltipTop
        tooltipClasses="text-12 px-10 py-7 rounded-8 z-9999"
        :tooltipOptionalGap="35"
        prefix="icon-add text-10 text-dark-default dark:text-grey-main"
        class="p-4 my-[-1px] transition duration-50 rounded-4 bg-opacity-10 anim-opacity opacity-70 hover:bg-grey-d7d7d7"
        @click.stop="createNewBook"
      />
    </div>

    <SpaceModal v-if="showSpaceModal" @close="closeSpaceModal" />
  </div>
</template>

<script setup lang="ts">
const {
  setActiveStyle,
  showDot,
  sidebarRoutes,
  getNavigationTools,
  navigationHandler,
  isSidebarHovered
} = useSidebar()
const { members } = useTeam()
const { clients } = useClient()
const { allowAddBook, toggleLimitModal, isFreePlan } = usePlan()
const showSpaceModal = ref(false)

const indexRefs = ref([])

onMounted(async () => {
  await getNavigationTools()
  checkMembersAmount()
})

function checkMembersAmount () {
  if (members.value?.length < 2) {
    sidebarRoutes.value = sidebarRoutes.value.map(item => {
      return {
        ...item,
        isPined: true
      }
    })
  }
}

function createNewBook () {
  if (allowAddBook.value) {
    showSpaceModal.value = true
  } else {
    toggleLimitModal({ show: true, type: 'Special', description: 'Please upgrade if you want to add more spaces.' })
  }
}

function closeSpaceModal () {
  showSpaceModal.value = false
}
</script>
