<template>
  <teleport to="#main_section">
    <div
      v-closeOnPressEsc="onCloseModal"
      class="fixed top-0 left-0 md:px-15 md:pb-[120px] md:pt-[60px] pt-[205px] w-full h-full
         bg-[#00000060] z-9998 md:z-[106] overflow-y-auto overflow-x-hidden scrollbar-gutter"
      @click.self="onCloseModal"
    >
      <div
        id="wrapper"
        class="bg-primary mx-auto max-w-[780px] md:pb-0 pb-20 w-full md:rounded-20 rounded-t-20
               shadow-task-modal dark:shadow-none
               transition-transform duration-300 ease-in-out min-h-full md:min-h-min"
        :class="startAnimation ? 'translate-y-full lg:translate-y-0' : 'translate-y-0'"
      >
        <div
          class="flex flex-col w-full"
        >
          <div class="flex justify-between items-center py-11 pl-25 pr-15 group border-b border-grey-500">
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
              <CommentCount
                v-if="countMessages > 0"
                :countMessages="countMessages"
                wrapperStyling="flex items-center"
                iconStyling="md:text-15 text-18 mr-3 text-grey-975 mt-2"
                countStyling="leading-none text-14 text-grey-975"
                customStyling="flex items-center opacity-50 mx-4 cursor-pointer select-none
                   hover:bg-menu-hover hover:opacity-100 rounded-8 px-5 py-6 h-30"
                tooltipBottom
                @click="scrollToEditor()"
              />

              <ButtonModule
                :prefix="`icon-check-circle-outline md:text-18 text-21 ${isCompleted ? 'text-green-500' : 'text-grey-975'}`"
                class="flex items-center justify-center opacity-50 mx-4 cursor-pointer select-none
                   hover:bg-menu-hover hover:opacity-100 rounded-8 px-5 py-6 h-30 w-29"
                :tooltipText="isCompleted ? 'Completed' : 'Complete task'"
                teleportTooltip
                tooltipBottom
                @click="completeTask"
              />

              <ButtonModule
                prefix="icon-task-expand text-20 md:text-17 mt-1 text-grey-975"
                class="items-center justify-center opacity-50 cursor-pointer select-none first-letter:
                     hover:bg-menu-hover hover:opacity-100 rounded-8 px-6 py-6 h-30 hidden lg:flex"
                tooltipText="Switch to full screen view"
                teleportTooltip
                tooltipBottom
                @click="toggleView"
              />

              <TaskInfo :task="modalTask" buttonClasses="h-30" class="hidden md:flex" />

              <div class="w-1 h-24 bg-grey-150 mx-10" />

              <DropdownModule
                prefix="icon-more-horizontal text-22 md:text-19 text-grey-975"
                tooltipText="More options"
                teleportTooltip
                tooltipBottom
                defaultStyles
                :width="150"
                buttonClasses="h-30 px-5"
                top-position="30px"
                :isTeleported="false"
                background="bg-primary dark:bg-grey-110"
                is-auto-menu-position
              >
                <ButtonModule
                  text="Copy link"
                  prefix="icon-copy-link mr-15"
                  class="px-10 py-8 w-full group-scope text-13"
                  @click="copyLink({ bookId: modalTask.bookId, taskId: modalTask.id })"
                />

                <ButtonModule
                  v-if="!isClient && members?.length > 1"
                  :text="`${!!modalTask?.taskSubscriptions?.length ? 'Unsubscribe' : 'Subscribe'}`"
                  :prefix="`${!!modalTask?.taskSubscriptions?.length ? 'icon-no-notifications' : 'icon-sidebar-inbox'} mr-15`"
                  class="px-10 py-8 w-full group-scope text-13"
                  @click="toggleSubscription"
                />

                <ButtonModule
                  v-if="!isClient && !isMobile"
                  text="Latest activity"
                  prefix="icon-latest-activity text-11 ml-2 mr-15"
                  class="px-10 py-8 w-full group-scope text-13"
                  @click="showLatestActivity = true"
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
                prefix="icon-close text-14 md:text-11 text-grey-975"
                class="flex items-center justify-center opacity-50 mx-4 cursor-pointer select-none
                   hover:bg-menu-hover hover:opacity-100 rounded-8 px-10 py-6 h-30"
                tooltipText="Close (Esc)"
                teleportTooltip
                tooltipBottom
                @click="onCloseModal"
              />
            </div>
          </div>

          <div class="md:pb-34 px-15 md:px-[46px] pt-10 md:pt-25">
            <div class="text-app-color flex flex-col" :class="{ 'pointer-events-none': isClient }">
              <div v-if="previewImage" class="relative group mb-13">
                <DropdownModule
                  v-if="!isClient"
                  prefix="icon-more-horizontal text-20 text-white"
                  :width="170"
                  class="!absolute right-10 top-5 !z-10 opacity-0 group-hover:opacity-100 anim-opacity"
                  top-position="30px"
                  :isTeleported="false"
                  buttonClasses="h-30"
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

              <div class="md:flex md:mb-15 md:border-none border-b border-grey-500 md:pb-0 pb-10 -mx-15">
                <div class="flex items-center gap-[7px] flex-wrap text-14 px-15">
                  <SelectTaskRow
                    :task="modalTask"
                    customClasses="rounded-6 py-4 px-7 text-[12.5px]"
                    :bookId="modalTask.bookId"
                    :disabled="isClient"
                    :rows="rows"
                    @select="selectRow"
                  />

                  <TagsModal
                    v-if="modalTask.taskTags.length"
                    :selected-tags="modalTask.taskTags"
                    textColor="text-dark-default"
                    :tags="tags"
                    :disabled="isClient"
                    :maxLabelsAmount="3"
                    :iconSize="'text-18'"
                    :isScreenTaskView="isScreenTaskView"
                    titleFontSize="text-13"
                    tagClass="!text-12 !min-w-[35px] !rounded-7"
                    position-classes="left-0 top-25 z-9999"
                    opacity="opacity-40"
                    preventOpenOnClick
                    tagsBtnClasses="rounded-6 w-min !cursor-default !py-0"
                    @blockHotKey="blockHotKey"
                    @toggleTag="handleToggleTaskTag"
                    @updateTag="updateTag"
                  />

                  <StoryPoints
                    v-if="localTask.storyPoints"
                    v-model="localTask.storyPoints"
                    border-radius="rounded-6"
                    paddings="px-6 py-4"
                    :iconSize="14"
                    fontSize="text-14"
                    :task="modalTask"
                    :disabled="isClient"
                    :isScreenTaskView="isScreenTaskView"
                    :showTooltip="false"
                    textColor="text-dark-default"
                    opacity="opacity-40"
                    title="Estimate"
                  />

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
                    isAutoMenuPosition
                    paddings="px-6 py-4"
                    :disabled="isClient || modalTask.isToday"
                    border-radius="rounded-6"
                    prefixMargin="mr-8"
                    :task="modalTask"
                    :bookId="modalTask.bookId"
                    :isTodayTask="modalTask.isToday"
                    icon-size="text-18"
                    text-color="text-dark-default"
                    :isScreenTaskView="isScreenTaskView"
                    font-size="text-12"
                    opacity="opacity-40"
                  />

                  <!-- <AssignTaskToMilestone v-if="false" :task="modalTask" @assignToMilestone="assignToMilestone" /> -->

                  <TaskDate
                    ref="datePickerRef"
                    :current-date="modalTask.endDate"
                    position="md:right-20 right-10"
                    iconSize="text-17"
                    fontSize="text-14"
                    :disabled="isClient"
                    :isScreenTaskView="isScreenTaskView"
                    isTaskBoardModal
                    :taskDates="taskDates"
                    border-radius="rounded-6"
                    paddings="px-6 py-4"
                    textColor="text-dark-default"
                    opacity="opacity-40"
                    @toggleBothDates="toggleDate"
                  />

                  <Urgency
                    v-model="localTask.urgentStatus"
                    border-radius="rounded-6"
                    paddings="px-6 py-4"
                    :iconSize="14"
                    prefixMargin="mr-6"
                    fontSize="text-13"
                    :task="modalTask"
                    :disabled="isClient"
                    :isScreenTaskView="isScreenTaskView"
                    isAutoMenuPosition
                    isModal
                    zIndex="z-[110]"
                    :showTooltip="false"
                    textColor="text-dark-default"
                    :opacity="localTask.urgentStatus ? 'opacity-100' : 'opacity-40'"
                  />

                  <Reminder
                    ref="reminderRef"
                    v-model="localTask.reminders"
                    border-radius="rounded-6"
                    paddings="px-6 py-4"
                    :iconSize="13"
                    fontSize="text-[12.5px]"
                    :task="computedModalTask"
                    :disabled="isClient"
                    :isScreenTaskView="isScreenTaskView"
                    isAutoMenuPosition
                    isModal
                    textColor="text-dark-default"
                    :opacity="localTask.reminders?.length ? '!opacity-100' : 'opacity-40'"
                  />

                  <ButtonModule
                    v-if="computedModalTask?.subTask?.length"
                    class="rounded-6 anim-opacity px-6 py-4 !ml-0 attribute text-dark-100"
                    @click.stop="handleToggleSubtask"
                  >
                    <div class="flex items-center">
                      <Subtasks
                        :disabled="isClient"
                        :task="computedModalTask"
                        isModal
                        :radius="5"
                        fontSize="text-[12.5px]"
                        stroke="black"
                      />
                    </div>
                  </ButtonModule>

                  <DropdownModule
                    ref="attributesDropdownRef"
                    prefix="icon-more-horizontal text-20"
                    :width="150"
                    class="anim-opacity"
                    top-position="30px"
                    :isTeleported="false"
                    buttonClasses="h-27 bg-menu-hover/[0.06]"
                    buttonOpacity="50"
                    defaultStyles
                    background="bg-primary dark:bg-grey-110"
                    is-auto-menu-position
                    preventCloseOnClick
                  >
                    <Cover
                      :isModalView="!isMobile"
                      class="flex w-full"
                      prefixClasses="icon-image-1 text-14 mr-8"
                      coverBtnClasses="!p-10 !text-13 !opacity-100 !hover:opacity-100"
                    />

                    <TagsModal
                      isAttributeDropdown
                      :isModalView="!isMobile"
                      tagsWrapper="w-full"
                      :selected-tags="modalTask.taskTags"
                      textColor="text-dark-default"
                      :tags="tags"
                      :disabled="isClient"
                      :maxLabelsAmount="3"
                      :isTeleported="false"
                      positionDirection="next-to"
                      iconSize="text-12"
                      tagClass="text-[10.5px] !min-w-[35px] max-w-[70px] !rounded-7"
                      :isScreenTaskView="isScreenTaskView"
                      titleFontSize="text-14"
                      paddings="pr-0 py-4"
                      position-classes="left-0 top-25 z-9999"
                      opacity="opacity-100"
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
                      customWrapperClasses="h-34 w-full"
                      fontSize="text-13"
                      class="w-full"
                      :task="modalTask"
                      borderRadius="rounded-none"
                      :disabled="isClient"
                      :isTeleported="false"
                      positionDirection="next-to"
                      prefixMargin="!mr-10"
                      :isScreenTaskView="isScreenTaskView"
                      :showTooltip="false"
                      textColor="text-dark-default"
                      opacity="opacity-100 !group-hover:opacity-100"
                      title="Estimate"
                      :isModalView="!isMobile"
                      iconsClasses="text-12"
                      textClasses="text-13"
                    />

                    <ButtonModule
                      prefix="icon-add text-10"
                      text="Subtask"
                      class="anim-opacity py-10 pl-12 pr-10 !ml-0 text-dark-default text-13 h-34 w-full"
                      @click.stop="handleToggleSubtask"
                    />
                  </DropdownModule>
                </div>
              </div>

              <div class="flex items-center mb-1 mt-20 md:mt-0">
                <TitleEditor
                  ref="titleEditorRef"
                  :content="localTitle"
                  :disabled="isClient"
                  maxlength="255"
                  class="task-board-title w-full bg-transparent min-h-[36.4px] overflow-x-hidden overflow-y-auto block"
                  :class="{ 'line-through opacity-40 dark:opacity-70': !!modalTask.completedAt }"
                  :taskId="modalTask.id"
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
                    class="task-board-subtitle w-full bg-transparent max-h-[200px] min-h-[30px]
                      overflow-x-hidden overflow-y-auto block"
                    :class="{ 'line-through opacity-40 dark:opacity-70': !!modalTask.completedAt }"
                    style="--title-editor-placeholder: 'Add subtile...'"
                    :taskId="modalTask.id"
                    allowEmpty
                    :bookId="modalTask.bookId"
                    editorClass="task-board-editor-class"
                    editorId="task-board-editor-id"
                    @onUpdate="saveSubTitle"
                  />
                </div>
              </TransitionExpand>
            </div>
            <!-- computedModalTask -->
            <SubtaskList
              v-if="showSubtask || computedModalTask?.subTask?.length > 0"
              ref="subtaskListRef"
              :task="computedModalTask"
              :disabled="isClient"
              isTaskBoardModal
              class="mb-20"
              @close="onClose"
              @blockHotKey="blockHotKey"
              @delete="onDeleteSubtask"
            />

            <TaskContentEditor
              ref="taskContentEditorRef"
              :taskId="modalTask.id"
              :bookId="modalTask.bookId"
              :disabled="!!modalTask.integrationType"
            />

            <DepthPageChat
              ref="depthPageChatRef"
              class="mt-30"
              :showCommentsForMobile="showCommentsForMobile"
              titleClasses="font-bold mb-5"
              :taskId="modalTask?.id"
              :bookId="modalTask?.bookId"
              :chatId="modalTask?.chat?.id"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showLatestActivity"
      class="fixed top-0 left-0 w-full h-full flex bg-[#0007] z-[110] pb-40 text-app-color overflow-auto text-14 px-15"
      @click.self="showLatestActivity = false"
    >
      <div
        class="relative overflow-hidden mx-auto mb-auto mt-50 lg:mt-[135px]
           w-full max-w-[620px] rounded-10 bg-primary shadow-dropdown"
      >
        <TaskLatestActivity
          v-if="taskActivities.length && !isClient"
          :latestActivity="taskActivities"
          class="p-25 hidden md:block"
          isModal
        />
      </div>
    </div>
  </teleport>
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
  localTask,
  countMessages,
  computedModalTask,
  isClient,
  isScreenTaskView,
  copyLink,
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

  // assignToMilestone,
  handleDeleteTask,
  changePreviewImage,
  deletePreviewImage,
  scrollToEditor,
  getTags,
  blockHotKey,
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
  changeCurrentBook,
  completeTask,
  onDeleteSubtask
} = useTaskModal()
const { getTaskActivities, taskActivities } = useActivity()
const { isMobile, isLargeScreen } = useGeneral()
const { books } = useBook()
const startAnimation = ref(true)
const showLatestActivity = ref(false)
const { members } = useTeam()
const computedBooks = computed(() => books.value.filter(b => !b.archivedAt && b.id !== modalTask.value.bookId))
const selectedBook = ref(books.value.find(b => b.id === modalTask.value.bookId))
const selectedBookInDropdown = ref(books.value.find(b => b.id === +selectedBook.value.id))

