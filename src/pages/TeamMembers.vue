<template>
  <div
    class="max-w-[1135px] mx-auto w-full relative h-full text-app-color"
    :class="isSidebarCollapsed ? 'pt-[95px] lg:pt-[135px]' : 'pt-[60px]'"
  >
    <div class="px-20 mx-auto min-h-full flex-grow flex flex-col h-full">
      <!-- header -->
      <div class="md:flex items-start justify-between mb-40 relative">
        <div class="flex flex-col w-full">
          <h1 v-if="isSidebarCollapsed" class="text-22 font-semibold leading-none">People</h1>

          <div v-if="totalMembers > 0 && !isClientView" class="mt-4 text-app-color">
            <p>
              There
              <span v-if="totalMembers === 1">is</span>
              <span v-else>are</span>
              <span class="ml-5 font-bold">{{ totalMembers }}</span>
              active {{ totalMembers === 1 ? 'member' : 'members' }}
            </p>
          </div>

          <div v-if="isClientView" class="mt-4 text-app-color">
            <p>
              There
              <span v-if="totalClients === 1">is</span>
              <span v-else>are</span>
              <span class="ml-5 font-bold">{{ totalClients }}</span>
              {{ totalClients === 1 ? 'guest' : 'guests' }}
            </p>
          </div>

          <Switcher
            :modelValue="membersPageViewType"
            class="mt-10 text-13 font-medium"
            width="155px"
            :tabs="[
              { name: 'Workspace members', key: 'workspace-members' },
              { name: 'Guests', key: 'observers' }
            ]"
            @update:modelValue="saveViewType"
          />
        </div>

        <Portal to="rightHeaderProjectContent">
          <div class="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 mt-10 md:mt-0">
            <SearchInput
              v-if="!isClientView"
              class="max-w-[220px]"
              placeholder="Search teammate"
              @onSearch="handleSearch($event)"
            />

            <ButtonModule
              data-onboarding-id="onboardingInvitePeopleHeader"
              :text="`Invite ${isClientView ? 'guests' : 'people'}`"
              type="transparent"
              size="filterButton"
              main
              prefix="icon-add text-10 mr-10"
              :icon-has-margin="false"
              button-opacity="100"
              @click="openInviteModal"
            />
          </div>
        </Portal>
      </div>

      <!-- content -->
      <div
        v-if="totalTemporaryItems && temporaryItems.length > 0"
        class="pb-10"
      >
        <h2 class="font-bold md:text-16 mr-10 mb-5">Pending invitations</h2>

        <Table
          class="space-y-20 max-h-[232px] overflow-y-auto"
          :component="isClientView ? 'TemporaryClient' : 'TemporaryMember'"
          :members="temporaryItems"
          hideHeader
          hideFooter
          :searchValue="searchValue"
          noMembersMessage="No invitations pending"
          :total-members="totalTemporaryItems"
        />
      </div>

      <h2 class="font-bold md:text-16 mr-10 mb-5">{{ isClientView ? 'Guests' : 'Members' }}</h2>

      <div v-if="totalItems && items.length > 0" class="pb-10 overflow-x-auto">
        <Table
          :class="isClientView ? 'min-w-[700px]' : 'min-w-[1080px]'"
          :component="isClientView ? 'Client' : 'Member'"
          :totalMembers="totalItems"
          :isClient="isClientView"
          :noMembersMessage="`${isClientView ? 'Guests' : 'Members'} not found`"
          :members="items"
          :searchValue="searchValue"
          @getMembers="handleGetMembers"
        />
      </div>

      <div v-else class="flex mt-10">
        <div class="p-15 bg-grey-500 rounded-10 text-13">
          When guests join your workspace they will show here.
        </div>
      </div>
    </div>
    <InviteTeammates v-if="showInviteModal" enableMultiselect @close="closeInviteModal" />
  </div>
</template>

<script setup lang="ts">
import { preventBodyScroll, replaceRouterQuery } from '@/core/helper-functions'
import { Portal } from 'portal-vue'

const route = useRoute()
const router = useRouter()

const { isSidebarCollapsed } = useSidebar()
const { clients, totalClients, getClients, temporaryClients } = useClient()
const {
  members,
  getMembers,
  getTemporaryMembers,
  totalMembers,
  temporaryMembers,
  totalTemporaryMembers
} = useTeam()
const membersPageViewType = ref<ISwitcherModelValue>({ index: 0, key: 'workspace-members' })

let timer = null

const searchValue = ref('')
const showInviteModal = ref(false)

const isClientView = computed(() => membersPageViewType.value.index === 1)

const items = computed(() => {
  return isClientView.value ? clients.value : members.value
})

const temporaryItems = computed(() => {
  return isClientView.value ? temporaryClients.value : temporaryMembers.value
})

const totalItems = computed(() => {
  return isClientView.value ? totalClients.value : totalMembers.value
})

const totalTemporaryItems = computed(() => {
  return isClientView.value ? temporaryClients.value?.length : totalTemporaryMembers.value
})

onMounted(async () => {
  if (route.query.openInviteModal) {
    openInviteModal()
  }

  handleGetMembers({ limit: 20 })

  await getClients()
})

onBeforeRouteLeave(() => {
  handleGetMembers()
})

function openInviteModal () {
  replaceRouterQuery({ showInviteModal: isClientView.value ? 'client' : 'member' })
  showInviteModal.value = true
  preventBodyScroll(true)
}

function closeInviteModal () {
  if (route.query.openInviteModal) {
    const query = route.query
    delete query.openInviteModal

    router.replace({ query })
  }

  showInviteModal.value = false
  preventBodyScroll(false)
}

function handleGetMembers (value?: {search?: string; limit?: number}) {
  getMembers(value)
  getTemporaryMembers({
    search: value?.search
  })
}

function handleSearch (value) {
  searchValue.value = value
  clearTimeout(timer)

  timer = setTimeout(() => handleGetMembers({ search: searchValue.value, limit: 20 }), 300)
}

function saveViewType (value: ISwitcherModelValue) {
  membersPageViewType.value = value
}
</script>
