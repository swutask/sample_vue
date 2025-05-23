<template>
  <div v-if="members" class="no-drag">
    <DropdownModule
      isTeleported
      isAutoMenuPosition
      :preventOpenOnClick="preventOpenOnClick"
      background="bg-primary dark:bg-grey-110"
      :dropdownClasses="infoDropdownClasses"
      z-index="z-9999"
      :width="width"
    >
      <template #button="{isOpen}">
        <div v-if="withAvatars" class="flex items-center mr-5">
          <div v-if="members.length > count" class="flex items-center">
            <span class="text-app-color text-13 mr-5">+{{ members.length - count }}</span>
          </div>
          <template v-if="members.length">
            <UserBadge
              v-for="(user, index) in members.slice(0, count)"
              :key="user.id"
              :lastName="user.lastName"
              :firstName="user.firstName"
              :showName="false"
              :size="21"
              :class="`w-20 relative mr-[-4px]`"
              :style="`z-index: ${70 - index}`"
              :avatarUrl="user.avatar?.url"
              :color="user.color"
              useWhiteBg
              class="cursor-pointer"
            />
          </template>
        </div>

        <div
          v-else
          ref="modalRef"
          class="flex group-hover:opacity-100 p-5 rounded-8 select-none"
          :class="[
            classes,
            isOpen ? 'bg-project' : 'hover:bg-project',
            {'opacity-100': menuIsOpen || isShowDropdown || isOpen}
          ]"
        >
          <slot>
            <p class="flex items-center text-grey-250">
              <i class="icon-supervisor-account text-20 mr-2" />
            </p>
          </slot>
        </div>
      </template>

      <div class="px-12 overflow-y-auto pb-7 pt-8">
        <p class="font-medium text-15 mb-6"> Shared with </p>
        <UserBadge
          v-for="(user, index) in members"
          :key="index"
          :first-name="user.firstName"
          :last-name="user.lastName"
          :avatarUrl="user.avatar?.url"
          :color="user.color"
          :size="24"
          fontSize="!text-12"
          class="mb-4 text-14 items-center"
        >
          <template #button>
            <ButtonModule
              v-if="!isClient && currentMember?.id !== user.id && allowDelete"
              :has-hover="true"
              prefix="icon-delete text-main-color"
              class="text-app-color top-0 bottom-0 right-0"
              @click="deleteMember(user.id)"
            />
          </template>
        </UserBadge>
      </div>

      <div
        v-if="allowDelete && !book.isSample && !book.isToday"
        class="border-b border-grey-400"
      />

      <div
        v-if="allowDelete && !book.isSample && !book.isToday"
        class="hover:bg-selection rounded-b-4 relative pt-5 pb-8"
      >
        <div
          class="flex items-center justify-center text-center text-15 cursor-pointer"
          @click="toggleInviteModal(true)"
        >
          <i class="icon-supervisor-account mr-7 text-main-color text-18" />
          <span class="mt-2 text-14">Add team member</span>
        </div>
      </div>
    </DropdownModule>

    <InviteTeammates
      v-if="showInviteModal && !isClient"
      type="member"
      :book="book"
      @close="toggleInviteModal(false)"
    />
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
  members: ITeamMember[]
  book?: IBook
  menuIsOpen?: boolean
  isShowDropdown?: boolean
  classes?: string
  allowDelete?: boolean
  width?: number
  infoDropdownClasses?: string
  withAvatars?: boolean
  isCard?: boolean
  numberOfUsers?: number
  preventOpenOnClick?: boolean
}>(), {
  classes: 'text-14 opacity-70',
  allowDelete: true,
  width: 280,
  infoDropdownClasses: '-right-5 max-h-[190px] rounded-4',
  withAvatars: false,
  isCard: false
})

const { isMobile } = useGeneral()
const { member: currentMember } = useTeam()
const { getBooks } = useBook()
const { isClient } = useProfile()

const showInviteModal = ref(null)

const count = computed(() => props.numberOfUsers || (isMobile.value || props.book.isSample ? 2 : 5))

function toggleInviteModal (value: boolean) {
  showInviteModal.value = value
}

function deleteMember (id: number) {
  teamsService.removeMemberFromSpace({
    memberId: id,
    bookId: props.book.id
  })
    .then(() => getBooks())
}
</script>
