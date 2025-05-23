<template>
  <div
    v-closeOnPressEsc="close"
    class="fixed top-0 h-full z-9999 md:z-[104] full-screen-window bg-secondary p-10"
    :class="isSidebarCollapsed ? 'w-full' : 'w-calc-sidebar left-sidebar'"
    @click.self="close"
  >
    <div class="flex w-full border border-grey-425 shadow-lightest rounded-t-20 overflow-hidden">
      <div
        id="wrapper"
        class="bg-primary w-full h-full min-h-screen max-h-[100vh] flex overflow-y-auto scrollbar-gutter"
      >
        <div
          class="flex flex-col min-h-screen h-max w-full"
        >
          <div class="flex items-center justify-between pl-12 pr-9 group py-10 sticky top-0 z-100 bg-primary">
            <SelectBook
              :books="computedBooks"
              :customStyleForBookLabel="{
                fontSize: 'text-13 font-medium',
                icon: 'max-h-[80%] max-w-[80%]',
                defaultIcon: 'w-16 h-16',
                iconHover: ''
              }"
              moveTask
              labelFontSize="text-13 pt-3 pb-4 select-none"
              customButtonClasses="rounded-12 bg-menu-hover pl-7 pr-12"
              :selectedBook="selectedBookInDropdown"
              @toggleBook="changeCurrentBook"
            />

            <div class="flex items-center">
              <ButtonModule
                :prefix="`icon-check-circle-outline text-19 ${isCompleted ? 'text-green-500' : 'text-grey-975'}`"
                class="flex items-center justify-center opacity-50 mx-4 cursor-pointer select-none
                   hover:bg-menu-hover hover:opacity-100 rounded-8 px-5 py-6 h-30"
                :tooltipText="isCompleted ? 'Completed' : 'Complete task'"
                teleportTooltip
                tooltipBottom
                @click="completeTask"
              />

              <CommentCount
                v-if="countMessages > 0"
                :countMessages="countMessages"
                wrapperStyling="flex items-center"
                iconStyling="text-15 mr-3 text-grey-975 mt-2"
                countStyling="leading-none text-14 text-grey-975"
                customStyling="flex items-center opacity-50 mx-4 cursor-pointer select-none
                   hover:bg-menu-hover hover:opacity-100 rounded-8 px-5 py-6 h-30"
                tooltipBottom
                @click="scrollToEditor()"
              />

              <ButtonModule
                prefix="icon-task-decrease text-17 text-grey-975 mt-1"
                class="flex items-center justify-center opacity-50 mx-4 cursor-pointer select-none
                   hover:bg-menu-hover hover:opacity-100 rounded-8 px-6 py-6 h-30"
                tooltipText="Switch to modal view"
                teleportTooltip
                tooltipBottom
                @click="toggleView"
              />

              <TaskInfo :task="modalTask" buttonClasses="h-30" />

              <div class="w-1 h-24 bg-grey-150 mx-10" />

              <DropdownModule
                prefix="icon-more-horizontal text-19 text-grey-975"
                tooltipText="More options"
                teleportTooltip
                tooltipBottom
                defaultStyles
                :width="150"
                top-position="30px"
                buttonClasses="h-30 px-5"
                :isTeleported="false"
                background="bg-primary dark:bg-grey-110"
                is-auto-menu-position
              >
                <ButtonModule
                  text="Copy link"
                  prefix="icon-copy-link mr-15"
                  class="px-10 py-8 w-full group-scope text-13"
                  @click="copyLink({ bookId: modalTask.bookId, taskId: modalTask?.id })"
                />

                <ButtonModule
                  v-if="!isClient && members?.length > 1"
                  :text="`${!!modalTask?.taskSubscriptions?.length ? 'Unsubscribe' : 'Subscribe'}`"
                  :prefix="`${!!modalTask?.taskSubscriptions?.length ? 'icon-no-notifications' : 'icon-sidebar-inbox'} mr-15`"
                  class="px-10 py-8 w-full group-scope text-13"
                  @click="toggleSubscription"
                />

                <ButtonModule
                  v-if="!isClient"
                  text="Delete"
                  :tooltipText="isDeleteTaskWithRrule
                    ? `Delete task from recurring with date: ${formatDate(taskCalendarEventDate)}`
                    : ''"
                  teleportTooltip
                  tooltipBottom
                  prefix="icon-delete mr-15"
                  class="px-10 py-8 w-full group-scope text-13"
                  @click="handleDeleteTask"
                />
              </DropdownModule>

              <ButtonModule
                prefix="icon-close text-11 text-grey-975"
                class="flex items-center justify-center opacity-50 mx-4 cursor-pointer select-none
                   hover:bg-menu-hover hover:opacity-100 rounded-8 px-10 py-6 h-30"
                tooltipText="Close (Esc)"
                teleportTooltip
                tooltipBottom
                @click="close"
              />
            </div>
          </div>

          <div class="pb-50 px-26  w-full max-w-[950px] mx-auto">
            <div class="text-app-color" :class="{ 'pointer-events-none': isClient }">
              <div v-if="previewImage" class="relative group mb-13 mt-20">
                <DropdownModule
                  v-if="!isClient"
                  prefix="icon-more-horizontal text-20 text-white !px-3"
                  :width="170"
                  class="!absolute right-10 top-5 !z-10 opacity-0 group-hover:opacity-100 anim-opacity"
                  top-position="30px"
                  buttonClasses="h-30"
                  :isTeleported="false"
                  buttonOpacity="80"
                  background="bg-primary dark:bg-grey-110"
                  is-auto-menu-position
                >
                  <div class="hover:bg-selection group-scope text-14 rounded-t-10">
                    <label class="flex items-center p-10 cursor-pointer">
                      <i class="icon-edit mr-15" />
                      <p class="leading-none">Change image</p>
                      <input class="hidden" type="file" @change="changePreviewImage">
                    </label>
                  </div>
                  <div class="hover:bg-selection group-scope text-14 rounded-b-10">
                    <ButtonModule
                      text="Delete image"
                      prefix="icon-delete mr-15"
                      class="p-10 w-full"
                      @click="deletePreviewImage"
                    />
                  </div>
                </DropdownModule>
                <img
                  class="rounded-8 mb-5 h-[250px] w-full object-cover"
                  :src="previewImage" alt="image"
                >
              </div>
              <div class="flex items-center mb-9">
                <TitleEditor
                  :content="localTitle"
                  :disabled="isClient"
                  maxlength="255"
                  class="task-board-title w-full bg-transparent min-h-[36.4px] max-h-[100px] overflow-x-hidden overflow-y-auto block mt-23"
                  :class="{ 'line-through opacity-40 dark:opacity-70': !!modalTask.completedAt }"
                  :taskId="modalTask?.id"
                  :bookId="modalTask.bookId"
                  editorClass="task-board-editor-class"
                  editorId="task-board-editor-id"
                  @onUpdate="saveTitle"
                  @onFocus="isTitleFocused = $event"
                />
              </div>
              <TransitionExpand>
                <div v-if="isSubtitleFocused || isTitleFocused || localSubTitle">
                  <TitleEditor
                    ref="subTitleEditorRef"
                    :content="localSubTitle"
                    :disabled="isClient"
                    maxlength="255"
                    class="task-board-subtitle w-full bg-transparent max-h-[200px]
                    min-h-[30px] mb-10 overflow-x-hidden overflow-y-auto block"
                    :class="{ 'line-through opacity-40 dark:opacity-70': !!modalTask.completedAt }"
                    style="--title-editor-placeholder: 'Add subtile...'"
                    :taskId="modalTask?.id"
                    allowEmpty
                    :bookId="modalTask.bookId"
                    editorClass="task-board-editor-class"
                    editorId="task-board-editor-id"
                    @onUpdate="saveSubTitle"
                  />
                </div>
              </TransitionExpand>
            </div>

            <div class="flex lg:hidden">
              <div class="flex items-center mt-10 md:mt-0 gap-x-[10px] gap-y-[4px] flex-wrap text-14">
                <SelectTaskRow
                  class="mr-8"
                  :task="modalTask"
                  :bookId="modalTask.bookId"
                  customClasses="rounded-6 py-4 px-7 text-[12.5px]"
                  :rows="rows"
                  :disabled="isClient"
                  @select="selectRow"
                />

                <div
                  v-if="isTeamAccount"
                  class="flex items-center -mx-5 text-dark-500"
                >
                  <SampleMembers
                    v-if="modalTask.isSample && isTeamAccount"
                    :count="sampleMembersCount"
                    :sliceIndex="sampleMembersSliceIndex"
                    class="mr-7"
                  />

                  <TaskAssignMember
                    v-if="isTeamAccount"
                    :assignedMembers="modalTask.teamMembers || []"
                    isTaskBoardModal
                    paddings="px-6 py-4"
                    :disabled="isClient || modalTask.isToday"
                    border-radius="rounded-6"
                    :task="modalTask"
                    :bookId="modalTask.bookId"
                    :isTodayTask="modalTask.isToday"
                    :isScreenTaskView="isScreenTaskView"
                    icon-size="text-18"
                    text-color="text-dark-default"
                    font-size="text-13"
                    opacity="opacity-30"
                  />
                </div>

                <TagsModal
                  tagsWrapper="w-full"
                  :selected-tags="modalTask.taskTags"
                  textColor="text-dark-default"
                  :tags="tags"
                  :disabled="isClient"
                  :maxLabelsAmount="3"
                  :isScreenTaskView="isScreenTaskView"
                  :iconSize="'text-18'"
                  titleFontSize="text-13"
                  borderRadius="rounded-6"
                  tagClass="!text-12 !min-w-[35px]"
                  paddings="px-6 py-4"
                  position-classes="left-0 top-25 z-9999"
                  opacity="opacity-40"
                  @blockHotKey="blockHotKey"
                  @toggleTag="handleToggleTaskTag"
                  @updateTag="updateTag"
                />

                <Urgency
                  v-model="localTask.urgentStatus"
                  border-radius="rounded-6"
                  paddings="px-6 py-4"
                  :iconSize="15"
                  fontSize="text-13"
                  :task="modalTask"
                  :disabled="isClient"
                  :isScreenTaskView="isScreenTaskView"
                  isModal
                  :showTooltip="false"
                  textColor="text-dark-default"
                  opacity="opacity-40"
                />

                <TaskDate
                  :current-date="modalTask.endDate"
                  position="right-0"
                  iconSize="text-18"
                  fontSize="text-13"
                  :disabled="isClient"
                  :isScreenTaskView="isScreenTaskView"
                  isTaskBoardModal
                  :taskDates="taskDates"
                  border-radius="rounded-6"
                  paddings="px-6 py-4"
                  textColor="text-dark-default"
                  opacity="opacity-100"
                  @toggleBothDates="toggleDate"
                />

                <ButtonModule
                  class="rounded-6 anim-opacity px-6 py-4 !ml-0 text-dark-default h-27"
                  :class="computedModalTask?.subTask?.length
                    ? 'bg-red-seashell text-dark-100'
                    : 'hover:bg-menu-hover/[0.08] bg-menu-hover/[0.06] opacity-40 hover:opacity-50'"
                  @click.stop="handleToggleSubtask"
                >
                  <div class="flex">
                    <Subtasks
                      :disabled="isClient"
                      :task="computedModalTask"
                      isModal
                      :radius="6"
                      fontSize="text-[12.5px]"
                      stroke="black"
                    />
                    <span v-if="!computedModalTask?.subTask?.length" class="ml-3 text-[12.5px]">Subtask</span>
                  </div>
                </ButtonModule>

                <Cover />
              </div>
            </div>

            <SubtaskList
              v-if="showSubtask || computedModalTask?.subTask?.length > 0"
              ref="subtaskListRef"
              :task="computedModalTask"
              :disabled="isClient"
              isTaskBoardModal
              class="mb-20"
              @blockHotKey="blockHotKey"
              @close="closeSubtask"
              @delete="onDeleteSubtask"
            />

            <TaskContentEditor
              :taskId="modalTask?.id"
              :bookId="modalTask.bookId"
              @blockHotKey="blockHotKey"
            />

            <DepthPageChat
              ref="depthPageChatRef"
              class="mt-30"
              titleClasses="font-bold mb-5"
              :taskId="modalTask?.id"
              :bookId="modalTask?.bookId"
              :chatId="modalTask?.chat?.id"
            />
          </div>
        </div>
      </div>

      <div
        class="hidden bg-primary lg:block p-20 pt-13 w-[340px] flex-shrink-0 sticky right-0 top-0
      h-screen border-l border-grey-500 scrollbar-gutter"
        :class="{'overflow-y-auto no-scroll-bar': !preventScroll}"
      >
        <div class="flex flex-col">
          <p class="text-15 font-semibold mb-20">Attributes</p>

          <div class="flex justify-between mb-12 h-26 items-center">
            <p class="text-13 text-grey-1300 w-1/2">Status</p>
            <div class="mr-auto">
              <SelectTaskRow
                positionMenu="right"
                appendToBody
                :task="modalTask"
                :bookId="modalTask.bookId"
                :disabled="isClient"
                customClasses="rounded-6 py-4 px-7 text-[12.5px]"
                :rows="rows"
                class="w-full text-12"
                @select="selectRow"
              />
            </div>
          </div>

          <div v-if="isTeamAccount" class="flex justify-between mb-12 h-26 items-center">
            <p class="text-13 text-grey-1300 w-1/2">Assignee</p>
            <div class="flex items-center text-dark-500 text-13 mr-auto max-w-1/2">
              <SampleMembers
                v-if="modalTask.isSample && isTeamAccount"
                :count="sampleMembersCount"
                :sliceIndex="sampleMembersSliceIndex"
                class="mr-7"
              />

              <TaskAssignMember
                v-if="isTeamAccount"
                :assignedMembers="modalTask.teamMembers || []"
                isTaskBoardModal
                appendToBody
                paddings="px-6 py-4"
                :disabled="isClient || modalTask.isToday"
                border-radius="rounded-6"
                class="w-full"
                prefixMargin="mr-8"
                :task="modalTask"
                :bookId="modalTask.bookId"
                :isTodayTask="modalTask.isToday"
                title="Assignee"
                fontSize="text-13"
                icon-size="text-18 !opacity-[63%]"
                text-color="text-dark-default"
                opacity="opacity-50"
                positionMenu="right"
              />
            </div>
          </div>

          <!-- <div v-if="false" class="flex justify-between mb-15 h-26 items-center">
          <p class="text-13 text-grey-1300 w-1/2">Milestone</p>
          <AssignTaskToMilestone :task="modalTask" class="mr-auto opacity-40" @assignToMilestone="assignToMilestone" />
        </div> -->

          <div class="flex justify-between mb-12 h-26 items-center">
            <p class="text-13 text-grey-1300 w-1/2">Due date</p>

            <div class="mr-auto">
              <TaskDate
                :current-date="modalTask.endDate"
                class="w-full"
                position="right-0"
                iconSize="text-18"
                fontSize="text-13"
                :disabled="isClient"
                isTaskBoardModal
                :taskDates="taskDates"
                border-radius="rounded-6"
                paddings="px-6 py-4"
                textColor="text-dark-default"
                opacity="opacity-100"
                title="Due date"
                @toggleBothDates="toggleDate"
                @toggleShow="preventScroll = $event"
              />
            </div>
          </div>

          <div class="flex justify-between mb-12 h-26 items-center">
            <p class="text-13 text-grey-1300">Priority</p>

            <Urgency
              v-model="localTask.urgentStatus"
              class="w-1/2"
              border-radius="rounded-6"
              prefixMargin="!mr-[8px]"
              paddings="pl-9 pr-6 py-5"
              :iconSize="15"
              fontSize="text-13"
              :task="modalTask"
              :disabled="isClient"
              isModal
              zIndex="z-[110]"
              :showTooltip="false"
              textColor="text-dark-default"
              :opacity="localTask.urgentStatus ? 'opacity-100' : 'opacity-40'"
              positionMenu="right"
              title="Priority"
            />
          </div>

          <div class="flex justify-between mb-12 h-26 items-center">
            <p class="text-13 text-grey-1300">Reminders</p>

            <Reminder
              v-model="localTask.reminders"
              class="w-1/2"
              border-radius="rounded-6"
              prefixMargin="!mr-[10px]"
              paddings="pl-9 pr-6 py-5"
              :iconSize="13"
              :fontSize="localTask.reminders?.length ? '!text-[10.5px]' : 'text-13'"
              :task="computedModalTask"
              :disabled="isClient"
              isModal
              textColor="text-dark-default"
              :opacity="localTask.reminders?.length ? '!opacity-100' : 'opacity-40'"
              positionMenu="right"
              title="Reminders"
            />
          </div>

          <div v-if="localTask.storyPoints" class="flex justify-between mb-12 h-26 items-center">
            <p class="text-13 text-grey-1300 w-1/2">Estimate</p>

            <div class="mr-auto">
              <StoryPoints
                v-model="localTask.storyPoints"
                class="w-1/2"
                border-radius="rounded-6"
                prefixMargin="!mr-[10px]"
                paddings="px-6 py-5"
                :iconSize="16"
                fontSize="text-13"
                :task="modalTask"
                :disabled="isClient"
                :showTooltip="false"
                textColor="text-dark-default"
                opacity="opacity-40"
                positionMenu="right"
                title="Estimate"
              />
            </div>
          </div>

          <div v-if="modalTask.taskTags?.length" class="flex justify-between mb-12 h-26 items-center">
            <p class="text-13 text-grey-1300">Labels</p>

            <TagsModal
              :selected-tags="modalTask.taskTags"
              class="w-1/2"
              textColor="text-dark-default"
              :tags="tags"
              :disabled="isClient"
              :maxLabelsAmount="3"
              :iconSize="'text-18'"
              title="Labels"
              titleFontSize="text-13"
              tagClass="!text-11 !min-w-[35px] !rounded-7"
              position-classes="right-40 top-25 z-9999"
              opacity="opacity-40"
              tagsBtnClasses="rounded-6 px-6 py-4 w-min !cursor-default"
              @blockHotKey="blockHotKey"
              @toggleTag="handleToggleTaskTag"
              @updateTag="updateTag"
            />
          </div>

          <div v-if="computedModalTask?.subTask?.length" class="flex justify-between mb-12 h-26 items-center">
            <p class="text-13 text-grey-1300  w-1/2">Subtasks</p>

            <div class="mr-auto">
              <ButtonModule
                class="anim-opacity px-8 py-4 !ml-0 rounded-6 bg-red-seashell text-dark-100"
                @click.stop="handleToggleSubtask"
              >
                <div class="flex items-center">
                  <Subtasks
                    :disabled="isClient"
                    :task="computedModalTask"
                    isModal
                    :radius="6"
                    fontSize="text-[12.5px]"
                    stroke="black"
                  />
                </div>
              </ButtonModule>
            </div>
          </div>

          <DropdownModule
            ref="attributesDropdownRef"
            dropdownClasses="!shadow !left-[0px] !top-[35px]"
            prefix="icon-add text-[9.5px]"
            text="Add attribute"
            :width="150"
            class="anim-opacity text-[12.5px] w-min"
            top-position="30px"
            :isTeleported="false"
            defaultStyles
            buttonClasses="h-30 bg-grey-200"
            buttonOpacity="80"
            background="bg-primary dark:bg-grey-110"
            preventCloseOnClick
          >
            <Cover
              class="flex w-full"
              prefixClasses="icon-image-1 text-14 mr-10"
              coverBtnClasses="!p-10 !text-13 !opacity-100 rounded-none !hover:opacity-100"
            />

            <TagsModal
              isAttributeDropdown
              :selected-tags="modalTask.taskTags"
              textColor="text-dark-default"
              :tags="tags"
              :disabled="isClient"
              :maxLabelsAmount="3"
              iconSize="text-14"
              :isScreenTaskView="isScreenTaskView"
              titleFontSize="text-13"
              paddings="pr-0 py-4"
              position-classes="left-0 top-25 z-9999"
              title="Label"
              opacity="!opacity-100 hover:opacity-100"
              @blockHotKey="blockHotKey"
              @toggleTag="handleToggleTaskTag"
              @updateTag="updateTag"
            >
              <template #button>
                <ButtonModule
                  text="Labels"
                  prefix="icon-label text-12 mr-10"
                  suffix="icon-arrow-top rotate-90 ml-auto"
                  class="p-10 w-full group-scope text-13"
                />
              </template>
            </TagsModal>

            <StoryPoints
              v-model="localTask.storyPoints"
              isAttributeDropdown
              paddings="p-10"
              :iconSize="12"
              fontSize="text-13 ml-2"
              class="w-full"
              customWrapperClasses="h-34 w-full"
              :task="modalTask"
              prefixMargin="!mr-10"
              borderRadius="rounded-none"
              :disabled="isClient"
              :isScreenTaskView="isScreenTaskView"
              :showTooltip="false"
              textColor="text-dark-default"
              opacity="!opacity-100 hover:opacity-100"
              title="Estimate"
              iconsClasses="text-11"
              textClasses="text-13"
            />

            <ButtonModule
              prefix="icon-add text-10 !mr-12"
              text="Subtask"
              class="anim-opacity py-10 w-full pl-12 pr-10 !ml-0 text-dark-default text-13 h-34"
              @click.stop="handleToggleSubtask"
            />
          </DropdownModule>
        </div>

        <TaskLatestActivity
          v-if="taskActivities?.length && !isClient"
          :latestActivity="taskActivities"
          class="mt-50"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/core/helper-functions'
