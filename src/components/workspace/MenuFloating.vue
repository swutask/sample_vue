<template>
  <div
    id="floating"
    ref="menuRef"
    v-clickOutside="closeBlockColorPicker"
    class="flex absolute h-38 max-w-calc-50 w-full md:w-auto z-20 mb-8 editor__floating-menu"
    :class="{ 'is-active': isActive && (editor.isFocused || showBlockColorPicker || showMoreMenu || showGifPicker) }"
    :style="`top: ${isMobile ? menuTop + 30 : menuTop + 25}px`"
  >
    <div
      class="no-scroll-bar rounded-4 z-20 shadow-[0_0_0_1px_rgb(15,15,15,0.07),0_2px_4px_rgb(15,15,15,0.12)]
        flex opacity-90 hover:opacity-100 bg-primary"
    >
      <MenuButton
        :ref="el => buttonsRef[0] = el"
        class="text-13"
        tooltipText="Heading 1"
        :is-active="activeIndex === 0"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        H1
      </MenuButton>

      <MenuButton
        :ref="el => buttonsRef[1] = el"
        class="text-13"
        tooltipText="Heading 2"
        :is-active="activeIndex === 1"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        H2
      </MenuButton>

      <MenuButton
        :ref="el => buttonsRef[2] = el"
        class="text-13 border-r border-hover"
        tooltipText="Heading 3"
        :is-active="activeIndex === 2"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        H3
      </MenuButton>

      <MenuButton
        :ref="el => buttonsRef[3] = el"
        class="flex justify-center items-center"
        tooltipText="Checkbox"
        :is-active="activeIndex === 3"
        @click="editor.chain().focus().toggleTaskList().run()"
      >
        <i class="icon-checkbox text-19" />
      </MenuButton>

      <MenuButton
        :ref="el => buttonsRef[4] = el"
        :disabled="!allowUpload"
        tooltipText="Upload image"
        class="flex justify-center items-center"
        :is-active="activeIndex === 4"
        @click="openImageUploader"
      >
        <i class="icon-image text-16 mt-2" />
        <input ref="inputRef" class="hidden" type="file" multiple @change="uploadImage">
      </MenuButton>

      <MenuButton
        :ref="el => buttonsRef[5] = el"
        class="flex justify-center items-center"
        :is-active="activeIndex === 5"
        tooltipText="Insert border"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        <i class="icon-divider text-2" />
      </MenuButton>

      <MenuButton
        :ref="el => buttonsRef[6] = el"
        class="border-r border-hover flex justify-center items-center relative"
        tooltipText="Color block"
        :is-active="showBlockColorPicker || activeIndex === 6"
        @click.stop="openBlockColorPicker"
      >
        <i class="icon-format-paint" />
      </MenuButton>

      <MenuButton
        :ref="el => buttonsRef[7] = el"
        class="text-18"
        tooltipText="Undo"
        :is-active="activeIndex === 7"
        @click="onUndo"
      >
        <i class="icon-undo text-15" />
      </MenuButton>

      <MenuButton
        :ref="el => buttonsRef[8] = el"
        class="text-18 text-app-color"
        tooltipText="Redo"
        :is-active="activeIndex === 8"
        @click="onRedo"
      >
        <i class="icon-redo text-15" />
      </MenuButton>

      <MenuButton
        :ref="el => buttonsRef[9] = el"
        class="text-18 text-app-color flex justify-center items-center"
        tooltipText="More"
        :is-active="activeIndex === 9"
        @click.stop="openMoreMenu"
      >
        <i class="icon-more-horizontal text-21" />
      </MenuButton>
    </div>

    <ButtonModule
      prefix="icon-close-rounded text-20"
      class="text-app-color cursor-pointer ml-5 text-12 text-grey-300 hover:text-app-color p-5"
      @click.stop="close"
    />

    <div
      v-show="showMoreMenu"
      ref="menuMoreRef"
      class="absolute z-10 bg-primary rounded-4 shadow text-app-color"
      :style="menuPosition"
    >
      <div class="hover:bg-selection group-scope rounded-t-4">
        <ButtonModule
          :disabled="!allowUpload"
          text="Upload file"
          prefix="icon-attach-file mr-12 text-16"
          class="py-8 px-12 w-full text-13 h-34"
          :class="{'opacity-50': !allowUpload}"
          @click="openImageUploader"
        />
      </div>
      <div class="hover:bg-selection group-scope">
        <ButtonModule
          v-if="!hideTable"
          text="Table"
          prefix="icon-table mt-2 mr-12 text-16"
          class="py-8 px-12 w-full text-13 h-34"
          @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
        />
      </div>
      <div class="hover:bg-selection group-scope">
        <ButtonModule
          text="Code block"
          prefix="icon-code mt-2 mr-9 text-19"
          class="py-8 px-12 w-full text-13 h-34"
          :icon-has-margin="false"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        />
      </div>
      <div class="hover:bg-selection group-scope relative">
        <input
          v-if="showYoutubeInput"
          v-model="youtubeLink"
          v-focus="true"
          class="absolute w-[300px] px-20 py-8 top-0 right-full mr-5 rounded-4 outline-none
          shadow-[0_0_0_1px_rgb(15,15,15,0.07),0_2px_4px_rgb(15,15,15,0.12)]"
          type="text"
          placeholder="https://www.youtube.com"
          @keypress.enter="setYoutubeLink"
          @click.stop
        >

        <ButtonModule
          text="YouTube"
          prefix="icon-youtube mr-12 text-16"
          class="py-8 px-12 w-full text-13 h-34"
          @click.stop="toggleYoutubeInput"
        />
      </div>
      <div class="hover:bg-selection rounded-b-4 group-scope">
        <ButtonModule
          class="py-8 px-12 w-full h-34"
          @click.stop="openGifPicker"
        >
          <span
            class="text-12 font-bold mr-9 mt-3"
          >GIF</span>
          <span class="text-13">Giphy</span>
        </ButtonModule>
      </div>
    </div>

    <div
      v-show="showBlockColorPicker"
      ref="colorRef"
      class="absolute z-10 bg-primary rounded-4 shadow"
      :style="blockColorPosition"
    >
      <div class="cursor-default">
        <p class="tex-16 font-bold text-left text-app-color pl-10 pt-5">Pick a block color</p>
        <div class="w-[225px] flex flex-wrap m-6">
          <div
            v-for="(c, index) in colors"
            :key="c + index"
            class="w-37 h-37 rounded-full mx-4 my-5 cursor-pointer"
            :style="`background-color: ${c}`"
            @click.stop="applyBlockColor(c)"
          />
        </div>
        <div
          v-if="editor.isActive('ColorBlock')"
          class="flex items-center p-10 pt-0 text-11 text-app-color opacity-50 hover:opacity-100 cursor-pointer"
          @click.stop="removeBlockColor()"
        >
          <i class="icon-remove mr-5" />
          <p>Remove color</p>
        </div>
      </div>
    </div>
    <!-- gif picker -->
    <GifPicker
      v-if="showGifPicker"
      ref="gifPickerRef"
      v-clickOutside="closeGifPicker"
      resizePositionBottom
      class="top-50"
      @selectGif="insertGif"
      @click.stop
    />
  </div>
