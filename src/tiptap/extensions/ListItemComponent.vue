<template>
  <NodeViewWrapper
    as="li"
    :data-type="node.type.name"
    class="relative list-item h-full outline-none group-scope"
    @touchstart.passive="disableContentSelecting"
    @touchmove.passive="onTouchMove"
    @touchend.passive="onTouchEnd"
    @touchcancel.passive="onTouchEnd"
  >
    <i
      v-if="!isMobile && isEditable"
      class="icon-drag drag-icon !-left-20 mt-1 md:opacity-0 group-scope-hover:opacity-100"
      data-drag-handle
      draggable="true"
      contenteditable="false"
    />

    <div
      class="w-16 h-full flex items-center justify-center -ml-20"
      :draggable="isMobile"
      contenteditable="false"
      data-drag-handle
    >
      <span
        class="w-6 h-6 m-auto rounded-full bg-dark-500 absolute"
        :style="alignText"
      />
    </div>

    <NodeViewContent
      ref="contentRef"
      :draggable="isDraggableContent"
      data-drag-handle
      class="list-item-content w-full outline-none"
      :contenteditable="!isDraggableContent && isEditable"
      :class="{'pointer-events-none': isDraggableContent}"
    />
  </NodeViewWrapper>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

import { useRoute } from 'vue-router'

import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3'

import { alignmentList } from '@/core/alignments'
import { unselectText } from '@/core/helper-functions'

export default defineComponent({
  components: {
    NodeViewContent,
    NodeViewWrapper
  },

  setup (props) {
    const { isMobile } = useGeneral()
    const route = useRoute()

    let timer = null

    const contentRef = ref(null)

    const dragged = ref(false)
    const isContentDisabled = ref(false)

    const { settings } = useSettings()

    const isDraggableContent = computed(() => isMobile.value && isContentDisabled.value)

    const alignText = computed(() => {
      if (props.node.attrs.isEvent || route.name === 'Share') {
        return 'top: 9px'
      }

      return alignmentList[settings.value.fontSize + settings.value.lineHeight]
    })

    const isEditable = computed(() => props.editor.isEditable)

    function disableContentSelecting () {
      if (isMobile.value) {
        if (props.editor.isFocused) {
          isContentDisabled.value = false
        } else {
          isContentDisabled.value = true
          timer = setTimeout(() => {
            dragged.value = true
          }, 500)
        }

        hideBubbleMenu()
      }
    }

    function onDragStart () {
      document.body.classList.add('grabbing')
    }

    function onDragEnd () {
      document.body.classList.remove('grabbing')
    }

    function onTouchMove () {
      clearTimeout(timer)
      dragged.value = false
    }

    function onTouchEnd () {
      clearTimeout(timer)
      dragged.value = false
      onDragEnd()
    }

    function hideBubbleMenu () {
      // add grab hand cursor on mouse down / touch start events (from mixin)
      onDragStart()

      const drag = () => {
        unselectText()
        const el = document.getElementById('menububble')
        if (el.classList.contains('is-active')) el.classList.remove('is-active')

        // add grab hand cursor (from mixin)
        onDragStart()

        // props.editor.chain().blur()
      }

      const dragstart = () => {
        unselectText()
        // delete grabbing cursor from dom on drag start (from mixin)
        onDragEnd()
      }

      const drop = () => {
        clearTimeout(timer)
        dragged.value = false

        document.removeEventListener('drag', drag)
        document.removeEventListener('drop', drop)
        document.removeEventListener('dragstart', dragstart)

        // remove grab hand cursor(from mixin)
        onDragEnd()

        unselectText()
      }

      document.addEventListener('drop', drop)
      document.addEventListener('drag', drag)
      document.addEventListener('dragstart', dragstart)
    }

    return {
      // ref
      contentRef,
      // data
      dragged,
      isContentDisabled,
      // computed
      settings,
      isMobile,
      alignText,
      isEditable,
      isDraggableContent,
      // function
      onTouchEnd,
      onTouchMove,
      hideBubbleMenu,
      disableContentSelecting
    }
  }
})
</script>
