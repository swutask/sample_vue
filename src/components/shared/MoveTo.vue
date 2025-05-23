<template>
  <div class="hover:bg-selection rounded-t-10" :class="{'bg-selection': isOpen}">
    <ButtonModule
      ref="reference"
      text="Move to.."
      :disabled="disabled"
      prefix="icon-input mr-15 text-app-color"
      class="text-app-color p-12 w-full"
      @click.stop="toggle"
    />
  </div>
  <teleport to="#main_section">
    <div
      v-if="isOpen"
      ref="content"
      class="absolute w-[200px] max-h-[270px] z-[100] overflow-y-auto rounded-10 rounded-tl-0 shadow bg-primary text-app-color bg-primary"
      :class="show ? 'opacity-100' : 'opacity-0'"
      :style="`top: ${position.top}px; left: ${position.left}px;`"
    >
      <div class="font-semibold text-15 py-7 px-20 rounded-t-10">
        Spaces
      </div>
      <div
        v-for="item in filteredBooks"
        :key="item.id"
        class="truncate text-15 py-10 px-20 cursor-pointer last:mb-0 no-scroll-bar last:rounded-b-10 hover:bg-selection"
        @click="moveTo(item.id)"
      >
        {{ item.title }}
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  project: IProject
  book: IBook
}>()
const route = useRoute()
const router = useRouter()

const { editProject } = useProject()
const { books, getBook } = useBook()

const reference = ref(null)
const content = ref(null)

const isOpen = ref(false)
const show = ref(false)
const position = reactive({
  top: 0,
  left: 0
})

const filteredBooks = computed(() => books.value.filter(item => item.id !== props.project.bookId))
const disabled = computed(() => {
  const projects = props.book.projects.filter(item => !item.parentId)

  if (filteredBooks.value.length === 0) {
    return true
  } else if (props.book.projects.length === 1) {
    return true
  } else {
    if (props.project.parentId) {
      return false
    }
  }

  return projects.length === 1 && props.book.projects.length <= 1
})

const setPosition = () => {
  setTimeout(() => {
    const rect = reference.value.$el.getBoundingClientRect()
    const contentHeight = content.value.getBoundingClientRect().height

    if (window.innerHeight - rect.top < contentHeight) {
      position.top = window.innerHeight - contentHeight
      position.left = rect.right + 1
    } else {
      position.top = rect.top
      position.left = rect.right + 1
    }

    show.value = true
  }, 100)
}

const toggle = () => {
  isOpen.value = !isOpen.value

  isOpen.value && setPosition()
}

const edit = (id) => {
  editProject({
    id: props.project.id,
    data: {
      title: props.project.title,
      parentId: null,
      bookId: id
    }
  })
    .then(() => {
      getBook(+route.params.id)
        .then((book) => {
          router.replace({ query: { page: book.projects[0]?.id } })
        })
    })
}

const moveTo = (id) => {
  if (props.project.subProject?.length) {
    const arr = []

    props.project.subProject.forEach(item => {
      arr.push(editProject({
        id: item.id,
        data: {
          title: item.title,
          bookId: id
        }
      }))
    })

    Promise.all(arr).then(() => {
      edit(id)
    })
  } else {
    edit(id)
  }

  isOpen.value = false
}
</script>
