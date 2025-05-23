<template>
  <div class="w-full flex items-center p-10 pr-0 rounded-6 border border-grey-800 bg-primary">
    <div class="flex-grow w-[150px] md:w-auto px-10">
      <p class="truncate font-extrabold text-app-color">Email</p>
      <p class="opacity-70 text-14 truncate pr-20">{{ member.email }}</p>
    </div>
    <!-- Projects -->
    <div class="hidden md:block w-[150px]" />

    <!-- ROLE -->
    <div class="w-full max-w-[130px] md:max-w-[150px]">
      <TeamRolesSelect
        :disabled="isRegularUser"
        :role="role"
        @setRole="setRole"
      />
    </div>

    <!-- BILLING -->
    <div class="hidden md:block w-[70px]" />

    <!-- DELETE -->
    <div v-if="isAdmin" class="w-[50px] px-10 flex justify-center shrink-0">
      <DropdownModule
        prefix="icon-more-horizontal text-20 opacity-50 hover:opacity-100 transition-color duration-50"
        classes="hover:bg-project-hover px-5 py-3 rounded-6 anim-color-200"
        :iconHasHover="false"
        class="flex text-app-color"
        :width="200"
        background="bg-canvas"
        removeOptionalTopGap
        :content-height="159"
      >
        <div class="text-14">
          <div class="hover:bg-selection rounded-10">
            <ButtonModule
              text="Delete"
              prefix="`icon-delete ml-1 mr-15 text-16 text-app-color"
              class="text-app-color p-12 w-full"
              @click="deleteTemporaryMember"
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

const { isRegularUser, isAdmin, getTemporaryMembers, updateTempMemberRole } = useTeam()

function deleteTemporaryMember () {
  teamsService.deleteTemporaryMember(props.member.id).then(() => getTemporaryMembers())
}

const role = computed(() => {
  return props.member?.teamRole?.name
})

function setRole (role) {
  updateTempMemberRole({
    id: props.member.id,
    role
  })
}
</script>
