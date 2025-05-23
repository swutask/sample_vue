<template>
  <div
    class="group relative"
    :class="[{'flex items-center': !isTaskCard}, textColor]"
  >
    <div v-if="assignedMembers.length && showUserModal" class="flex items-center space-x-5">
      <div v-for="m in assignedMembers.slice(0, itemsToShow)" :key="m.id" class="flex items-center text-app-color rounded-6">
        <UserBadge
          :first-name="m?.user?.profile?.firstName || m.firstName"
          :last-name="m?.user?.profile?.lastName || m.lastName"
          :avatarUrl="m?.user?.avatar?.url || m.avatar?.url"
          :color="m?.user?.profile?.color || m.color"
          :userId="m?.user?.id || m.id"
          :size="isTaskCard ? 21 : memberIconSize"
          :showName="false"
          :fontSize="fontSize"
          class="items-center"
        />
      </div>

      <div v-if="assignedMembers.length > itemsToShow" class="relative flex items-center ml-5" @click.stop="showAllItems = !showAllItems">
        <span class="text-app-color text-14 cursor-pointer">+{{ assignedMembers.length - itemsToShow }}</span>

        <div
          v-show="showAllItems"
          v-clickOutside="() => {showAllItems = false}"
          class="absolute top-30 flex flex-col flex-grow p-10 z-50 rounded-10 shadow-dropdown bg-primary"
          @click.stop
        >
          <div v-for="m in assignedMembers.slice(itemsToShow)" :key="m.id" class="flex items-center text-app-color rounded-6 py-1">
            <UserBadge
              :first-name="m?.user?.profile?.firstName || m.firstName"
              :last-name="m?.user?.profile?.lastName || m.lastName"
              :avatarUrl="m?.user?.avatar?.url || m.avatar?.url"
              :color="m?.user?.profile?.color || m.color"
              :userId="m?.user?.id || m.id"
              :size="isTaskCard ? 21 : memberIconSize"
              :fontSize="fontSize"
              class="items-center"
            />
          </div>
        </div>
      </div>
    </div>

    <DropdownModule
      ref="dropdownRef"
      :width="190"
      button-classes="py-7 px-10"
      :isTeleported="isTeleported"
      :dropdownClasses="dropdownClasses"
      removeOptionalTopGap
      :isAutoMenuPosition="isAutoMenuPosition"
      :positionDirection="positionDirection"
      background="bg-primary dark:bg-grey-110"
      zIndex="z-9999"
      :positionMenu="positionMenu || !isTaskCard ? 'right' : 'left'"
      :disabled="disabled || isClient"
      :topPosition="!isTaskCard ? '27px' : ''"
      hasRelatedClass
    >
      <template #button="{ isOpen }">
        <slot name="button" :isOpen="isOpen">
          <div
            class="flex items-center cursor-pointer"
            :class="{'attribute py-3' : isTaskBoardModal}"
          >
            <div
              v-if="assignedMembers.length && !showUserModal"
              class="flex items-center space-x-5"
            >
              <div v-for="m in assignedMembers.slice(0, itemsToShow)" :key="m.id" class="flex items-center text-app-color rounded-6">
                <UserBadge
                  :first-name="m?.user?.profile?.firstName || m.firstName"
                  :last-name="m?.user?.profile?.lastName || m.lastName"
                  :avatarUrl="m?.user?.avatar?.url || m.avatar?.url"
                  :color="m?.user?.profile?.color || m.color"
                  :size="isTaskCard ? 21 : memberIconSize"
                  :fontSize="fontSize"
                  :showLastName="!isMobile"
                  :showName="isTaskBoardModal ? assignedMembers.length === 1 : false"
                  :nameClasses="isTaskBoardModal && assignedMembers.length === 1 ? 'text-dark-100 text-[12.5px]' : ''"
                  class="items-center"
                />
              </div>

              <div v-if="assignedMembers.length > itemsToShow" class="relative flex items-center ml-5" @click.stop="showAllItems = !showAllItems">
                <span class="text-app-color text-14 cursor-pointer">+{{ assignedMembers.length - itemsToShow }}</span>

                <div
                  v-show="showAllItems"
                  v-clickOutside="() => {showAllItems = false}"
                  class="absolute top-30  flex flex-col flex-grow p-10 z-50 rounded-10 shadow-dropdown bg-primary"
                  @click.stop
                >
                  <div v-for="m in assignedMembers.slice(itemsToShow)" :key="m.id" class="flex items-center text-app-color rounded-6">
                    <UserBadge
                      :first-name="m?.user?.profile?.firstName || m.firstName"
                      :last-name="m?.user?.profile.lastName || m.lastName"
                      :avatarUrl="m?.user?.avatar?.url || m.avatar?.url"
                      :color="m?.user?.profile?.color || m.color"
                      :userId="m?.user?.id || m.id"
                      :size="isTaskCard ? 21 : memberIconSize"
                      :fontSize="fontSize"
                      class="items-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            <template v-if="!assignedMembers.length && !disabled && !isClient">
              <ButtonModule
                v-if="isTaskBoardModal"
                :prefix="`icon-mention-member ${iconSize} ${prefixMargin}`"
                :classes="`${btnClasses(isOpen)} bg-menu-hover/[0.03] opacity-100 hover:bg-menu-hover/[0.06] text-[12.5px] -mx-7 h-29`"
              >
                {{ title }}
              </ButtonModule>

              <ButtonModule
                v-else
                :prefix="`icon-mention-member p-3 text-grey-11 hover:text-grey-950 hover:bg-menu-hover hover:opacity-100 rounded-8 ${iconSize}`"
                tooltipText="Assign"
                :tooltipClasses="isTaskCard
                  ? 'text-11 px-10 py-7 rounded-8 z-9999'
                  : 'text-13 px-10 py-7 rounded-8 z-9999'
                "
                teleportTooltip
                tooltipBottom
              />
            </template>
          </div>
        </slot>
      </template>

      <div class="max-h-[300px] p-6 overflow-y-auto text-13 select-none">
        <div
          v-for="member in allMembers"
          :key="member.id"
          class="group-scope rounded-6 hover:bg-menu-hover text-app-color cursor-pointer"
        >
          <div class="text-app-color rounded-6 py-6 px-10" @click.stop="toggleMember(member)">
            <UserBadge
              :first-name="member.firstName"
              :last-name="member.lastName"
              :avatarUrl="member.avatar?.url"
              :color="member.color"
              :fontSize="fontSize"
              :size="dropdownBadgeSize"
              class="items-center"
              :class="{'opacity-50': task.isToday}"
            >
              <template #button>
                <i v-if="assignedMembers?.length && checkSelection(member.id)" class="icon-check_mark text-18 ml-5" />
              </template>
            </UserBadge>
          </div>
        </div>
      </div>
    </DropdownModule>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  task: ITask
  bookId?: number
  prefixMargin?: string
  assignedMembers: ITeamMember[]
  fixedMembers?: ITeamMember[]
  isEditable?: boolean
  disabled?: boolean
  forceEmit?: boolean
  isSubtask?: boolean
  isCreate?: boolean
  showUserModal?: boolean
  isTaskList?: boolean
  isNewTaskModal?: boolean
  isTaskBoardModal?: boolean
  iconSize?: string
  borderRadius?: string
  paddings?: string
  textColor?: string
  fontSize?: string
  opacity?: string
  positionMenu?: string
  title?: string
  isTeleported?: boolean
  positionDirection?: string
  dropdownClasses?: string
  dropdownBadgeSize?: number
  memberIconSize?: number
  isAutoMenuPosition?: boolean
}>(), {
  isTeleported: true,
  iconSize: 'text-20',
  borderRadius: 'rounded-4',
  paddings: 'px-5 py-3',
  textColor: 'text-dark-800',
  fontSize: 'text-14',
  opacity: 'opacity-30',
  title: 'Assign',
  dropdownBadgeSize: 25
})

