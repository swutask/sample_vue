<template>
  <div v-clickOutside="clickOutside" class="flex">
    <ButtonModule
      type="transparent"
      main
      class="pl-6 pr-9 h-31 group"
      :class="
        isActive || isFocused ?
          '!border-black !shadow-black-05' :
          '!shadow-none active:!shadow-none hover:!shadow-black-05'
      "
    >
      <i class="icon-perspectives text-16 mr-7" />

      <p v-if="!isEdit" class="text-12">{{ perspective.name }}</p>

      <input
        v-else
        v-model="localPerspective.name"
        v-focus="true"
        type="text"
        class="outline-none bg-transparent max-w-[120px] text-12"
        @focus="isFocused = true"
        @blur="onBlur"
      >

      <DropdownModule
        v-if="!isEdit"
        ref="dropdownRef"
        prefix="icon-more-horizontal text-17"
        buttonClasses="!p-2 !rounded-4"
        :width="150"
        class="ml-5 hidden md:group-hover:flex"
        background="bg-primary dark:bg-grey-110"
        :topGap="8"
        defaultStyles
        is-auto-menu-position
      >
        <ButtonModule
          text="Edit"
          prefix="icon-copy-link mr-15"
          class="py-8 px-11 w-full group-scope text-13"
          @click.stop="toggleEdit(true)"
        />

        <ButtonModule
          v-if="perspectives.length !== 1"
          text="Delete"
          prefix="icon-delete mr-15"
          class="py-8 px-11 w-full group-scope text-13"
          @click="onDelete"
        />
      </DropdownModule>
    </ButtonModule>

    <template v-if="isEdit">
      <Filters
        ref="filtersRef"
        :initialFilters="perspective.task"
        :filters="localPerspective.task"
        :filteredTags="filteredTags"
        :membersOptions="membersOptions"
        title="Display settings"
        :isToday="isToday"
        isEdit
        :height="31"
        class="ml-7"
        @filterBy="handleToggleFilter($event.filters)"
      />

      <ButtonModule
        :has-hover="true"
        text="Cancel"
        class="text-app-color text-13 ml-10 mr-7"
        @click="toggleEdit(false)"
      />

      <ButtonModule
        text="Save"
        type="black"
        class="rounded-6 px-11 font-medium text-white text-13"
        @click="save"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  perspective: IPerspective
  isActive?: boolean
  isToday?: boolean
  isNew?: boolean
}>()

const emit = defineEmits(['changeFilter', 'close', 'setPerspective'])

const { tasks } = useTask()
const { perspectives, createPerspective, updatePerspective, deletePerspective } = usePerspectives()
const { member, members } = useTeam()

const isEdit = ref(false)
const isFocused = ref(false)

const localPerspective = ref({ ...props.perspective })
const dropdownRef = ref()
const filtersRef = ref()

const filteredTags = computed(() => {
  const usedTags = {}

  tasks.value.forEach(t => {
    usedTags[t.bookId] = []
  })

  tasks.value.forEach(t => {
    const ids = new Set(usedTags[t.bookId].map(tag => tag.id))

    const taskTags = t.taskTags?.filter(d => !ids.has(d.id)) || []

    usedTags[t.bookId] = [...usedTags[t.bookId], ...taskTags]
  })

  return usedTags as TIndexedObject<ITag[]>
})

const membersOptions = computed(() => {
  return members.value.sort((a: ITeamMember, b: ITeamMember) => {
    const memberId = member.value.id
    return a.id === memberId ? -1 : b.id === memberId ? 1 : a.id - b.id
  })
})

onMounted(() => {
  if (props.isNew) {
    isEdit.value = true
  }
})

function onBlur () {
  isFocused.value = false

  if (props.perspective.name !== localPerspective.value.name && localPerspective.value.name.trim() !== '') {
    if (!props.isNew) {
      updatePerspective({
        id: props.perspective.id,
        name: localPerspective.value.name.trim()
      })
    }
  }
}

function toggleEdit (value: boolean) {
  isEdit.value = value

  if (!value) {
    emit('close')
  }
}

async function save () {
  if (props.isNew && localPerspective.value.name.trim() !== '') {
    const perspective = await createPerspective({
      name: localPerspective.value.name.trim(),
      taskFilter: localPerspective.value.task
    })

    emit('setPerspective', perspective)
  }

  emit('changeFilter', localPerspective.value.task)

  toggleEdit(false)
}

function handleToggleFilter (value: IFilters) {
  localPerspective.value.task = {
    ...localPerspective.value.task,
    ...value
  }
}

async function onDelete () {
  const index = perspectives.value[0].id === props.perspective.id ? 1 : 0
  emit('setPerspective', perspectives.value[index])
  await deletePerspective(props.perspective.id)
}

function clickOutside () {
  if (!props.isNew) {
    toggleEdit(false)
  }

  if (!filtersRef.value?.dropdownRef?.isDropdownVisible) {
    emit('close')
  }
}
</script>
