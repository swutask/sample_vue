<template>
  <div
    id="menububble"
    ref="menuRef"
    class="flex absolute h-38 max-w-calc-50 z-9999 mb-8 menububble"
    :class="[{ 'is-active': showToolbar }, commentIsActive ? '-z-1' : 'z-9999']"
    :style="menuPosition"
  >
    <div
      class="no-scroll-bar rounded-8 z-20 shadow-[0_0_0_1px_rgb(15,15,15,0.07),0_2px_4px_rgb(15,15,15,0.12)]
       flex opacity-90 hover:opacity-100 bg-primary"
    >
      <MenuButton
        class="text-12 font-black"
        tooltipText="Bold"
        tooltipClasses="text-13 px-10 py-7 rounded-8 z-9999 font-normal"
        :is-active="editor.isActive('bold')"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <i class="icon-bold align-middle" />
      </MenuButton>

      <MenuButton
        class="text-12 font-black"
        tooltipText="Italic"
        tooltipClasses="text-13 px-10 py-7 rounded-8 z-9999 font-normal"
        :is-active="editor.isActive('italic')"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <i class="icon-italic align-middle" />
      </MenuButton>

      <MenuButton
        class="text-12 border-r border-hover font-black"
        tooltipText="Underline"
        tooltipClasses="text-13 px-10 py-7 rounded-8 z-9999 font-normal"
        :is-active="editor.isActive('underline')"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <i class="icon-underline align-middle font-bold" />
      </MenuButton>

      <MenuButton
        class="text-13"
        tooltipText="Heading 1"
        :is-active="editor.isActive('heading', { level: 1 })"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        H1
      </MenuButton>

      <MenuButton
        class="text-13"
        tooltipText="Heading 2"
        :is-active="editor.isActive('heading', { level: 2 })"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        H2
      </MenuButton>

      <MenuButton
        tooltipText="Heading 3"
        class="text-13 border-r border-hover"
        :is-active="editor.isActive('heading', { level: 3 })"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        H3
      </MenuButton>

      <DropdownModule
        :width="235"
        class="w-full flex justify-center items-center"
        z-index="z-[1000]"
        :isTeleported="false"
        :preventCloseOnClick="true"
        background="bg-primary dark:bg-grey-110"
      >
        <template #button>
          <MenuButton
            ref="linkBtnRef"
            class="flex justify-center items-center relative py-4"
            tooltipText="Add link"
            :is-active="editor.isActive('link') || linkMenuIsActive"
            @click="toggleLinkMenu"
          >
            <i class="icon-link text-15" />
          </MenuButton>
        </template>
        <div v-show="linkMenuIsActive" class="shadow-dropdown rounded-10">
          <form class="flex items-center rounded-none" @submit.prevent="toggleLinkUrl(linkUrl)">
            <input
              ref="linkInputRef"
              v-model="linkUrl"
              class="py-8 px-20 outline-none lowercase h-40 bg-primary text-app-color rounded-10"
              type="text"
              placeholder="https://"
              @keydown.esc="hideLinkMenu"
            >
            <button
              v-if="editor.isActive('link')"
              class="text-13 text-grey-300 w-40 h-40 bg-primary rounded-r-4"
              type="button"
              @click="toggleLinkUrl(null)"
            >
              <i class="icon-close" />
            </button>
          </form>
        </div>
      </DropdownModule>

      <MenuButton
        class="border-r border-hover pb-2"
        tooltipText="Comment"
        :is-active="editor.isActive('commentMark') || commentIsActive"
        @click="showComment"
      >
        <i class="icon-chat align-text-bottom text-15" />
      </MenuButton>

      <DropdownModule
        :width="235"
        class="w-full flex justify-center items-center"
        z-index="z-[9999]"
        background="bg-primary dark:bg-grey-110"
      >
        <template #button>
          <MenuButton
            ref="textColorBtnRef"
            tooltipText="Text color"
            class="border-r border-hover flex justify-center items-center relative py-4"
            :is-active="editor.isActive('textColor') || textColorIsActive"
            @click="showTextColor"
          >
            <i class="icon-format-color-text" />
          </MenuButton>
        </template>

        <div v-show="textColorIsActive" class="bg-primary rounded-10 shadow w-[235px]">
          <div class="cursor-default">
            <p class="tex-14 font-bold text-left text-app-color pl-10 pt-5">Pick a color</p>
            <div class="w-full flex flex-wrap m-5">
              <div
                v-for="(color, index) in colors.slice(0, 15)"
                :key="color + index"
                class="w-37 h-37 rounded-full mx-4 my-5 cursor-pointer flex"
                :style="`background-color: ${color}`"
                @click="applyTextColor(color)"
              >
                <i v-if="activeTextColor === color" class="icon-check mx-auto mt-6 text-22 text-white font-bold" />
              </div>
            </div>
            <div class="p-10 pt-0" @click.stop>
              <input
                v-model="textColor"
                type="text"
                class="text-app-color w-full px-16 py-8 rounded-4 bg-sidebar"
                placeholder="#0033A0"
                @click.stop @keypress.enter="applyTextColor(textColor)"
              >
            </div>
            <div
              v-if="editor.isActive('textColor')"
              class="flex items-center p-10 pt-0 text-12 text-app-color opacity-50
                 hover:opacity-100 cursor-pointer transition duration-50"
              @click.stop="removeTextColor"
            >
              <i class="icon-remove mr-5" />
              <p>Remove color</p>
            </div>
          </div>
        </div>
      </DropdownModule>

      <DropdownModule
        :width="235"
        class="w-full flex justify-center items-center"
        z-index="z-[9999]"
        background="bg-primary dark:bg-grey-110"
      >
        <template #button>
          <MenuButton
            class="flex justify-center items-center relative py-4"
            tooltipText="Marker"
            :is-active="editor.isActive('highlight') || backgroundColorIsActive"
            @click="showBackgroundColor"
          >
            <i class="icon-highlight text-16" />
          </MenuButton>
        </template>
        <div v-show="backgroundColorIsActive" class="cursor-default">
          <p class="tex-16 font-bold text-left text-app-color pl-10 pt-5">Pick a fill color</p>
          <div class="w-full flex flex-wrap m-5">
            <div
              v-for="(color, index) in backgroundColors.slice(0, 10)"
              :key="color + index"
              class="w-37 h-37 rounded-full mx-4 my-5 cursor-pointer flex"
              :style="`background-color: ${color}`"
              @click="applyBackgroundColor(color)"
            >
              <i v-if="activeBackgroundColor === color" class="icon-check mx-auto mt-6 text-22 text-white font-bold" />
            </div>
          </div>
          <div class="p-10 pt-0">
            <input
              v-model="backgroundColor"
              type="text"
              class="text-app-color w-full px-16 py-8 rounded-4 bg-sidebar"
              placeholder="#0033A0"
              @click.stop @keypress.enter="applyBackgroundColor(backgroundColor)"
            >
          </div>
          <div
            v-if="editor.isActive('highlight')"
            class="flex items-center p-10 pt-0 text-12 text-app-color opacity-50
                 hover:opacity-100 cursor-pointer transition duration-50"
            @click.stop="removeBackgroundColor"
          >
            <i class="icon-remove mr-5" />
            <p>Remove color</p>
          </div>
        </div>
      </DropdownModule>
    </div>

    <portal to="editor">
      <CommentForm
        v-if="commentIsActive"
        ref="commentRef"
        :key="Math.random()"
        :text="comment"
        :commentPosition="commentPosition"
        @setComment="setComment"
        @hideComment="hideComment"
      />
    </portal>
  </div>