</template>

<script setup lang="ts">
import FloatingMenu from '@/tiptap/plugins/FloatingMenu'

import { getPosition } from '@/core/helper-functions'
import defaultColors from '@/core/colors'

import ImageUploadMixin from '@/mixins/ImageUploadMixin.js'

const props = withDefaults(defineProps<{
  editor: any // add interface to editor
  allowUpload?: boolean
  taskId?: number
  bookId?: number
  projectId?: number
  hideTable?: boolean
}>(), {
  allowUpload: true
})

const { isMobile } = useGeneral()

const imageUpload = ImageUploadMixin(props)

const menuRef = ref(null)
const inputRef = ref(null)
const colorRef = ref(null)
const menuMoreRef = ref(null)
const gifPickerRef = ref(null)
const buttonsRef = ref([])

const showYoutubeInput = ref(false)
const youtubeLink = ref<string>('')
const showBlockColorPicker = ref(false)
const showMoreMenu = ref(false)
const showGifPicker = ref(false)
const blockColorPosition = ref({})
const menuPosition = ref({})
const activeIndex = ref(-1)
const colors = ref(defaultColors.backgroundColors)
const menuTop = ref(0)
const isActive = ref(false)
const { editor } = toRefs(props)

watch((editor), (newEditorValue) => {
  if (newEditorValue) {
    nextTick(() => {
      newEditorValue.registerPlugin(FloatingMenu({
        editor: newEditorValue,
        element: menuRef.value,
        onUpdate: menu => {
          isActive.value = menu.isActive
          menuTop.value = menu.top
        }
      }))
    })
  }
}, { immediate: true })

