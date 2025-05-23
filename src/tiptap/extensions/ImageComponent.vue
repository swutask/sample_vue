<template>
  <NodeViewWrapper
    ref="outerRef"
    v-clickOutside="close"
    as="span"
    type="image"
    :style="`${node.attrs.style}`"
    contenteditable="false"
    class="select-none cursor-pointer font-Inter relative inline-block leading-0 min-w-[100px] max-w-[98%] align-text-bottom group-scope"
    :class="{'w-[200px] h-[100px]': !imageLoaded, 'pl-10': isShadow}"
    data-drag-handle
    draggable="true"
    @mousedown.passive="hideBubbleMenu"
    @touchstart.passive="hideBubbleMenu"
    @mouseup="removeGrabbingCursor"
    @dblclick.stop="openImageModal"
  >
    <LoadingModule
      :loading="status > 0"
      class="absolute z-50 w-[200px] h-[100px]"
    />

    <i
      class="icon-drag drag-icon !-left-20 mt-1 md:opacity-0 group-scope-hover:opacity-100"
      data-drag-handle
      draggable="true"
      contenteditable="false"
    />

    <div class="relative mr-10 rounded-8" :class="node.attrs.class">
      <div
        v-if="active"
        class="absolute opacity-70 hover:opacity-90 top-10 right-10 flex items-center z-20"
      >
        <ImageMore
          v-if="editor.isEditable"
          contenteditable="false"
          :node="node"
          :editor="editor"
          :isLinkMenuActive="linkMenuIsActive"
          :isCommentActive="isCommentActive"
          :imageWidth="imageWidth"
          :nodePos="nodePos"
          @setComment="setComment"
          @toggle-box-shadow="toggleImageBoxShadow"
          @toggle-link-menu="$event => linkMenuIsActive = $event"
          @toggle-comment-menu="toggleComment"
        />
      </div>

      <!-- G O  T O  L I N K  B U T T O N -->
      <div v-if="node.attrs.imageLink" class="z-10 absolute right-30 bottom-30">
        <ButtonModule
          text="Follow link"
          class="bg-primary rounded-full !text-14 px-14 py-6 shadow text-grey-main"
          prefix="icon-link text-14"
          has-hover
          button-opacity="70"
          @click.stop="openLink"
        />
      </div>

      <span
        v-if="active"
        contenteditable="false"
        class="resizer select-none z-10"
        @mousedown.prevent="onMouseDown"
        @touchstart.prevent.stop.passive="touchStart"
        @touchend.prevent.stop.passive="touchEnd"
        @touchmove.passive.stop="touchMove"
      >
        <span class="resizer__bar shadow-[2px_0px_8px_#444] select-none" />
      </span>

      <div
        class="absolute w-full h-full z-5 transition-bg duration-50 ease-in-out rounded-8"
        :class="{'image-active': active}"
        @click="toggleActive"
      />

      <NodeViewContent
        v-if="status < 0"
        :id="`${node.attrs.id}`"

        as="img"
        class="select-none rounded-8"
        contenteditable="true"
        :src="`${node.attrs.src}?t=${new Date().getTime()}`"
        style="width: 100%;"
        @load="imageOnLoad"
      />

      <CommentCount v-if="countMessages > 0" :countMessages="countMessages" customStyling="absolute top-7 right-10" />
    </div>

    <PreviewAttachment
      v-if="isPreviewMode"
      :file="localAtt"
      :hideDeleteButton="(isSharePage && share?.mode === 'read')"
      :disableComments="isSharePage"
      @close="closePreview"
      @delete="deleteAttachment"
    />
  </NodeViewWrapper>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { Selection } from 'prosemirror-state'

import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-3'

import { attachmentService } from '@/pages/file-manager/attachment.service'