</template>

<script setup lang="ts">
import { rgbToHex } from '@/core/helper-functions'
import { getMarkAttrs } from '@/tiptap/utils/getAttrs'
import MenuBubble from '@/tiptap/plugins/MenuBubble'
import defaultColors from '@/core/colors'
const props = defineProps<{
  editor: any
  isTableActive?: boolean
}>()

const emit = defineEmits(['isActive'])

const { user } = useProfile()
const { isMobile } = useGeneral()

const colors = defaultColors.colors
const backgroundColors = defaultColors.backgroundColors

const linkBtnRef = ref(null)
const linkInputRef = ref(null)
const linkUrl = ref(null)
const linkMenuIsActive = ref(false)

const comment = ref(null)
const commentPosition = ref('top: -100%; left: -100%')
const commentIsActive = ref(false)
const commentRef = ref(null)

const textColorBtnRef = ref(null)
const textColor = ref(null)
const activeTextColor = ref('')
const textColorIsActive = ref(false)

const backgroundColor = ref(null)
const activeBackgroundColor = ref(null)
const backgroundColorIsActive = ref(false)

const isActive = ref(false)

const menu = ref({
  top: 0,
  bottom: 0,
  left: 0
})
const menuRef = ref(null)

const editor = computed(() => props.editor)

