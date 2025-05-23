<template>
  <div
    id="image-more-menu"
    class="flex items-center dark:bg-primary bg-dark-200 select-none z-10 rounded-8 shadow-new-dropdown"
  >
    <!-- B O X  S H A D O W  B U T T O N -->
    <ButtonModule
      v-if="user || share.mode === 'write'"
      prefix="icon-box-shadow text-14"
      class="h-35 px-8 relative text-white"
      has-hover
      teleportTooltip
      tooltipTop
      :tooltipText="isShadow ? 'Disable shadow' : 'Enable shadow'"
      tooltipClasses="!text-13 px-10 py-7 rounded-8 z-9999 !-translate-y-6"
      :button-opacity="isShadow ? '100' : '80'"
      @click.stop="toggleImageBoxShadow"
    />

    <!-- L I N K  B U T T O N -->
    <ButtonModule
      v-if="user || share.mode === 'write'"
      ref="linkBtnRef"
      prefix="icon-link text-14"
      class="h-35 px-8 relative text-white"
      has-hover
      teleportTooltip
      tooltipTop
      :tooltipText="isCommentActive || isLinkMenuActive ? '' : 'Add link'"
      tooltipClasses="!text-13 px-10 py-7 rounded-8 z-9999 !-translate-y-6"
      :button-opacity="node.attrs.imageLink || isLinkMenuActive ? '100' : '80'"
      @click.stop="showLinkMenu"
    />

    <!-- O R I G I N A L  B U T T O N -->
    <ButtonModule
      prefix="icon-image text-11"
      class="h-35 px-8 relative text-white"
      has-hover
      tooltipText="Original"
      teleportTooltip
      tooltipTop
      tooltipClasses="!text-13 px-10 py-7 rounded-8 z-9999 !-translate-y-6"
      button-opacity="80"
      @click="openOriginalImage"
    />

    <ButtonModule
      v-if="user || share.mode === 'write'"
      prefix="icon-delete text-14"
      class="h-35 px-8 relative text-white"
      has-hover
      tooltipText="Delete"
      teleportTooltip
      tooltipTop
      tooltipClasses="!text-13 px-10 py-7 rounded-8 z-9999 !-translate-y-6"
      button-opacity="80"
      @click.stop="deleteImage"
    />

    <div
      v-show="isLinkMenuActive"
      ref="linkRef"
      class="flex items-center absolute z-9999 shadow-dropdown rounded-8"
      :style="linkPosition"
      @dblclick.stop.prevent
      @click.stop
    >
      <input
        v-if="isLinkMenuActive"
        v-model="linkUrl"
        v-focus="true"
        class="py-8 px-20 outline-none lowercase h-40 bg-primary text-app-color text-15 rounded-8"
        type="text"
        placeholder="https://"
        @click.stop
        @keydown.esc="hideLinkMenu"
        @keydown.enter.stop="toggleLinkUrl(linkUrl)"
        @keydown.backspace.stop
        @paste.stop
      >
      <button
        v-if="node.attrs.imageLink"
        class="text-13 text-grey-300 w-40 h-40 bg-primary rounded-r-4"
        type="button"
        @click="toggleLinkUrl(null)"
      >
        <i class="icon-close" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPosition } from '@/core/helper-functions'

const props = defineProps<{
  node: any // TODO: import type for node and editor from tiptap
  editor: any
  isLinkMenuActive: boolean
  isCommentActive: boolean
  imageWidth: number
  nodePos: number
}>()

const emit = defineEmits(['toggle-link-menu', 'toggle-comment-menu', 'toggle-box-shadow', 'onBlur', 'setComment', 'deleteImage'])

const { user } = useProfile()
const { share } = useProject()

const linkPosition = ref('')
const linkUrl = ref('')
const linkRef = ref(null)
const linkBtnRef = ref(null)

const url = computed(() => props.node.attrs.src)

const isShadow = computed(() => props?.node?.attrs?.class?.includes('shadow-smooth'))

function deleteImage () {
  props.editor.commands.deleteImage(props.nodePos)
}

function openOriginalImage () {
  props.editor.chain().blur()
  const image = new Image()
  image.src = url.value
  window.open(url.value, '_blank')
}

// L I N K  L O G I C
function showLinkMenu () {
  props.editor.chain().blur()
  linkUrl.value = props.node.attrs.imageLink
  emit('toggle-link-menu', !props.isLinkMenuActive)

  nextTick(() => {
    const imageMoreMenu = document.querySelector('#image-more-menu')
    linkPosition.value = getPosition(imageMoreMenu, linkRef.value, linkBtnRef.value.$el, true)
  })
}

function hideLinkMenu () {
  linkUrl.value = 'https://'
  emit('toggle-link-menu', false)
}

function parseUrl (url: string) {
  const splittedUrl = url.split('://')

  return splittedUrl.length > 1 ? url : `https://${url}`
}

function toggleLinkUrl (url: string) {
  const href = url ? parseUrl(url) : null

  props.editor.commands.addLink(href, props.nodePos)

  hideLinkMenu()
}

function toggleImageBoxShadow () {
  props.editor.chain().blur()
  emit('toggle-box-shadow', !isShadow.value)
}
</script>
