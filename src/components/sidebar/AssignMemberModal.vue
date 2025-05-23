<template>
  <div class="flex justify-end text-14 text-app-color">
    <DropdownModule
      :width="width"
      button-classes="py-7 px-10"
      :isTeleported="false"
      background="bg-primary dark:bg-grey-110"
      positionMenu="left"
      top-position="100%"
    >
      <template #button="{ isOpen }">
        <slot :isOpen="isOpen">
          <div class="flex items-center cursor-pointer">
            <div v-if="selectedMembers.length > 0" class="flex flex-wrap">
              <div
                v-for="member in selectedMembers"
                :key="member.id"
                class="flex items-center rounded-8 mr-5 min-w-[50px] font-semibold my-5"
              >
                <div class="text-app-color rounded-6 py-5 px-13 bg-primary shadow-user-badge border border-grey-580">
                  <UserBadge
                    :first-name="member.firstName"
                    :last-name="member.lastName"
                    :avatarUrl="member.avatar?.url"
                    :color="member.color"
                    class="items-center"
                  />
                </div>
              </div>
            </div>

            <div
              v-else
              class="text-14 flex items-center rounded-8 px-13 py-5 my-5 mr-5 border border-grey-580"
            >
              {{ title }}
            </div>
          </div>
        </slot>
      </template>

      <div v-if="members.length" class="max-h-[300px] overflow-y-auto">
        <div
          v-for="member in members"
          :key="member.id"
          class="hover:bg-selection group-scope last:rounded-b-10 first:rounded-t-10 text-app-color cursor-pointer"
        >
          <div class="text-app-color rounded-6 py-6 px-10" @click.stop="toggleMember(member)">
            <UserBadge
              :first-name="member.firstName"
              :last-name="member.lastName"
              :avatarUrl="member.avatar?.url"
              :color="member.color"
              class="items-center"
            >
              <template #button>
                <i v-if="isSelected(member)" class="icon-check_mark text-18" />
              </template>
            </UserBadge>
          </div>
        </div>
      </div>
    </DropdownModule>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  selectedMembers: ITeamMember[]
  members: ITeamMember[]
  title?: string
  width?: number
}>(), {
  title: 'Mention member',
  width: 180
})

const emit = defineEmits(['toggleMember'])

const isSelected = computed(() => (member: ITeamMember) =>
  props.selectedMembers.some((item: ITeamMember) => item.id === member.id)
)

function toggleMember (member: ITeamMember) {
  const isSelected = props.selectedMembers.some((item: ITeamMember) => item.id === member.id)
  emit('toggleMember', { member, isSelected })
}
</script>