import ImageMore from '@/components/image/ImageMore.vue'
import ButtonModule from '@/components/shared/form-controls/ButtonModule.vue'
import LoadingModule from '@/components/shared/LoadingModule.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    ImageMore,
    ButtonModule,
    LoadingModule,
    NodeViewWrapper,
    NodeViewContent
  },

  props: nodeViewProps,

  setup (props) {
    const { files } = useFile()
    const { getAttachmentsById, getAttachmentsBySharedId, localAttachment, attachments } = useAttachment()
    const { isMobile, isAttachmentPreview, toggleBookLoading, setNotification } = useGeneral()
    const { share, currentProject } = useProject()
    const { user } = useProfile()
    const route = useRoute()
    const router = useRouter()

    const outerRef = ref(null)
    const commentRef = ref(null)
    const imageModalRef = ref(null)
    const isPreviewMode = ref(false)
    const localAtt = computed(() => localAttachment.value.find(e => e.id === props.node.attrs.id))

    const countMessages = computed(() => {
      const attachment = attachments.value.find(e => e.id === props.node.attrs.id)
      const hasSubversions = attachment?.subversion?.length
      return hasSubversions ? +attachment.subversionMessageCount : +attachment?.chat?.messageCount
    })

    const active = ref(false)
    const x = ref(0)
    const width = ref(0)
    const imageLoaded = ref(false)
    const editorWidth = ref(null)
    const linkMenuIsActive = ref(false)
    const isCommentActive = ref(false)
    const isModalMenuLinkActive = ref(false)
    const isModalMenuCommentActive = ref(false)
    const imageWidth = ref(0)

    const isTaskBoardPage = computed(() => route.name === 'TaskBoard' || route.name === 'TaskBoardTeam')

    const status = ref(props.node.attrs.percent)

    const isShadow = computed(() => {
      return props.node &&
      props.node.attrs &&
      props.node.attrs.class &&
      props.node.attrs.class.includes('shadow-smooth')
    })

    const nodePos = computed(() => props.getPos())

    const comments = computed(() => {
      if (typeof props.node.attrs?.imageComment !== 'string') return []
      return JSON.parse(props.node.attrs.imageComment)
    })

    const isSharePage = computed(() => route.name === 'Share')
    // watch((isMobile), () => setMinWidth())

    watch((active), (isActive) => {
      if (isActive && (
        !linkMenuIsActive.value ||
          !isCommentActive.value ||
          !isModalMenuLinkActive.value ||
          !isModalMenuCommentActive.value
      )) {
        document.addEventListener('keydown', initListeners)
      } else {
        document.removeEventListener('keydown', initListeners)
      }
    }, { immediate: true })

    watch(files, value => {
      setTimeout(() => {
        const percent = value[props.node.attrs.id]?.percent || -1
        if (isSharePage.value || +route.query.page === currentProject.value?.id || isTaskBoardPage.value) {
          props.updateAttributes({ percent }, props.getPos())
        }
        status.value = percent
      }, 50)
    }, {
      deep: true,
      immediate: true
    })

    watch([linkMenuIsActive, isCommentActive, isModalMenuLinkActive, isModalMenuCommentActive], (value) => keyDownListener(value))

    onMounted(async () => {
      document.addEventListener('dragleave', removeGrabbingCursor)
      document.addEventListener('drop', resizeImagesOnDrop)

      nextTick(() => {
        editorWidth.value = document.getElementById('editor')?.getBoundingClientRect()?.width
      })

      if (route.query?.fileId) {
        await getAttachmentsById({
          id: route.query.fileId,
          taskId: route.query.taskId,
          projectId: route.query.page
        })

        const query = Object.assign({}, route.query)
        delete query.fileId

        router.replace({ query })

        isAttachmentPreview.value = true
        isPreviewMode.value = true
      }
    })

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', initListeners)
      document.removeEventListener('dragleave', removeGrabbingCursor)
      document.removeEventListener('drop', resizeImagesOnDrop)
    })

    function onDragStart () {
      document.body.classList.add('grabbing')
    }

    function onDragEnd () {
      document.body.classList.remove('grabbing')
    }

    async function openImageModal () {
      if (isSharePage.value) {
        await getAttachmentsBySharedId({
          id: props.node.attrs.id,
          shareId: share.value?.id,
          projectId: share.value.projectId
        })
      } else {
        await getAttachmentsById({
          id: props.node.attrs.id,
          taskId: route.query.taskId,
          projectId: route.query.page
        })
      }

      isAttachmentPreview.value = true
      isPreviewMode.value = true
    }

    function removeGrabbingCursor () {
      onDragEnd()
    }

    function toggleComment (value) {
      if (props.node.attrs.imageComment) {
        commentRef.value.toggleComment()
      } else {
        isCommentActive.value = value
      }
    }

    function resizeImagesOnDrop () {
      onDragEnd()

      const { view } = props.editor

      if (!view.editable) {
        return
      }

      const $pos = props.editor.state.selection.$anchor
      const from = $pos.pos - $pos.parentOffset
      const images = []

      view.state.doc.nodesBetween(from, $pos.pos + 2, (node, pos) => {
        if (node.type.name === 'image') {
          images.push({
            node,
            pos
          })
        }
      })

      if (images.length > 1) {
        const width = `${Math.floor(100 / images.length)}%`

        images.forEach(item => {
          props.updateAttributes({
            id: item.node.attrs.id,
            style: `width: ${width};`,
            imageComment: item.node.attrs.imageComment,
            imageLink: item.node.attrs.imageLink,
            class: (typeof item.node.attrs.class === 'string') && item.node.attrs.class?.includes('shadow-smooth') ? 'shadow-smooth' : '',
            isChatEditor: props.editor.contentComponent?.attrs?.id === 'editor_chat'
          }, item.pos)
        })
      }

      // removeGrabbingCursor()
    }

    function keyDownListener (isActive) {
      if (isActive) {
        document.removeEventListener('keydown', initListeners)
      } else {
        document.addEventListener('keydown', initListeners)
      }
    }

    function imageOnLoad () {
      imageLoaded.value = true
      convertWidth()
      setMinWidth()
    }

    // touch
    function touchStart (e) {
      onDragEnd()
      const touch = e.touches[0]
      setDefaultValues(touch)
    }

    function touchMove (e) {
      removeGrabbingCursor()
      const touch = e.touches[0]
      resize(touch)
    }

    function touchEnd () {
      const outer = outerRef.value?.$el
      save(outer.style.width)
      onDragEnd()
    }
    // mouse
    function onMouseDown (e) {
      onDragEnd()
      setDefaultValues(e)

      const onMouseMove = (e) => {
        resize(e)
      }

      const onMouseUp = (e) => {
        e.preventDefault()
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)

        const outer = outerRef.value?.$el
        save(outer.style.width)
        onDragEnd()
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }

    function save (width) {
      props.updateAttributes({
        id: props.node.attrs.id,
        src: props.node.attrs.src,
        style: `width: ${width};`,
        imageComment: props.node.attrs.imageComment,
        imageLink: props.node.attrs.imageLink,
        class: (typeof props.node.attrs.class === 'string') && props.node.attrs.class?.includes('shadow-smooth') ? 'shadow-smooth' : '',
        isChatEditor: props.editor.contentComponent?.attrs?.id === 'editor_chat'
      }, nodePos.value)
    }

    function resize (e) {
      const outer = outerRef.value?.$el
      const diffInPx = parseInt(width.value) + (e.clientX - x.value)
      imageWidth.value = diffInPx
      let newWidth = outer.style.width

      if (diffInPx < 130) {
        newWidth = `${(130 / editorWidth.value * 100).toFixed()}%`
      } else if (diffInPx > editorWidth.value) {
        newWidth = '100%'
      } else {
        newWidth = `${(diffInPx / editorWidth.value * 100).toFixed()}%`
      }
      save(newWidth)
    }

    function setDefaultValues (e) {
      const outer = outerRef.value?.$el
      x.value = e.clientX
      editorWidth.value = document.getElementById('editor')?.getBoundingClientRect()?.width
      width.value = parseInt(outer.style.width) * editorWidth.value / 100
    }

    function convertWidth () {
      // convert width from px to percent
      // when uploading an image, width = 200 pixels
      const imageWidth = parseInt(outerRef.value?.$el?.style?.width)

      // TODO: investigate if this code is needed

      // if (props.editor.contentComponent?.attrs?.id === 'editor_chat') {
      //   save('100%')
      // } else {
      //   if (imageWidth > 100) {
      //     const width = `${(imageWidth / editorWidth.value * 100).toFixed()}%`
      //     save(width)
      //   }
      // }
      if (imageWidth > 100) {
        const width = `${(imageWidth / editorWidth.value * 100).toFixed()}%`
        save(width)
      }
    }

    function setMinWidth () {
      if (outerRef.value?.$el) {
        const defaultWidth = outerRef.value?.$el.getBoundingClientRect().width
        const editorWidth = document.getElementById('editor').getBoundingClientRect().width
        if (defaultWidth <= 130) {
          const width = `${(130 / editorWidth * 100).toFixed()}%`
          save(width)
        }
      }
    }

    function toggleActive () {
      if (!props.editor.isEditable) {
        openImageModal()
        return
      }
      // set cursor next to image
      const resolvePos = props.editor.view.state.doc.resolve(props.getPos())
      const selection = Selection.near(resolvePos)
      const tr = props.editor.view.state.tr.setSelection(selection)
      const state = props.editor.view.state.apply(tr)
      props.editor.view.updateState(state)
      props.editor.view.dispatch(props.editor.state.tr.scrollIntoView())

      outerRef.value?.$el.scrollIntoView({ block: 'center' })

      props.editor.chain().blur()
      active.value = !active.value
    }

    function close () {
      active.value = false
    }

    function closePreview () {
      isPreviewMode.value = false
      isAttachmentPreview.value = false
    }

    function hideBubbleMenu () {
      // this.addGrabCursor()

      const drag = () => {
        onDragStart()
        const el = document.getElementById('menububble')
        if (el.classList.contains('is-active')) el.classList.remove('is-active')
      }

      const drop = () => {
        removeGrabbingCursor()
        props.editor.chain().blur()

        document.removeEventListener('drag', drag)
        document.removeEventListener('drop', drop)
        // document.removeEventListener('dragstart', dragstart)
      }

      document.addEventListener('drop', drop)
      document.addEventListener('drag', drag)
      // document.addEventListener('dragstart', dragstart)
    }

    function deleteImage (e) {
      const id = parseInt(props.node.attrs.id)

      if ((e.keyCode === 8 || e.keyCode === 46) && active.value && id && !linkMenuIsActive.value) {
        props.deleteNode()
      }
    }

    async function setToClipboard (blob) {
      /* eslint-disable-next-line */
      const data = [new ClipboardItem({ [blob.type]: blob })]
      try {
        await navigator.clipboard.write(data)
        toggleBookLoading(false)
        setNotification({ uuid: window.crypto.randomUUID(), message: 'Image copied to clipboard', color: 'success' })
      } catch (error) {
        toggleBookLoading(false)
      }
    }

    function convertToPngAndCopyToClipboard (blob) {
      const imageUrl = window.URL.createObjectURL(blob)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (ctx) {
        const imageEl = document.createElement('img')
        imageEl.src = imageUrl
        imageEl.crossOrigin = 'anonymous'

        imageEl.onload = ({ target }) => {
          const { width, height } = target

          canvas.width = width
          canvas.height = height
          ctx.drawImage(target, 0, 0, width, height)
          canvas.toBlob(setToClipboard, 'image/png', 1)
        }
      }
    }

    function imageToBlob (imageURL) {
      const img = new Image()
      const c = document.createElement('canvas')
      const ctx = c.getContext('2d')
      img.crossOrigin = ''
      img.src = imageURL
      return new Promise(resolve => {
        img.onload = function () {
          // c.width = naturalWidth.value TODO: investigate
          // c.height = naturalHeight.value
          ctx.drawImage(this, 0, 0)
          c.toBlob((blob) => {
            // here the image is a blob
            resolve(blob)
          }, 'image/png', 0.75)
        }
      })
    }

    async function copyImageToClipBoard (e) {
      const src = props.node.attrs.src
      const key = e.which || e.keyCode
      const ctrlKey = e.ctrlKey || e.metaKey

      if (key === 67 && ctrlKey) {
        toggleBookLoading(true)
        const isGiphy = (/giphy/i).test(props.node.attrs.src)

        if (isGiphy) {
          imageToBlob(props.node.attrs.src)
            .then(blob => convertToPngAndCopyToClipboard(blob))
            .finally(() => toggleBookLoading(false))
        } else {
          attachmentService.proxy(src)
            .then(res => {
              const blob = res.data

              if (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.gif')) {
                convertToPngAndCopyToClipboard(blob)
              } else if (src.endsWith('.png')) {
                setToClipboard(blob)
              }
            })
            .finally(() => toggleBookLoading(false))
        }
      }
    }

    function initListeners (e) {
      deleteImage(e)
      copyImageToClipBoard(e)
    }

    function toggleImageBoxShadow (isBoxShadow) {
      props.editor.chain().blur()
      props.editor.commands.setImageBoxShadow(isBoxShadow, props.getPos())
    }

    function openLink () {
      window.open(props.node.attrs.imageLink)
    }

    function setComment (value) {
      const data = props.node.attrs.imageComment
      let comments = []

      if (!data) {
        comments = [{
          id: 0,
          user: {
            id: user.value?.id,
            firstName: user.value?.profile?.firstName || 'Guest',
            lastName: user.value?.profile?.lastName || '',
            color: user.value?.profile?.color || 'Omolon'
          },
          date: new Date(),
          text: value.trim()
        }]
      } else {
        const parsedData = JSON.parse(data)
        comments = parsedData.map(item => item.id === 0 ? { ...item, text: value } : item)
      }

      props.editor.commands.addImageComment({
        value: JSON.stringify(comments),
        pos: nodePos.value
      })
    }

    function deleteAttachment () {
      props.editor.commands.deleteImage(nodePos.value)
    }

    return {
      // refs
      outerRef,
      commentRef,
      imageModalRef,
      // data
      status,
      active,

      imageWidth,
      imageLoaded,
      isCommentActive,
      linkMenuIsActive,
      isModalMenuLinkActive,
      isModalMenuCommentActive,
      localAtt,
      isPreviewMode,
      // computed
      user,
      share,
      nodePos,
      comments,
      isMobile,
      isShadow,
      isSharePage,
      countMessages,
      // function
      close,
      closePreview,
      openLink,
      touchEnd,
      touchMove,
      setComment,
      touchStart,
      imageOnLoad,
      onMouseDown,
      toggleActive,
      toggleComment,
      openImageModal,
      hideBubbleMenu,
      removeGrabbingCursor,
      toggleImageBoxShadow,
      deleteAttachment
    }
  }
})
</script>

<style lang="scss" scoped>
.resizer {
  top: calc(50% + 15px);
  transform: translateY(-50%);
  @apply absolute right-0 w-22 h-1/2;

  &__bar {
    cursor: col-resize;
    @apply ml-5 w-9 bg-primary block h-full rounded-4;
  }
}
.image-active {
  background: #3FA2FE42;
  opacity: 0.4;
}
</style>
