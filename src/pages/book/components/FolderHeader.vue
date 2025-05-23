<template>
  <div class="w-full" :class="isSidebar ? 'group' : 'mb-4'">
    <div class="flex items-center flex-grow cursor-pointer relative h-45 lg:h-30 w-full hover:bg-grey-425 rounded-8 pl-5">
      <div
        v-if="!isEdit"
        class="flex items-center flex-grow max-w-[170px] truncate
              pr-15 group-hover:pr-0"
        :class="[{ 'max-w-[150px] pr-0': isMenuOpen },
                 isSidebar ? 'text-[12.5px] text-grey-950' : 'text-13 font-semibold group-scope-hover:max-w-[150px]',
                 !folded || isEmpty ? 'opacity-70' : ''
        ]"
        @click="toggleFold"
      >
        <p class="truncate select-none">{{ localFolder.name }}</p>
        <p v-if="!isSidebar" class="ml-4 text-grey-250 font-normal">{{ count }}</p>
      </div>

      <div
        v-show="isEdit" class="w-full"
        draggable="true"
        @dragstart.prevent.stop
      >
        <input
          ref="titleInputRef"
          v-model.trim="localFolder.name"
          class=" w-full !text-14 mt-5 mb-4 font-medium outline-none bg-transparent tracking-[0.2px]"
          maxlength="30"
          type="text"
          @update:modelValue="updateTitle"
          @blur="cancelEdit"
          @keypress.enter="cancelEdit"
        >
      </div>

      <div class="flex items-center ml-auto h-full py-8 !absolute top-0 right-12">
        <i
          class="mr-5 transition-all opacity-0 group-hover:opacity-100"
          :class="[folded ? 'icon-down' : 'icon-right']"
          @click="toggleFold"
        />
        <DropdownModule
          v-if="!isClient && folder.id >= 0"
          ref="menuRef"
          :prefix="`!text-18 ${isMenuOpen ? 'opacity-100' : 'opacity-70'}
               icon-more-horizontal text-app-color hover:opacity-100 transition-color duration-50`"
          :iconHasHover="false"
          class="text-app-color text-15 h-full flex items-center"
          buttonClasses="!p-3"
          :custom-classes="dropdownClasses"
          :class="[
            opacityClasses
          ]"
          :width="210"
          is-auto-menu-position
          zIndex="z-9999"
          :contentHeight="248.5"
          background="bg-primary dark:bg-grey-110"
          @click="toggleMenu(true)"
          @close="toggleMenu(false)"
        >
          <div class="z-[1010]" @click.stop>
            <div class="rounded-t-10 hover:bg-selection">
              <ButtonModule
                text="Rename"
                prefix="icon-edit mr-15"
                class="btn-classes"
                @click="toggleEdit"
              />
            </div>

            <div class="rounded-b-10 hover:bg-selection">
              <ButtonModule
                text="Delete"
                prefix="icon-delete mr-15"
                class="btn-classes"
                @click="$emit('deleteFolder', localFolder)"
              />
            </div>
          </div>
        </DropdownModule>

        <button v-if="!isSidebar" class="w-20 h-20 lg:w-auto lg:h-auto" @click="toggleFold">
          <i
            v-if="localFolder.books?.length"
            class="text-10 anim-all p-5 lg:opacity-0 lg:group-scope-hover:opacity-100 text-grey-300 lg:hover:text-app-color"
            :class="!folded ? 'icon-keyboard-arrow-left' : 'icon-keyboard-arrow-down'"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'

const props = defineProps<{
  folder: IFolder
  isSidebar?: boolean
  isEmpty?: boolean
}>()
const emit = defineEmits(['fold', 'updateDefaultNestedProjects', 'deleteFolder'])

const { user, isClient } = useProfile()
const { isMobile } = useGeneral()
const { updateFolder } = useBook()

const menuRef = ref()
const folded = ref(true)
const isEdit = ref(false)
const isMenuOpen = ref(false)
const titleInputRef = ref(null)

const foldedFolders = ref(useLocalStorage.getItem('foldedFolders') || {})

const localFolder = toRef<{ folder: IFolder }, keyof { folder: IFolder }>(props, 'folder')

const dropdownClasses = computed(() => {
  const prefix = isMenuOpen.value ? '' : 'hover:'

  return `${prefix}bg-menu-hover px-5 py-3 rounded-6 anim-color-200`
})

const opacityClasses = computed(() => {
  if (!props.isSidebar) {
    return isMenuOpen.value || isMobile.value
      ? 'opacity-100'
      : isEdit.value ? 'hidden' : 'opacity-0 md:group-scope-hover:opacity-100'
  } else {
    return 'opacity-0 md:group-hover:opacity-100'
  }
})

const count = computed(() => props.folder.books.length)

const updateTitle = debounce(async () => {
  if (!localFolder.value.name) return

  await updateFolder(localFolder.value.id, { name: localFolder.value.name })
}, 400)

onMounted(() => {
  const usersFoldedFolders = foldedFolders.value[user.value.id] || []
  folded.value = !usersFoldedFolders.includes(localFolder.value.id)
  emit('fold', folded.value)
  window.addEventListener('toggleEditFolder', customEvent)
})

onBeforeUnmount(() => {
  window.removeEventListener('toggleEditFolder', customEvent)
})

function toggleMenu (value: boolean) {
  isMenuOpen.value = value
}

function toggleEdit () {
  isEdit.value = true

  setTimeout(() => {
    titleInputRef.value.focus()
    titleInputRef.value.select()
  }, 100)

  menuRef.value?.close()
}

async function cancelEdit () {
  isEdit.value = false

  await updateTitle()
}

const toggleFold = () => {
  folded.value = !folded.value

  emit('fold', folded.value)

  const usersFoldedFolders = foldedFolders.value[user.value.id] || []

  if (!folded.value) {
    usersFoldedFolders.push(localFolder.value.id)
    foldedFolders.value[user.value.id] = usersFoldedFolders
  } else {
    const filteredFoldedFolders = usersFoldedFolders.filter(f => f !== localFolder.value.id)
    foldedFolders.value[user.value.id] = filteredFoldedFolders
  }

  useLocalStorage.setItem('foldedFolders', foldedFolders.value)
}

function customEvent (event: CustomEvent) {
  if (event.detail.id === props.folder.id) {
    toggleEdit()
  }
}
</script>