const emit = defineEmits(['assignToTask'])

const { isClient } = useProfile()
const { assignMember } = useTask()
const { books } = useBook()
const { isMobile } = useGeneral()

const itemsToShow = 3
const showAllItems = ref(false)
const dropdownRef = ref()

const allMembers = computed(() => {
  const book = books.value.find(b => b.id === props.bookId)
  return book?.shareWith || []
})

const isTaskCard = computed(() => {
  return !props.isNewTaskModal && !props.isTaskList
})

const btnClasses = computed(() => (isOpen: boolean) => {
  const dynamicClasses = isOpen ? 'bg-menu-hover/[0.06]' : 'bg-menu-hover/[0.06]'
  return `anim-opacity ${dynamicClasses} ${props.paddings} ${props.borderRadius} ${props.opacity}`
})

function checkSelection (id: number) {
  return props.assignedMembers?.length && props.assignedMembers?.some(item => item.id === id)
}

async function toggleMember (value) {
  if (props.fixedMembers?.some(m => m.id === value.id) || props.task.isToday) return

  assignToTask({
    id: value.id,
    user: {
      ...value,
      id: value.userId,
      profile: {
        firstName: value.firstName,
        lastName: value.lastName,
        color: value.color
      }
    }
  })
}

async function assignToTask (value) {
  if (props.fixedMembers?.some(m => m.id === value.id)) return

  if (props.isCreate || props.forceEmit) {
    emit('assignToTask', {
      id: value.id,
      ...value
    })
  }

  if (!props.isCreate) {
    await assignMember({
      id: props.task.id,
      task: props.task,
      bookId: props.bookId,
      memberIds: [value.id],
      isSubtask: props.isSubtask
    })
  }
}

function close () {
  dropdownRef.value.close()
}

defineExpose({
  close
})
</script>
