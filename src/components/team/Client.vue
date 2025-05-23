<template>
  <div
    class="w-full flex justify-between md:items-center py-10 rounded-6 pl-10 border
     border-grey-800 cursor-pointer card bg-primary"
    @click="toggleUserModal"
  >
    <div class="px-10 shrink-0 w-[280px]">
      <div class="flex items-center pr-20 ">
        <UserBadge
          ref="userBadgeRef"
          :showName="false"
          :first-name="member.user.profile.firstName"
          :last-name="member.user.profile.lastName"
          :avatarUrl="member.user.avatar?.url"
          :userId="member.userId"
          :color="member.user.profile.color"
          :size="34"
          isClientMember
          hideSendMessageButton
          class="cursor-pointer mr-7 prevent-toggle"
        />
        <div>
          <div class="flex items-start">
            <div class="relative">
              <p
                class="max-w-[100px] md:max-w-[135px] truncate"
                :title="`${member.user.profile.firstName} ${member.user.profile.lastName}`"
              >
                {{ member.user.profile.firstName }} {{ member.user.profile.lastName }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- EMAIL -->
    <div class="w-[280px] px-10 truncate shrink-0 text-left">
      <span class="text-grey-250" :title="member.user.email">{{ member.user.email }}</span>
    </div>

    <!-- Projects -->
    <div class="w-[120px] px-10 flex relative items-center shrink-0 mr-20">
      <p class="mr-5">{{ props.member?.books?.length }} Spaces</p>

      <DropdownModule
        isTeleported
        prefix="icon-info_outline text-main-color p-2"
        class="text-app-color top-0 bottom-0 right-0 p-0 prevent-toggle"
        isAutoMenuPosition
        background="bg-primary dark:bg-grey-110"
        z-index="z-9999"
        :width="250"
      >
        <div class="py-8 px-12 overflow-y-auto flex flex-col items-start max-h-[190px]">
          <p class="font-medium text-15 mb-6">Spaces</p>

          <div v-if="member.books?.length === 0" class="text-13 whitespace-nowrap">
            No shared books
          </div>
          <p v-for="book in member.books" :key="book.title" class="mb-4">
            <BookLabelForClient :title="book.title" :icon="book.icon" size="w-25 h-25" />
          </p>
        </div>
      </DropdownModule>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  member: IClient
}>()

const userBadgeRef = ref()
function toggleUserModal (event) {
  if (event.target.classList.contains('prevent-toggle') || event.target.closest('.prevent-toggle')) {
    return
  }
  userBadgeRef.value.toggle()
}
</script>
