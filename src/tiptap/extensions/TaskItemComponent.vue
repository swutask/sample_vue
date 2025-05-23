<template>
  <NodeViewWrapper
    as="li"
    :data-type="node.type.name"
    :data-done="node.attrs.done.toString()"
    :style="dragged && isMobile ? 'padding-left: 20px' : ''"
    :class="[
      node.attrs.done ? 'todo-checked' : 'todo-unchecked',
      node.attrs.done ? settings.taskOrdering ? 'order-1' : '' : 'order-none',
    ]"
    class="flex relative todo_item outline-none pl-20 group-scope"
    @touchstart.passive="disableContentSelecting"
    @touchmove.passive="onTouchMove"
    @touchend.passive="onTouchEnd"
    @touchcancel.passive="onTouchEnd"
  >
    <i
      v-if="!isMobile && isEditable"
      class="icon-drag !text-16 drag-icon hover:opacity-100 mt-2 md:opacity-0 group-scope-hover:opacity-100"
      contenteditable="false"
      draggable="true"
      data-drag-handle
    />

    <span
      v-if="isMobile"
      class="todo-checkbox border-2 border-grey-700 h-21 w-21 rounded-2 bg-transparent"
      :data-checked="node.attrs.done.toString()"
      contenteditable="false"
      :draggable="isEditable"
      data-drag-handle
      :style="alignText"
      @touchstart.prevent="onChange"
      @click.prevent="onChange"
    />

    <span
      v-else
      class="todo-checkbox border-2 border-grey-700 h-17 w-17 rounded-2 ml-5 bg-transparent"
      :class="{'cursor-pointer': isEditable}"
      :data-checked="node.attrs.done.toString()"
      contenteditable="false"
      :style="alignText"
      @click="onChange"
    />

    <NodeViewContent
      ref="contentRef"
      :data-checked="node.attrs.done.toString()"
      :draggable="isDraggableContent && isEditable"
      data-drag-handle
      class="todo-content w-full outline-none"
      :contenteditable="!isDraggableContent && isEditable"
      :class="{'pointer-events-none': isProjectLocked || isDraggableContent}"
    />
  </NodeViewWrapper>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { alignmentTask } from '@/core/alignments'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    NodeViewContent,
    NodeViewWrapper
  },

  props: nodeViewProps,

  setup (props) {
    const { isMobile } = useGeneral()
    const { settings } = useSettings()
    const { currentProject } = useProject()
    const route = useRoute()

    let timer = null

    const contentRef = ref(null)

    const dragged = ref(false)
    const isContentDisabled = ref(false)
    const allowDrag = ref(false)

    const isProjectLocked = computed(() => currentProject.value?.isLocked)

    const alignText = computed(() => {
      if (route.name === 'Share') {
        return 'margin-top: 4px'
      }

      return alignmentTask[settings.value.fontSize + settings.value.lineHeight]
    })

    const isEditable = computed(() => props.editor.isEditable)

    const isDraggableContent = computed(() => isMobile.value && isContentDisabled.value)

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
      }
    }

    function onDragStart () {
      document.body.classList.add('grabbing')
    }

    function onDragEnd () {
      document.body.classList.remove('grabbing')
    }

    function onChange () {
      if (!isEditable.value) return
      onTouchEnd()

      props.editor.chain().blur().run()
      props.updateAttributes({
        done: !props.node.attrs.done
      })
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

    return {
      // ref
      contentRef,
      // data
      dragged,
      allowDrag,
      isContentDisabled,
      // computed
      settings,
      isMobile,
      alignText,
      isEditable,
      isDraggableContent,
      isProjectLocked,
      // function
      onChange,
      onTouchEnd,
      onDragEnd,
      onDragStart,
      onTouchMove,
      disableContentSelecting
    }
  }
})
</script>
