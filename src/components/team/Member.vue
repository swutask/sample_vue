<template>
  <div
    class="w-full flex md:items-center py-10 rounded-6 pl-10
    border border-grey-800 cursor-pointer default-border bg-primary"
    @click="toggleUserModal"
  >
    <div class="w-[240px] px-10 shrink-0">
      <div class="flex items-center pr-20 ">
        <UserBadge
          ref="userBadgeRef"
          :showName="false"
          :first-name="member.firstName"
          :last-name="member.lastName"
          :avatarUrl="member.avatar?.url"
          :userId="member.userId"
          :color="member.color"
          :size="30"
          class="cursor-pointer mr-10 prevent-toggle"
        />
        <div>
          <div class="flex items-start">
            <div class="relative">
              <p
                class="max-w-[100px] md:max-w-[135px] truncate"
                :title="`${member.firstName} ${member.lastName}`"
              >
                {{ member.firstName }} {{ member.lastName }}
              </p>
              <span
                v-if="member.role === 'admin'"
                class="text-brand border shadow-[0px_0px_0px_0.5px_#3F40F2] font-medium rounded-4 px-5 text-8 absolute -top-7 left-full"
              >admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- EMAIL -->
    <div class="w-[250px] px-10 truncate shrink-0">
      <span class="text-grey-250" :title="member.email">{{ member.email }}</span>
    </div>

    <!-- Projects -->
    <div class="w-[130px] px-10 flex relative items-center shrink-0">
      <p class="mr-5 text-13">{{ sharedBooks?.length }} Spaces</p>

      <DropdownModule
        isTeleported
        prefix="icon-info_outline text-main-color p-2"
        class="text-app-color top-0 bottom-0 right-0 p-0 prevent-toggle"
        isAutoMenuPosition
        background="bg-primary dark:bg-grey-110"
        z-index="z-9999"
        :width="300"
      >
        <div class="py-8 px-12 overflow-y-auto flex flex-col items-start max-h-[190px]">
          <p class="font-medium text-15 mb-6">Spaces</p>
          <div v-if="sharedBooks.length === 0" class="text-13 whitespace-nowrap">
            No shared books
          </div>
          <p v-for="book in sharedBooks" :key="book.id" class="mb-4">
            <BookLabel
              background="bg-grey-light group-hover:bg-grey-light-hover anim-color"
              class="truncate py-4 text-13"
              :bookId="book.id"
              :has-border="false"
              size="w-25 h-25"
              :customStyle="{ fontSize: 'text-13', defaultIcon: 'w-18 h-18', iconHover: '' }"
            />
          </p>
        </div>
      </DropdownModule>
    </div>

    <!-- ROLE -->
    <div class="w-[150px] px-10 shrink-0 prevent-toggle">
      <TeamRolesSelect
        :disabled="memberIsOwner || isRegularUser"
        :role="member.role"
        @setRole="setRole"
      />
    </div>

    <!-- Location & timezone -->
    <div class="flex w-[160px] px-10 items-center shrink-0 text-grey-250 text-13">
      <p v-if="member.location" class="mr-5 truncate" :title="member.location">{{ member.location }}</p>
      <p v-if="member.timezone">{{ member.timezone?.split(' ')[0] }}</p>
    </div>

    <!-- BILLING -->
    <div class="w-[40px] text-center shrink-0 prevent-toggle ml-auto">
      <CheckboxModule
        class="justify-center"
        :disabled="member.role === 'admin' || memberIsOwner || !isAdmin"
        :model-value="member.hasBillingAccess"
        @update:modelValue="changeBillingAccess"
      />
    </div>

    <!-- SHOW MORE -->
    <div class="w-[40px] px-10 flex justify-center shrink-0 prevent-toggle">
      <DropdownModule
        v-if="!memberIsOwner && currentMember.id !== member.id"
        prefix="icon-more-horizontal text-20 opacity-50 hover:opacity-100 transition-color duration-50"
        classes="hover:bg-project-hover rounded-6 anim-color-200"
        :iconHasHover="false"
        buttonClasses="!p-4"
        class="flex text-app-color"
        :width="200"
        background="bg-canvas"
        removeOptionalTopGap
        :content-height="159"
        @click="showMoreMenu = !showMoreMenu"
        @close="showMoreMenu = false"
      >
        <div class="text-13">
          <div class="hover:bg-selection rounded-10">
            <ButtonModule
              text="Delete"
              :disabled="!isAdmin"
              prefix="icon-delete ml-1 mr-15 text-16 text-app-color"
              class="text-app-color p-12 w-full"
              @click="deleteMember"
            />
          </div>
        </div>
      </DropdownModule>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  member: ITeamMember
}>()

const { team, member: currentMember, isAdmin, isRegularUser, getMembers, updateBillingAccess, updateMemberRole } = useTeam()
const { books } = useBook()

const userBadgeRef = ref(null)

const showMoreMenu = ref(false)

const memberIsOwner = computed(() => team.value.userId === props.member.userId)

const sharedBooks = computed(() => {
  return props.member.books.filter(book => books.value.some(b => b.id === book.id))
})

function changeBillingAccess (billingAccess: boolean) {
  updateBillingAccess({
    id: props.member.id,
    billingAccess
  })
}

function setRole (role) {
  updateMemberRole({
    id: props.member.id,
    role
  })
}

function deleteMember () {
  teamsService.deleteMember(props.member.id).then(() => getMembers())
}

function toggleUserModal (event) {
  if (event.target.classList.contains('prevent-toggle') || event.target.closest('.prevent-toggle')) {
    return
  }
  userBadgeRef.value.toggle()
}
</script>