watch((isActive), (value) => {
  activeIndex.value = -1

  if (value && isMobile.value) {
    setTimeout(() => {
      menuRef.value.scrollIntoView(false)
    }, 300)
  }
})

onMounted(() => {
  window.addEventListener('keydown', arrowNavigation)
})

onBeforeUpdate(() => {
  buttonsRef.value = []
})

onUnmounted(() => {
  window.removeEventListener('keydown', arrowNavigation)
})

function arrowNavigation (e) {
  if (isActive.value) {
    if (e.keyCode === 37) {
      e.preventDefault()
      if (activeIndex.value > 0) activeIndex.value--
      else activeIndex.value = 10
    }
    if (e.keyCode === 39) {
      e.preventDefault()
      if (activeIndex.value < 10) activeIndex.value++
      else activeIndex.value = 0
    }
    if (e.keyCode === 13 && activeIndex.value >= 0) {
      e.preventDefault()
      editor.value.chain().focus().undo().run()
      buttonsRef.value[activeIndex.value].$el.click()
    }
  }
}

function closeBlockColorPicker () {
  showBlockColorPicker.value = false
  showMoreMenu.value = false
  hideYoutubeInput()
}

function removeBlockColor () {
  showBlockColorPicker.value = false
  editor.value.chain().focus().setColorBlock().run()
}

function applyBlockColor (color) {
  showBlockColorPicker.value = false
  editor.value.chain().focus().setColorBlock({ style: `background-color: ${color}` }).run()
}

function openImageUploader () {
  inputRef.value.click()
}

async function uploadImage (event: Event) {
  const allFiles = (event.target as HTMLInputElement).files

  const attachments = Array.from(allFiles)

  if (attachments.length === 0) return

  const result = await imageUpload.upload(attachments)

  result.forEach(item => {
    const isImage = (/image/i).test(item.mimeType)

    if (isImage) {
      editor.value.chain().focus().setImage(item).run()
    } else {
      editor.value.chain().focus().setFile(item).run()
    }
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  event.target.value = ''
}

function openBlockColorPicker () {
  showBlockColorPicker.value = !showBlockColorPicker.value
  showMoreMenu.value = false

  nextTick(() => {
    blockColorPosition.value = getPosition(menuRef.value, colorRef.value, buttonsRef.value[6].$el)
  })
}

function openMoreMenu () {
  showMoreMenu.value = !showMoreMenu.value
  showBlockColorPicker.value = false

  nextTick(() => {
    menuPosition.value = getPosition(menuRef.value, menuMoreRef.value, buttonsRef.value[9].$el)
  })
}

function onUndo () {
  editor.value.chain().focus().undo().run()
  if (isMobile.value) {
    isActive.value = true
  }
}

function onRedo () {
  editor.value.chain().focus().redo().run()
  if (isMobile.value) isActive.value = true
}

function openGifPicker () {
  showGifPicker.value = !showGifPicker.value
  showMoreMenu.value = false

  setTimeout(() => {
    if (gifPickerRef.value) gifPickerRef.value.toggleInput()
  }, 100)
}

function insertGif (gif) {
  editor.value.chain().focus().setImage({
    id: null,
    url: gif
  }).run()

  closeGifPicker()
}

function closeGifPicker () {
  showGifPicker.value = false
}

function close () {
  isActive.value = false
  editor.value.chain().focus()
}

function toggleYoutubeInput () {
  showYoutubeInput.value = !showYoutubeInput.value
}

function setYoutubeLink () {
  if (youtubeLink.value.trim() !== '') {
    editor.value.commands.setYoutubeVideo({
      src: youtubeLink.value
    })

    hideYoutubeInput()
  }
}

function hideYoutubeInput () {
  youtubeLink.value = ''
  showYoutubeInput.value = false
}

defineExpose({
  closeBlockColorPicker
})
</script>
