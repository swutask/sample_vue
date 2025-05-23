<template>
  <div
    v-if="editor"
    class="h-full workspace"
  >
    <div
      id="editor-wrapper"
      class="editor pt-[60px] pr-20 md:pr-25 md:pl-0 pb-10 mx-auto min-h-full rounded-9 flex-grow flex flex-col bg-canvas"
      :style="maxWidth"
      @click="closeBlockColorPicker"
    >
      <MenuFloating
        v-show="allowEdit"
        ref="menuFloatingRef"
        :editor="editor"
        :projectId="project.id"
        :bookId="project.bookId"
      />

      <MenuBubble
        v-show="allowEdit"
        :editor="editor"
        :is-table-active="!!isTableActive"
        :project="project"
      />

      <TitleEditor
        ref="titleInputRef"
        :key="project.id"
        :content="currentProject.title"
        :pageId="project.id"
        :bookId="project.bookId"
        :disabled="isClient"
        editorClass="page-editor-class"
        :allowEmpty="false"
        :class="isNewPageCreated ? 'text-grey-275' : 'text-canvas-color'"
        class="page-title bg-transparent text-37 ! title-editor mb-3"
        style="--title-editor-placeholder: 'Your title'"
        isOneLineTitle
        isPageTitle
        hasEnterHandler
        @onUpdate="updateProject"
        @onEnter="focusMainEditor"
      />

      <div class="flex flex-col relative">
        <CustomEditorContent
          id="editor"
          data-onboarding-id="onboardingPageContent"
          autocomplete="new password"
          autocorrect="off"
          autocapitalize="on"
          :spellcheck="isGrammarCheck"
          :style="lineHeight"
          class="editor__content h-full font-main text-canvas-color text-main flex flex-col flex-grow"
          :class="[settings.fontFamily === 'Silka mono' ? 'silka-font' : 'tracking-normal']"
          :editor="editor"
        />

        <button
          v-if="showTemplateButton && hasTemplates && allowEdit && !isClient"
          class="absolute z-10 left-20 px-20 py-7 rounded-5 font-medium text-dark-default top-[50px]
               text-14 bg-grey-500 anim-opacity opacity-70 hover:opacity-100"
          @click="openTemplateModal"
        >
          + Templates
        </button>
      </div>

      <CommentComponent
        v-for="(comment, index) in allComments"
        :ref="el => projectCommentRefs[index] = el"
        :key="comment.id"
        :comment="comment"
        :editor="editor"
      />

      <TableControls
        v-if="!!isTableActive"
        :key="activeTable"
        :style="{ top: `${ tableTop }px` }"
        :editor="editor"
        :activeTable="activeTable"
      />

      <TemplateModal :editor="editor" />

      <portal-target name="editor" multiple />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CollaborationExtension } from '@/tiptap/extensions/Collaboration'
import { CollaborationCursor } from '@/tiptap/extensions/CollaborationCursor'

import CommentComponent from '@/tiptap/extensions/CommentComponent.vue'

import * as Y from 'yjs'

import MentionMixin from '@/mixins/MentionMixin'
import EmojiMixin from '@/mixins/EmojiMixin.js'
import ImageUploadMixin from '@/mixins/ImageUploadMixin.js'

import designConfig from '@/core/design-config'
import { countWords, unselectText, removeHTMLTags } from '@/core/helper-functions'

const editorLoader = () => import(/* chunkName: editor */ '@tiptap/vue-3')
const extensionsLoader = () => import(/* chunkName: tip-tap extension */ '@/tiptap/extensions')

const props = defineProps<{
  project: IProject
  bookId: number
  allowEdit?: boolean
  isShared?: boolean
}>()

const emits = defineEmits(['onEnter'])

const route = useRoute()
const { files } = useFile()
const {
  settings,
  isGrammarCheck,
  updateHeader
} = useSettings()
const { book } = useBook()
const { user, isClient } = useProfile()
const { hasTemplates, changeTemplateState, toggleTemplateAside, toggleTemplateModal } = useTemplate()
const { highlightedText, isMobile, setHighlightedText, setNotification } = useGeneral()
const {
  share,
  isTableActive,
  setWordsCount,
  setCharactersCount,
  setTableActive,
  setProjectContent,
  currentProject,
  editProject,
  setCurrentProject,
  isNewPageCreated
} = useProject()

// mixins
const mention = MentionMixin({
  projectId: props.project.id,
  bookId: props.bookId
})

const emoji = EmojiMixin()
const imageUpload = ImageUploadMixin({
  ...props,
  projectId: props.project.id
})

