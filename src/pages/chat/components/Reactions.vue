<template>
  <component :is="portal && hasReactions ? 'Portal' : 'div'" :to="`reactions-${messageId}`">
    <DropdownModule
      ref="dropdownRef"
      class="flex bg-transparent w-fit"
      :class="[customClasses]"
      :width="170"
      :topPosition="topPosition"
      zIndex="z-[9999]"
      :positionMenu="menuPosition"
      @click="toggleModal(true)"
      @close="toggleModal(false)"
    >
      <template #button="{isOpen}">
        <div
          class="cursor-pointer flex items-center relative"
          :class="[
            { 'opacity-100' : isOpen },
            { 'flex-row-reverse': (isReversedPosition && !isMinimized && !isLargeScreen) ||
              (!usersReaction && hasReactions) }
          ]"
        >
          <div class="flex" :class="{'flex-wrap gap-[2px]': isMinimized || !isLargeScreen}">
            <div
              v-for="(key, value, index) in parsedReactions"
              :key="value + key + index"
              class="pr-5"
              :class="chosenReactionsClasses"
              @click.stop="toggleReaction(+value)"
            >
              <ElTooltip placement="top">
                <div
                  class="flex items-center group-block relative"
                  :class="[
                    chosenReactionsBorder,
                    isMinimized || !isLargeScreen
                      ? 'py-2 px-4 h-24 bg-grey-500 rounded-8'
                      : 'py-4 px-7 bg-opacity-10 shadow-dark-500-05 border h-29 rounded-6'
                  ]"
                >
                  <i
                    class="inline-block text-16 rounded-10 anim-all mr-3"
                    :class="`icon-reaction-${reactionName(+value)}`"
                  />
                  <p class="!text-12 leading-none">{{ key }}</p>
                </div>
                <template #content>
                  <!-- tooltip -->
                  <ReactionTooltip
                    :id="+value"
                    :message-id="messageId"
                    :tooltipPosition="tooltipPosition"
                    :message-reactions="currentReactions"
                  />
                </template>
              </ElTooltip>
            </div>

            <ButtonModule
              v-if="isMinimized || !isLargeScreen"
              tooltipText="Emoji reaction"
              :class="{ '-ml-10': !hasReactions }"
              teleportTooltip
              tooltipTop
            >
              <IconReactions
                v-if="!usersReaction"
                :width="34"
                :height="30"
                :class="[{ '!opacity-50' : isOpen }, iconReactionsClasses]"
                class="rounded-8 anim-all text-app-color opacity-50
                      group-scope-hover:opacity-50 mr-5 p-3 h-24"
                @click.stop="openDropdown(!isOpen)"
              />
            </ButtonModule>
          </div>

          <ButtonModule
            v-if="!isMinimized && isLargeScreen"
            tooltipText="Emoji reaction"
            :class="{ 'mr-5': (isMinimized || !isLargeScreen) || (!usersReaction && hasReactions) }"
            teleportTooltip
            tooltipTop
          >
            <IconReactions
              v-if="!usersReaction"
              :width="34"
              :height="30"
              :class="[{ '!opacity-50' : isOpen }, iconReactionsClasses]"
              class="rounded-8 anim-all text-app-color opacity-50 hover:bg-menu-hover hover:!opacity-100 h-30
                      group-scope-hover:opacity-50 p-5 mr-5 md:opacity-0"
              @click.stop="openDropdown(!isOpen)"
            />
          </ButtonModule>
        </div>
      </template>

      <div class="rounded-10 text-app-color p-5 bg-primary">
        <i
          v-for="reaction in reactions"
          :key="reaction.id"
          class="cursor-pointer text-17 p-7 inline-block rounded-10 w-32 h-32 hover:bg-grey-400"
          :class="`icon-reaction-${reaction.name}`"
          @click="toggleReaction(reaction.id, false)"
        />
      </div>
    </DropdownModule>
  </component>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  messageId?: number
  discussionId?: number
  bookId?: number
  isChat?: boolean
  isThread?: boolean
  referenceIconClasses?: string
  currentReactions?: IReaction[]
  menuPosition?: string
  isReversedPosition?: boolean
  customClasses?: string
  portal?: boolean
  iconReactionsClasses?: string
  chosenReactionsClasses?: string
  chosenReactionsBorder?: string
  topPosition?: string
  tooltipPosition?: string
  isMinimized?: boolean
}>(), {
  portal: false,
  topPosition: '38px',
  isReversedPosition: false,
  referenceIconClasses: 'md:opacity-0 group-hover:opacity-100'
})

const emits = defineEmits(['toggle'])

const { user } = useProfile()
const { isLargeScreen } = useGeneral()
const { toggleChatReaction, toggleThreadReaction, reactions } = useChat()

const dropdownRef = ref(null)

const showMenu = ref(false)

const hasReactions = computed(() => props.currentReactions?.length > 0)

const usersReaction = computed(() => props.currentReactions?.find(item => item.userId === user.value.id))

const parsedReactions = computed(() => {
  if (hasReactions.value) {
    return props.currentReactions?.reduce(function (acc, curr) {
      acc[curr.reactionId] ? ++acc[curr.reactionId] : acc[curr.reactionId] = 1
      return acc
    }, {})
  } else {
    return []
  }
})

const reactionName = computed(() => (id: number) => reactions.value.find(r => r.id === id)?.name)

function toggleReaction (id: number, isSelected = true) {
  showMenu.value = false

  if (isSelected) {
    if (usersReaction.value && +usersReaction.value.reactionId !== id) return

    if (+usersReaction.value?.reactionId === +id) {
      selectReaction(id, true)
    }
  } else {
    selectReaction(id, false)
  }
}

function selectReaction (id: number, isSelected: boolean) {
  const data = {
    messageId: props.messageId,
    reactionId: id,
    bookId: props.bookId,
    discussionId: props.discussionId,
    user: user.value,
    userId: user.value.id,
    isSelected
  }

  if (props.isChat) {
    toggleChatReaction(data)
  } else if (props.isThread) {
    toggleThreadReaction(data)
  }
}

function openDropdown (value: boolean) {
  dropdownRef.value.toggle()
  emits('toggle', value)
  showMenu.value = value
}

function toggleModal (value: boolean) {
  showMenu.value = value
  emits('toggle', value)
}
</script>