const reminderRef = ref()
const datePickerRef = ref()
const depthPageChatRef = ref(null)
const subtaskListRef = ref(null)
const attributesDropdownRef = ref(null)
const titleEditorRef = ref(null)
const subTitleEditorRef = ref(null)
const taskContentEditorRef = ref(null)

const emitter = useEmitter()

const isCompleted = computed(() => !!localTask.value.completedAt)

const showCommentsForMobile = computed(() => {
  return !titleEditorRef.value?.isFocusedEditor && !subTitleEditorRef.value?.isFocusedEditor &&
    !taskContentEditorRef.value?.isFocusedEditor && !datePickerRef.value?.show
})

const isSubtitleFocused = computed(() => (subTitleEditorRef.value?.isFocusedEditor))

const isTitleFocused = ref(false)

function onCloseModal () {
  if (isLargeScreen.value) {
    close()
  } else {
    if (!reminderRef.value?.isOpened) {
      startAnimation.value = true
      setTimeout(() => {
        close()
      }, 300)
    }
  }
}

onMounted(() => {
  // autoResize(titleInputRef.value)
  // autoResize(subtitleInputRef.value)
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
    getTaskActivities(modalTask.value.id)
  }
  getTags()

  const query = Object.assign({}, route.query)
  query.taskId = modalTask.value.id.toString()
  router.replace({ query })
  nextTick(() => {
    startAnimation.value = false
  })
})

watch(() => modalTask.value?.attachments, () => {
  const attachments = modalTask.value?.attachments || []
  previewImage.value = attachments.length > 0 && attachments[0]?.showInModal ? attachments[0]?.url : null
}, { deep: true })

emitter.on('closeTaskModalOnStartPrivateChat', () => {
  setTimeout(() => close())
})

async function handleToggleSubtask () {
  showNewSubtask()

  await nextTick(() => {
    subtaskListRef.value?.showNewSubtask()
    attributesDropdownRef.value?.close()
  })
}

async function onClose () {
  nextTick(() => {
    showSubtask.value = false
  })
}
</script>