// data
const allComments = ref([])
const showTemplateButton = ref(false)
const isFocusedEditor = ref(false)
let scrollPosition = window.pageYOffset
let scrollTimer = null
// table
const activeTable = ref(null)
const tableTop = ref(0)
// editor
const editorKey = ref(1)
// refs
const menuFloatingRef = ref(null)
const titleInputRef = ref()
const projectCommentRefs = ref([])
// computed
const maxWidth = computed(() => `max-width: ${designConfig.columns[settings.value?.columnWidth]}px`)
const lineHeight = computed(() => `line-height: ${designConfig.lineHeights[settings.value?.lineHeight]}`)
const isSharePage = computed(() => route.name === 'Share')
const projectId = computed(() => +route.query.page)

// editor
const ydoc = new Y.Doc()
const provider = ref()
const editor = ref()

// watch
watch(() => props.allowEdit, (value) => {
  if (isClient.value) return
  editor.value.setOptions({
    editable: value
  })
})

watch(() => projectId.value, () => {
  setTimeout(() => {
    if (!props.isShared) {
      titleInputRef.value?.focus()
    }
    checkTemplateButton()
  }, 1000)
}, { immediate: true })

watch(isGrammarCheck, () => (editorKey.value = Math.random())) // update the editor after a spell check changing

watch([
  () => route.query.highlight,
  () => highlightedText.value
], value => {
  if (value) {
    setTimeout(() => scrollToHighlightedText(), 300)
  }
})

onMounted(async () => {
  try {
    let res = null

    if (isSharePage.value) {
      res = await collaborationService.getJWTForSharedProject(props.project.id, share.value.id)
    } else {
      res = await collaborationService.getJWTForProject(props.project.id, props.bookId)
    }

    if (!res?.data?.jwt) {
      throw new Error('')
    }

    provider.value = new TiptapCollabProvider({
      name: res.data?.name || `book-${props.bookId}-project-${props.project.id}`,
      appId: import.meta.env.VITE_APP_TIPTAP_APP_ID,
      token: res.data.jwt,
      document: ydoc
    })

    const { Editor } = await editorLoader()
    const { defaultExtensions } = await extensionsLoader()

    const defExtensions = await defaultExtensions({
      highlight: {
        multicolor: true
      },
      dropcursor: {
        color: 'rgb(var(--color-link-color))',
        width: 2
      },
      mention: {
        suggestion: mention
      },
      taskItem: {
        nested: true
      },
      emoji: {
        suggestion: emoji
      },
      image: {
        uploadFunc: imageUpload.upload
      }
    })

    editor.value = new Editor({
      onFocus: () => {
        onBlurFocusCheckTemplate()
      },
      onBlur: () => {
        onBlurFocusCheckTemplate(false)
      },
      onUpdate: ({ transaction }) => {
        setWordsCount(countWords(transaction.doc))
        setCharactersCount(transaction.doc.textContent.length)
        tableTopPosition()
        checkTemplateButton()
        findCommentsAndStoreValues()
        setContentToCurrentProject()
        projectCommentRefs.value?.forEach((item) => item?.setIconPosition())
      },
      onCreate: () => {
        checkTemplateButton()
        findCommentsAndStoreValues()
        setTimeout(() => {
          setContentToCurrentProject()
        }, 500)
      },
      onSelectionUpdate: () => {
        checkTemplateButton()
      },
      extensions: [
        ...defExtensions,
        CollaborationExtension.configure({
          document: ydoc
        }),
        CollaborationCursor.configure({
          provider: provider.value,
          user: {
            name: user.value?.profile.firstName || 'Guest',
            userColor: user.value?.profile.color,
            avatar: user.value?.avatar?.url
          }
        })
      ],
      // disablePasteRules: ['italic'], // enablePasteRules
      editable: props.allowEdit && !isClient.value
    })

    if (!editor.value.storage.collabHistory?.versioningEnabled) {
      ydoc.getMap<number>(
        '__tiptapcollab__config'
      ).set('autoVersioning', 1)
    }

    nextTick(() => {
      const main = document.getElementById('main')
      main.addEventListener('scroll', handleScroll)
    })
    // setWordsCount(countWords(editor.value?.state?.tr.doc))
    // setCharactersCount(editor.value?.state?.tr.doc.textContent.length)

    setTimeout(() => {
      scrollToHighlightedText()
    }, 500)

    document.ondrop = () => unselectText()
  } catch (error) {
    setNotification({
      uuid: window.crypto.randomUUID(),
      message: 'Something went wrong. Please, try again'
    })
  }
})

watch(isTableActive, (active) => {
  if (active) {
    tableTopPosition()
  }
})

onBeforeUnmount(async () => {
  editor.value?.destroy()
  provider.value?.destroy()
  const main = document.getElementById('main')
  main.removeEventListener('scroll', handleScroll)
  setTableActive(false)
})

