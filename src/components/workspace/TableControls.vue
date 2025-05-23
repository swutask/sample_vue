<template>
  <div
    ref="tableControlsRef"
    class="absolute h-40 max-w-calc-50 w-full md:w-auto z-50"
  >
    <div
      class="flex items-center h-40 rounded-4 no-scroll-bar shadow-dropdown
             overflow-x-auto opacity-90 hover:opacity-100 bg-primary"
    >
      <button
        class="toolbar-btn md:hover:bg-main-color md:hover:text-white h-40 hover:rounded-l-4"
        @click="editor.chain().focus().addColumnBefore().run()"
      >
        <i class="icon-add-column-before" />
      </button>

      <button
        class="toolbar-btn md:hover:bg-main-color md:hover:text-white h-40"
        @click="editor.chain().focus().addColumnAfter().run()"
      >
        <i class="icon-add-column-after" />
      </button>

      <button
        class="toolbar-btn md:hover:bg-main-color md:hover:text-white h-40"
        @click="editor.chain().focus().deleteColumn().run()"
      >
        <i class="icon-delete-column" />
      </button>

      <button
        class="toolbar-btn md:hover:bg-main-color md:hover:text-white h-40"
        @click="editor.chain().focus().addRowBefore().run()"
      >
        <i class="icon-add-row-before" />
      </button>

      <button
        class="toolbar-btn md:hover:bg-main-color md:hover:text-white h-40"
        @click="editor.chain().focus().addRowAfter().run()"
      >
        <i class="icon-add-row-after" />
      </button>

      <button
        class="toolbar-btn md:hover:bg-main-color md:hover:text-white h-40"
        @click="editor.chain().focus().deleteRow().run()"
      >
        <i class="icon-delete-row" />
      </button>

      <button
        class="toolbar-btn md:hover:bg-main-color md:hover:text-white h-40"
        @click="editor.chain().focus().mergeCells().run()"
      >
        <i class="icon-combine-cells" />
      </button>

      <button
        ref="backgroundBtnRef"
        class="toolbar-btn md:hover:bg-main-color md:hover:text-white flex justify-center items-center relative h-40"
        :class="{'text-white bg-main-color': activeColor}"
        @click.stop="openBlockColorPicker"
      >
        <i class="icon-fill-color text-20" />
      </button>

      <button
        class="toolbar-btn md:hover:bg-main-color md:hover:text-white flex justify-center items-center relative h-40"
        @click="toggleVisibleTable"
      >
        <i
          class="text-20"
          :class="isVisibleTable ? 'icon-visibility_off' : 'icon-visibility'"
        />
      </button>

      <button
        class="toolbar-btn md:hover:bg-main-color md:hover:text-white h-40"
        @click="editor.chain().focus().deleteTable().run()"
      >
        <i class="icon-delete-table" />
      </button>
    </div>

    <div
      v-if="showBlockColorPicker"
      ref="colorRef"
      v-clickOutside="close"
      class="absolute z-20 bg-primary rounded-4 shadow"
      :style="blockColorPosition"
    >
      <div class="cursor-default">
        <p class="tex-14 font-bold text-left text-app-color pl-10 pt-5">Pick a color</p>
        <div class="w-[225px] flex flex-wrap m-6">
          <div
            v-for="(c, index) in colors.slice(0, 15)"
            :key="c + index"
            class="w-37 h-37 rounded-4 mx-4 my-5 cursor-pointer"
            :class="{ 'border-3 border-main-color': activeColor === c }"
            :style="`background-color: ${c}`"
            @click.stop="applyCellColor(c, false)"
          />
        </div>

        <div class="p-10 pt-0">
          <input
            v-model="fillColor"
            class="text-app-color w-full px-16 py-8 rounded-4 bg-sidebar"
            type="text"
            placeholder="#0033A0"
            @click.stop @keypress.enter="applyCellColor(fillColor, true)"
          >
        </div>

        <div
          v-if="activeColor"
          class="flex items-center p-10 pt-0 text-11 text-app-color opacity-50 hover:opacity-100 cursor-pointer"
          @click.stop="removeBlockColor"
        >
          <i class="icon-remove mr-5" />
          <p>Remove color</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPosition, hexToRGB, rgbToHex } from '@/core/helper-functions'
import { getNodeAttrs } from '@/tiptap/utils/getAttrs'

const props = defineProps<{
  activeTable: HTMLElement // TODO: fix type
  editor: any
}>()

const tableControlsRef = ref(null)
const colorRef = ref(null)
const backgroundBtnRef = ref(null)

const fillColor = ref('')
const isVisibleTable = ref(true)
const showBlockColorPicker = ref(false)
const blockColorPosition = ref({})
const activeColor = ref(null)
const colors = ['rgb(71,71,71)', 'rgb(102,102,102)', 'rgb(153,153,153)', 'rgb(187,187,187)', 'rgb(221,221,221)',
  'rgb(235,88,87)', 'rgb(255,173,51)', 'rgb(255,235,53)', 'rgb(180,238,57)', 'rgb(84,238,248)', 'rgb(26,109,222)',
  'rgb(120,72,255)', 'rgb(251,45,230)', 'rgb(235,27,39)', 'rgb(39,205,145)', 'rgb(255,255,255)']

onMounted(() => {
  getActiveColor()

  nextTick(() => {
    const table = document.querySelector('.tableWrapper.activeTable table')

    isVisibleTable.value = !table?.classList.contains('visible-off')
  })
})

function getActiveColor () {
  const attrs = getNodeAttrs(props.editor.state, ['tableCell', 'tableHeader'])

  const background = attrs.style && attrs.style !== 0 ? attrs.style.split(': ')[1] : null
  activeColor.value = background && background.split(/\s/).join('')
}

function openBlockColorPicker () {
  fillColor.value = ''
  showBlockColorPicker.value = !showBlockColorPicker.value

  // if color doesn't exist in the colors list
  if (activeColor.value && !colors.includes(activeColor.value)) {
    fillColor.value = rgbToHex(activeColor.value)
  }

  if (showBlockColorPicker.value) {
    nextTick(() => {
      blockColorPosition.value = getPosition(tableControlsRef.value, colorRef.value, backgroundBtnRef.value)
    })
  }
}

function close () {
  showBlockColorPicker.value = false
  activeColor.value = null
}

function applyCellColor (color, isFillColor) {
  showBlockColorPicker.value = false

  if (isFillColor && color.length) {
    const fillColorRgb = hexToRGB(color)
    props.editor.chain().focus().setCellAttribute('style', `background-color: ${fillColorRgb}`).run()
  } else {
    const background = activeColor.value === color ? '' : color

    props.editor.chain().focus().setCellAttribute('style', `background-color: ${background}`).run()
  }

  fillColor.value = ''
}

function removeBlockColor () {
  showBlockColorPicker.value = false
  props.editor.chain().focus().setCellAttribute('style', '').run()
  fillColor.value = ''
}

function toggleVisibleTable () {
  isVisibleTable.value = !isVisibleTable.value
  props.activeTable.classList.toggle('visible-off', !isVisibleTable.value)
  props.editor.chain().focus().toggleTableVisibility(!isVisibleTable.value).run()
}
</script>