const menuPosition = computed(() => {
  const left = isMobile.value ? 'left: 50%' : `left: ${menu.value.left - 190}px`
  const bottom = menu.value.top < 80 && menu.value.bottom > 85
    ? menu.value.bottom - 85
    : isMobile.value ? menu.value.bottom + 21 : menu.value.bottom
  return `${left}; bottom: ${bottom}px`
})
const showToolbar = computed(() => {
  return isActive.value &&
      (props.editor.isFocused || commentIsActive.value || textColorIsActive.value || backgroundColorIsActive.value || linkMenuIsActive.value)
})

watch(editor, () => {
  nextTick(() => {
    editor.value.registerPlugin(MenuBubble({
      editor: editor.value,
      element: menuRef.value,

      onUpdate: data => {
        isActive.value = data.isActive
        menu.value = data
      }
    }))
  })
}, { immediate: true })

watch(isActive, (value) => {
  emit('isActive', value)

  if (value && props.editor.isActive('link')) showLinkForm()

  if (!value) {
    comment.value = ''
    reset()
  }
})

function showLinkForm () {
  reset('link')
  const attrs = getMarkAttrs(props.editor.state, 'link')

  linkUrl.value = attrs.href

  linkMenuIsActive.value = true
  setTimeout(() => {
    linkInputRef.value?.focus()
  }, 100)
}

function toggleLinkMenu () {
  showLinkForm()
}

function hideLinkMenu () {
  linkUrl.value = 'https://'
  linkMenuIsActive.value = false
}

function parseUrl (url) {
  const splitUrl = url.split('://')
  if (splitUrl.length > 1) return url

  return `https://${url}`
}

function toggleLinkUrl (url) {
  if (url) {
    const href = parseUrl(url)
    props.editor.chain().focus().setLink({ href }).run()
  } else {
    props.editor.chain().focus().unsetLink().run()
  }

  hideLinkMenu()
}

function showComment () {
  reset('comment')

  const dataComment = getMarkAttrs(props.editor.state, 'commentMark')

  if (dataComment?.comments) {
    const comments = JSON.parse(dataComment.comments)
    comment.value = comments[0].text
  }

  commentIsActive.value = !commentIsActive.value

  getCommentPosition()

  if (commentIsActive.value) {
    setTimeout(() => {
      commentRef.value.setFocus()
    }, 100)
  }
}

function getCommentPosition () {
  const editorWrapper = document.getElementById('editor-wrapper')
  const editorRect = editorWrapper?.getBoundingClientRect()
  const pos = props.editor.state.selection.$from.pos
  const coords = props.editor.view.coordsAtPos(pos)
  const commentWidth = 270

  let left = coords.left - editorRect.x

  if (coords.left + commentWidth > window.innerWidth) {
    left = editorRect.right - commentWidth - editorRect.x
  }

  commentPosition.value = `left: ${left}px; top: ${coords.bottom - editorRect.y}px`
}

