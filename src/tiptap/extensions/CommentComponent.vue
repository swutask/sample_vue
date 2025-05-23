<template>
  <span
    v-if="commentId"
    ref="commentRef"
    v-clickOutside="close"
    :contentid="commentId"
    class="absolute comment-content left-full font-Inter"
    @click.prevent="toggleComment"
  >
    <!-- ICON -->
    <span
      ref="iconRef"
      :style="iconPosition"
      class="icon-chat comment-icon flex text-app-color text-14 opacity-40 anim-all hover:opacity-100 cursor-pointer px-10 py-6 rounded-6"
      :class="showComment ? 'opacity-100 bg-menu-hover' : 'hover:bg-menu-hover'"
      @mouseover.stop.prevent="highlightComment(true)"
      @mouseleave.stop.prevent="highlightComment(false)"
    >
      <span class="font-Inter ml-3 comment-icon-counter">{{ comment.jsonComments.length }}</span>
    </span>

    <!-- Backdrop -->
    <transition name="fade">
      <div
        v-if="showComment && isMobile"
        class="fixed z-50 bg-backdrop w-full h-full flex top-0 left-0"
        @click="closeMobileModal"
      />
    </transition>

    <!-- MODAL -->
    <portal to="editor">
      <div
        v-show="showComment"
        ref="iconModalRef"
        :style="modalPosition"
        class="m-auto pt-15 w-full max-w-[320px] rounded-10 fixed md:absolute md:w-[370px] md:shadow z-9999 bg-primary"
        @click.stop
      >
        <div class="flex items-center justify-between mb-10 md:pl-20 px-15">
          <p class="font-bold text-17 text-app-color">Comments</p>

          <ButtonModule
            v-if="!hideBtnResolve"
            class="p-5"
            tooltipText="Resolved"
            tooltipTop
            teleportTooltip
            @click="remove(0)"
          >
            <i class="icon-radio_btn_checked text-green-10" />
          </ButtonModule>
        </div>

        <div ref="scrollToDownRef" class="max-h-[300px] overflow-auto">
          <commentItem
            v-for="item in comment.jsonComments"
            :key="item.id"
            class="md:pl-20 px-15"
            :comment="item"
            :user="item.user"
            @update="update"
            @remove="remove(item.id)"
          />
        </div>
        <div class="border-t border-hover flex items-start justify-between py-15 md:pl-20 px-15">
          <div class="my-auto flex mr-10">
            <UserBadge
              :first-name="userObject.profile.firstName"
              :last-name="userObject.profile?.lastName"
              :color="userObject.profile.color"
              :avatarUrl="userObject.avatar?.url"
              :size="30"
              :showName="false"
              class="mr-10"
            />
            <ExpandedTextarea>
              <textarea
                ref="textareaRef"
                v-model="newComment"
                maxlength="255"
                style="min-height: 28px"
                rows="1"
                placeholder="Type here..."
                class="no-border w-full outline-none bg-transparent text-app-color font-normal-important no-resize text-15"
                @keydown.enter.exact.prevent.stop="add"
              />
            </ExpandedTextarea>
          </div>

          <ButtonModule
            text="Comment"
            type="black"
            class="text-14 w-full font-semibold max-w-[75px]
             justify-center py-6 px-20 md:hover:opacity-80"
            @click="add"
          />
        </div>
      </div>
    </portal>
  </span>
</template>

<script setup lang="ts">
import commentItem from '@/tiptap/extensions/commentItem.vue'

const props = defineProps<{
  editor: any
  comment: any
}>()

const { user } = useProfile()
const { isMobile } = useGeneral()
const { share } = useProject()
const route = useRoute()

const iconRef = ref(null)
const commentRef = ref(null)
const textareaRef = ref(null)
const iconModalRef = ref(null)
const scrollToDownRef = ref(null)

const newComment = ref('')
const showComment = ref(false)
const iconPosition = ref('right: 0px')
const modalPosition = ref('top: -100%; left: -100%')

const userObject = computed(() => {
  if (route.name === 'Share') return { profile: { firstName: 'Guest', color: 'Omolon', lastName: '' }, avatar: null }
  return user.value
})