import useTaskModal from '@/pages/task-board/useTaskModal'
import TransitionExpand from '@/components/shared/TransitionExpand'

const {
  showSubtask,
  modalTask,
  previewImage,
  route,
  router,
  // taskScreenSize,
  localTask,
  countMessages,
  computedModalTask,
  isClient,
  isScreenTaskView,
  isDeleteTaskWithRrule,
  taskCalendarEventDate,
  localTitle,
  localSubTitle,
  isTeamAccount,
  sampleMembersCount,
  sampleMembersSliceIndex,
  tags,
  rows,
  taskDates,
  preventScroll,

  copyLink,
  handleDeleteTask,
  changePreviewImage,
  deletePreviewImage,
  scrollToEditor,
  getTags,
  blockHotKey,
  changeCurrentBook,
  saveTitle,
  saveSubTitle,
  selectRow,
  toggleDate,
  close,
  showNewSubtask,
  handleToggleTaskTag,
  updateTag,
  toggleSubscription,
  toggleView,
  completeTask,
  onDeleteSubtask
} = useTaskModal()
const { isSidebarCollapsed } = useSidebar()
const { members } = useTeam()
const { books } = useBook()

const computedBooks = computed(() => books.value.filter(b => !b.archivedAt && b.id !== modalTask.value.bookId))
const selectedBook = ref(books.value.find(b => b.id === modalTask.value.bookId))
const selectedBookInDropdown = ref(books.value.find(b => b.id === +selectedBook.value?.id))