function hideComment () {
  comment.value = ''
  commentIsActive.value = false
}

function setComment (value) {
  const params = getMarkAttrs(props.editor.state, 'commentMark')

  if (value && !params?.comments) {
    createComment(value)
  } else if (value && params?.comments) {
    updateComment(value, params)
  } else if (params?.comments) {
    deleteComment()
  }

  comment.value = ''
  hideComment()
}

function createComment (value) {
  const comments = JSON.stringify([{
    id: 0,
    user: {
      id: user.value?.id,
      firstName: user.value?.profile?.firstName || 'Guest',
      lastName: user.value?.profile?.lastName || '',
      color: user.value?.profile?.color || 'Omolon'
    },
    date: new Date(),
    text: value.trim()
  }])

  props.editor.chain().focus().addComment({
    id: `${Date.now()}-${Math.random()}`,
    commentid: `${Date.now()}-${Math.random()}`,
    comments
  }).run()
}

function updateComment (value, params) {
  if (params?.comments) {
    const parsedData = JSON.parse(params.comments)
    const comments = parsedData.map(item => item.id === 0 ? { ...item, text: value } : item)

    props.editor.chain().focus().addComment({
      id: params.id,
      commentid: params.commentid,
      comments: JSON.stringify(comments)
    }).run()
  }
}

function deleteComment () {
  props.editor.chain().focus().removeComment().run()
}

function applyTextColor (color) {
  setTimeout(() => { textColorIsActive.value = false }, 100)
  textColor.value = ''
  const textcolor = getMarkAttrs(props.editor.state, 'textColor').color?.split(/\s/).join('')

  textcolor === color
    ? props.editor.chain().focus().unsetTextColor().run()
    : props.editor.chain().focus().setTextColor({ color }).run()
}

function applyBackgroundColor (color) {
  setTimeout(() => { backgroundColorIsActive.value = false }, 100)
  backgroundColor.value = ''
  const bgColor = getMarkAttrs(props.editor.state, 'highlight').color?.split(/\s/).join('')

  bgColor === color
    ? props.editor.chain().focus().unsetHighlight().run()
    : props.editor.chain().focus().setHighlight({ color }).run()
}

function showTextColor () {
  reset('textColor')

  if (textColorIsActive.value) {
    setTimeout(() => { textColorIsActive.value = !textColorIsActive.value }, 100)
  } else {
    textColorIsActive.value = !textColorIsActive.value
  }

  const color = getMarkAttrs(props.editor.state, 'textColor').color?.split(/\s/).join('')

  if (colors.every(item => item !== color)) {
    textColor.value = color
    activeTextColor.value = ''
  } else {
    textColor.value = ''
    activeTextColor.value = color
  }
}

function showBackgroundColor () {
  reset('backgroundColor')

  if (backgroundColorIsActive.value) {
    setTimeout(() => { backgroundColorIsActive.value = !backgroundColorIsActive.value }, 100)
  } else {
    backgroundColorIsActive.value = !backgroundColorIsActive.value
  }

  const bgColor = getMarkAttrs(props.editor.state, 'highlight').color?.split(/\s/).join('')

  if (backgroundColors.every(item => item !== bgColor)) {
    backgroundColor.value = rgbToHex(bgColor)
    activeBackgroundColor.value = ''
  } else {
    backgroundColor.value = ''
    activeBackgroundColor.value = bgColor
  }
}

function removeBackgroundColor () {
  backgroundColorIsActive.value = false
  backgroundColor.value = ''
  props.editor.chain().focus().unsetHighlight().run()
}

function removeTextColor () {
  textColorIsActive.value = false
  textColor.value = ''
  props.editor.chain().focus().unsetTextColor().run()
}

function reset (exclude?: string) {
  if (exclude !== 'comment') commentIsActive.value = false
  if (exclude !== 'link') linkMenuIsActive.value = false
  if (exclude !== 'textColor') textColorIsActive.value = false
  if (exclude !== 'backgroundColor') backgroundColorIsActive.value = false
}
</script>