onBeforeRouteLeave(() => {
  return checkFileUpload()
})

onBeforeRouteUpdate(() => {
  return checkFileUpload()
})

onBeforeUpdate(() => {
  projectCommentRefs.value = []
})

function setContentToCurrentProject () {
  setProjectContent(editor.value.getHTML())
}

function onBlurFocusCheckTemplate (isFocused = true) {
  setTimeout(() => {
    isFocusedEditor.value = isFocused
    checkTemplateButton()
  }, 200)
}

function scrollToHighlightedText () {
  if (route.query.highlight && editor) {
    editor.value.commands.setSearchTerm(highlightedText.value)

    const el = document.getElementsByClassName('search-result')[0]
    if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' })

    setTimeout(() => {
      editor.value.commands.setSearchTerm('')
      setHighlightedText('')
    }, 4000)
  }
}

function checkFileUpload () {
  if (Object.values(files.value).some(item => item?.percent >= 0 && item.bookId === props.bookId)) {
    setNotification({
      uuid: window.crypto.randomUUID(),
      message: 'Your file is still uploading, please wait for it to finish'
    })
    return false
  }

  return true
}

const updateProject = (value: string) => {
  if (isClient.value) return

  if (isNewPageCreated.value) {
    titleInputRef.value?.clearContent()
  }

  const text = isNewPageCreated.value ? `<p>${removeHTMLTags(value)[0]}</p>` : value

  editProject({
    id: currentProject.value.id,
    data: {
      title: text
    }
  })

  setCurrentProject({ ...currentProject.value, title: text })

  if (text && !props.isShared) {
    book.value.projects = book.value.projects.map(project => {
      if (currentProject.value?.id === project.id) {
        return {
          ...project,
          title: text
        }
      }
      return {
        ...project
      }
    })
  }

  if (isNewPageCreated.value) {
    emits('onEnter')
  }
}

function checkTemplateButton () {
  const { content } = editor.value.getJSON()
  const allParagraphs = content?.filter(item => item.type === 'paragraph')

  showTemplateButton.value = editor.value.state.doc.textContent.trim() === '' &&
    allParagraphs.length < 2 &&
    !allParagraphs[0]?.content && !isFocusedEditor.value
}

function handleScroll () {
  clearTimeout(scrollTimer)
  const main = document.getElementById('main')
  const currentScrollPos = main.scrollTop

  if (isMobile.value) {
    // stop scrolling
    scrollTimer = setTimeout(() => {
      updateHeader(true)
    }, 400)

    if (scrollPosition > currentScrollPos) {
      updateHeader(true)
    } else {
      updateHeader(main.scrollTop < 70)
    }
    scrollPosition = currentScrollPos
  } else {
    updateHeader(true)
  }
}

function tableTopPosition () {
  if (isTableActive.value) {
    activeTable.value = document.querySelector('.tableWrapper.activeTable table')

    if (!activeTable.value) return

    if (isMobile.value) {
      tableTop.value = (activeTable.value.getBoundingClientRect().bottom - 50) + window.pageYOffset
    } else {
      const main = document.getElementById('main')
      tableTop.value = (activeTable.value.getBoundingClientRect().bottom - 75) + main.scrollTop
    }
  }
}

function closeBlockColorPicker () {
  if (menuFloatingRef.value) menuFloatingRef.value.closeBlockColorPicker()
}

function openTemplateModal () {
  if (route.name !== 'Share') {
    changeTemplateState('All')
    toggleTemplateModal(true)
    toggleTemplateAside(false)
  }
}

function findCommentsAndStoreValues () {
  const tempComments = []

  editor.value.state.doc.descendants((node, pos) => {
    const { marks } = node

    marks.forEach((mark) => {
      // clear old comments
      if (mark.attrs.commentid && !mark.attrs.comments) {
        editor.value.chain().focus().removeComment({
          from: pos,
          to: pos + (node.text?.length || 0)
        }).run()
      }

      // get all comments
      if (mark.type.name === 'commentMark') {
        const jsonComments = mark.attrs.comments ? JSON.parse(mark.attrs.comments) : null

        if (jsonComments !== null) {
          tempComments.push({
            node,
            jsonComments,
            from: pos,
            to: pos + (node.text?.length || 0),
            text: node.text,
            id: mark.attrs.commentid
          })
        }
      }
    })
  })

  if (tempComments.length === 0) projectCommentRefs.value = []

  allComments.value = tempComments
}

function focusMainEditor () {
  editor.value.chain().focus()
  checkTemplateButton()
  emits('onEnter')
}
</script>