const isCompleted = computed(() => !!localTask.value.completedAt)

const { getTaskActivities, taskActivities } = useActivity()

const depthPageChatRef = ref(null)
const subtaskListRef = ref(null)
const attributesDropdownRef = ref(null)
const subTitleEditorRef = ref(null)

const isSubtitleFocused = computed(() => (subTitleEditorRef.value?.isFocusedEditor))

const isTitleFocused = ref(false)

const emitter = useEmitter()

onMounted(() => {
  showSubtask.value = modalTask.value?.subTask?.length > 0

  if (modalTask.value.attachments[0]?.showInModal) {
    previewImage.value = modalTask.value.attachments[0]?.url
  }

  if (route.query['new-message']) {
    setTimeout(() => {
      depthPageChatRef.value.$el.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, 500)
  }

  blockHotKey(false)

  if (!isClient.value) {
    getTaskActivities(modalTask.value?.id)
  }
  getTags()

  const query = Object.assign({}, route.query)
  query.taskId = modalTask.value?.id.toString()
  router.replace({ query })
})

watch(() => modalTask.value?.attachments, () => {
  const attachments = modalTask.value?.attachments || []
  previewImage.value = attachments.length > 0 && attachments[0]?.showInModal ? attachments[0]?.url : null
}, { deep: true })

watch(() => route.query.taskId, (value) => {
  if (!value) {
    close()
  }
})

async function handleToggleSubtask () {
  showNewSubtask()

  await nextTick(() => {
    subtaskListRef.value?.showNewSubtask()
    attributesDropdownRef.value?.close()
  })
}

emitter.on('closeTaskModalOnStartPrivateChat', () => {
  setTimeout(() => close())
})

async function closeSubtask () {
  nextTick(() => {
    showSubtask.value = false
  })
}
</script>

<style lang="scss">
.full-screen-window{
  *::-webkit-scrollbar {
    width: 6px;
    height: 8px;
    background: rgb(var(--color-scrollBarColor))  !important;
    border-radius: 5px !important;
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgb(var(--color-scrollBarThumbColor)) !important;

    &:hover {
      background: rgb(200, 200, 200) !important;
    }
  }
}
</style>