const commentId = computed(() => {
  return props.comment?.id || null
})

const hideBtnResolve = computed(() => {
  return route.name === 'Share' && share.value?.mode === 'read'
})

watch(() => props.comment, () => scrollToElement())

onMounted(() => {
  nextTick(() => {
    setIconPosition()

    setTimeout(() => setIconPosition(), 1000)
  })
})

function highlightComment (value) {
  const comment = document.querySelector(`span[commentid="${props.comment.id}"]`)

  if (value) {
    comment.classList.add('highlight')
  } else {
    comment.classList.remove('highlight')
  }
}

function scrollToElement () {
  nextTick(() => {
    if (scrollToDownRef.value) {
      scrollToDownRef.value.scrollTop = scrollToDownRef.value.scrollHeight
    }
  })
}

function setIconPosition () {
  const mark = document.getElementById(props.comment.id)
  if (!mark) return
  const markRect = mark.getBoundingClientRect()
  const editor = document.getElementById('editor-wrapper')
  const editorRect = editor?.getBoundingClientRect()
  const gap = isMobile.value ? 44 : 60

  const coords = iconRef.value.getBoundingClientRect()
  let right = 'right: 0px'

  if (window.innerWidth - coords.right > 40) {
    right = iconPosition.value = isMobile.value ? 'right: -30px' : 'right: -40px'
  }

  iconPosition.value = `${right}; top: ${markRect.top - editorRect.top - gap}px`
}

function setModalPosition () {
  const editor = document.getElementById('editor-wrapper')
  const editorRect = editor?.getBoundingClientRect()
  const iconRect = iconRef.value.getBoundingClientRect()
  const iconModal = iconModalRef.value.getBoundingClientRect()

  let top = iconRect.top - editorRect.y - iconModal.height - 10

  if (top < 0) {
    top = iconRect.top - editorRect.y + 20
  }

  modalPosition.value = `left: ${iconRect.right - iconModal.width - editorRect.x}px; top: ${top}px`
}

function toggleComment () {
  showComment.value = !showComment.value

  props.editor.chain().blur()
  scrollToElement()
  setTimeout(() => {
    if (showComment.value) {
      if (isMobile.value) {
        modalPosition.value = 'left: 50%; top: 50%; transform: translate(-50%, -50%);'
      } else {
        setModalPosition()
      }

      setTimeout(() => {
        textareaRef.value.focus()
      }, 100)
    }
  }, 200)
}

function close () {
  modalPosition.value = 'top: -100%; left: -100%'
  showComment.value = false
}

function closeMobileModal () {
  showComment.value = false

  props.editor.chain().blur()
}

function add () {
  if (newComment.value.trim() === '') return

  const comments = props.comment.jsonComments

  comments.push({
    id: comments.length,
    user: {
      id: user.value?.id,
      firstName: user.value?.profile?.firstName || 'Guest',
      lastName: user.value?.profile?.lastName || '',
      color: user.value?.profile?.color || 'Omolon'
    },
    date: new Date(),
    text: newComment.value.trim()
  })

  newComment.value = ''
  updateComment(comments)
  scrollToElement()
}

function update ({ id, text }) {
  const comments = props.comment.jsonComments.map((item) => item.id === id ? { ...item, text } : item)

  updateComment(comments)
}

function remove (id) {
  if (route.name === 'Share' && share.value?.mode === 'read') return

  if (id === 0) {
    return props.editor.chain().focus().removeComment({
      from: props.comment.from,
      to: props.comment.to
    }).run()
  }

  const comments = props.comment.jsonComments.filter((item) => item.id !== id)

  updateComment(comments)
}

function updateComment (comments) {
  const attrs = {
    id: props.comment.id,
    commentid: props.comment.id,
    comments: JSON.stringify(comments)
  }

  props.editor.chain().focus().updateComment({
    from: props.comment.from,
    to: props.comment.to,
    attrs
  }).run()

  setTimeout(() => {
    textareaRef.value?.focus()
  }, 200)
}

defineExpose({
  setIconPosition
})
</script>
