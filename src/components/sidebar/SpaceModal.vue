<template>
  <teleport to="#main_section" class="text-grey-1200">
    <div class="fixed top-0 left-0 w-full h-full flex bg-light-backdrop z-[105] text-app-color overflow-auto text-14 px-15" @click.self="closeModal">
      <div class="mx-auto mb-auto mt-50 lg:mt-[135px] w-full max-w-[565px] rounded-20 py-20 px-38 bg-primary shadow-dropdown">
        <div class="flex justify-between items-start">
          <p class="font-bold text-21 mb-21">Create a new space</p>

          <ButtonModule
            prefix="icon-close text-13"
            class="hover:bg-menu-hover p-10 rounded-8"
            teleportTooltip
            tooltipText="Close"
            tooltipBottom
            @click.stop="closeModal"
          />
        </div>

        <div class="flex flex-col space-y-20">
          <div class="relative">
            <InputModule
              v-model="bookData.title"
              name="title"
              autofocus
              type="text"
              label="Name space"
              placeholder="Design new website"
              class="w-full"
              inputClasses="pr-18 pl-[60px] py-16 rounded-10 border border-grey-1500 focus:rounded-6 focus:border-dark-300
            focus:shadow-[0px_0px_0px_1px_#222] hover:rounded-6 hover:!border-dark-300 hover:shadow-[0px_0px_0px_1px_#222] anim-all bg-transparent"
              label-class="mb-10 font-semibold"
            />
            <div
              class="!absolute top-43 left-10 pr-7 border-r border-grey-1500 z-100"
            >
              <BookIcon
                :book="bookData"
                size="h-30 w-30"
                isCreateSpace
                :hasBorder="false"
                @click.stop
                @updateIcon="updateIcon"
              />
            </div>
          </div>

          <div>
            <label>
              <p class="font-semibold mb-10">Description project</p>
              <textarea
                v-model="bookData.description"
                name="description"
                placeholder="What is the project about?"
                class="w-full px-18 pb-10 pt-12 rounded-10 !border !border-grey-1500 focus:rounded-6 focus:!border-dark-300
                      focus:shadow-[0px_0px_0px_1px_#222] hover:rounded-6 hover:!border-dark-300
                      hover:shadow-[0px_0px_0px_1px_#222] !outline-none !no-resize anim-all bg-transparent max-h-[48px]"
              />
            </label>
          </div>

          <div v-if="filteredMembers.length > 1">
            <p class="mb-5 font-semibold">
              Invite teammates
            </p>
            <!-- TODO: why do we use AssignMemberModal here? Fix it! -->
            <AssignMemberModal
              :members="filteredMembers"
              :selected-members="bookData.members"
              class="!justify-start"
              title="Add teammates to space"
              :width="200"
              @toggleMember="toggleMember"
            >
              <div class="flex items-center cursor-pointer">
                <div v-if="bookData.members.length > 0" class="flex flex-wrap">
                  <div
                    v-for="item in bookData.members"
                    :key="item.id"
                    class="space-dropdown mr-5 my-5 min-w-[50px] font-semibold"
                  >
                    <div class="text-app-color">
                      <UserBadge
                        :first-name="item.firstName"
                        :last-name="item.lastName"
                        :avatarUrl="item.avatar?.url"
                        :color="item.color"
                        class="items-center"
                      />
                    </div>
                  </div>
                </div>

                <div v-else class="space-dropdown !w-[250px]">
                  Add teammates to space
                  <i class="icon-keyboard-arrow-down text-grey-900 text-12" />
                </div>
              </div>
            </AssignMemberModal>
          </div>

          <Switcher
            :modelValue="taskBoardViewType"
            borderRadius="7px"
            width="33.33%"
            height="85px"
            nameClasses="text-13"
            :scale="{ x: 0.96, y: 0.94 }"
            :tabs="[
              { name: 'Board', key: 'board-view', icon: 'icon-spaces text-15 mb-7' },
              { name: 'List', key: 'list-view', icon: 'icon-task-list text-13 mb-7' },
              { name: 'Calendar', key: 'calendar', icon: 'icon-calendar text-21 mb-7' }
            ]"
            @update:modelValue="updateDefaultViewType"
          />
        </div>
        <div class="flex justify-end mt-40 ml-auto">
          <ButtonModule
            :disabled="!bookData.title"
            type="black"
            text="Create space"
            class="justify-center px-28 py-16 font-semibold dark:bg-sidebar dark:text-white"
            :class="{ 'opacity-40 font-medium': !bookData.title }"
            @click="createBook"
          />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import icons from '@/core/icons'

const emit = defineEmits(['close'])

const { user } = useProfile()
const { team, members, member } = useTeam()
const { getRows, createTask } = useTask()
const { addBook } = useBook()
const { setNotification, blockHotKey } = useGeneral()
const { activeBookId } = useBook()

const router = useRouter()

const filteredMembers = computed(() => {
  return members.value.filter(m => m.userId !== user.value.id)
})

const taskBoardViewType = ref<ISwitcherModelValue>({ index: 0, key: 'board-view' })

const task = ref({
  title: 'Task (or note) example',
  subTitle: 'Click here to open.',
  project: null,
  taskTags: [],
  isUrgent: false,
  urgentStatus: null,
  endDate: null,
  startDate: null,
  teamMembers: [member.value]
})

const bookData = ref({
  id: 0,
  title: '',
  description: '',
  members: [],
  icon: icons.getRandomColorIcon()
})

function closeModal () {
  bookData.value = {
    id: 0,
    title: '',
    members: [],
    icon: '',
    description: ''
  }

  emit('close')
}

onMounted(() => {
  blockHotKey(true)
})

function updateDefaultViewType (event: ISwitcherModelValue) {
  taskBoardViewType.value = event
}

async function createBook () {
  try {
    const createdBook = await addBook({ isTeam: true, payload: bookData.value })
    const localData = useLocalStorage.getItem('taskBoardTypeV3') || {}
    localData[createdBook.id] = taskBoardViewType.value

    useLocalStorage.setItem('taskBoardTypeV3', localData)

    await handleTaskCreation(createdBook)

    closeModal()
  } catch (error) {
    console.error('Error creating book:', error)
  }
}

async function handleTaskCreation (book) {
  try {
    setNotification({ uuid: window.crypto.randomUUID(), message: 'Space created' })
    const data = await getRows(book.id)
    await createTask({
      title: task.value.title,
      subTitle: task.value.subTitle,
      additionalInfo: '',
      isUrgent: task.value.isUrgent,
      taskRowId: data[0].id,
      bookId: book.id,
      subTask: [],
      startDate: task.value.startDate,
      endDate: task.value.endDate,
      tagIds: task.value.taskTags.map(item => item.id),
      teamMembers: task.value.teamMembers.map(m => m.id),
      urgentStatus: task.value.urgentStatus
    })
    router.push({ name: 'TaskBoardTeam', params: { team: team.value.link, id: book.id } })
    activeBookId.value = book.id
  } catch (error) {
    console.error('Error handling task creation:', error)
  }
}

function toggleMember ({ member, isSelected }) {
  if (isSelected) {
    bookData.value.members = bookData.value.members.filter(item => item.id !== member.id)
  } else {
    bookData.value.members.push(member)
  }
}

function updateIcon (event) {
  bookData.value.icon = event
}
</script>

<style scoped lang="scss">
.space-dropdown {
  @apply flex items-center justify-between w-[200px] px-12 py-14 rounded-10 border border-grey-1500 text-14
   text-grey-950 transition-all duration-50 ease-in-out;
}

.space-dropdown:hover {
  @apply rounded-6 border-dark-300 shadow-[0px_0px_0px_1px_#222];
}
</style>
