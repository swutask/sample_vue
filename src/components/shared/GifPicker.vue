<template>
  <div
    ref="gifPickerRef"
    class="absolute bg-primary text-app-color bottom-[56px] z-[110] md:rounded-4 py-15 pl-16 pr-4 overflow-hidden shadow-dropdown"
    :style="`width: ${width}px; height: ${height}px`"
  >
    <div class="flex pr-12">
      <!-- S E A R C H -->
      <div class="flex items-center mb-12 px-10 rounded-4 w-full bg-grey-400">
        <i
          class="icon-search cursor-pointer opacity-50 hover:opacity-100 anim-opacity"
          :class="{'opacity-100': isFocused}"
          @click="toggleInput"
        />
        <input
          ref="inputRef"
          v-model="searchValue"
          type="text"
          placeholder="search"
          class="w-full text-14 bg-transparent pr-10 pl-10 py-6 focus:outline-none
            placeholder-app-color opacity-50 focus:opacity-100 anim-opacity"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @click="toggleInput"
          @input="searchGif"
        >
      </div>
    </div>
    <!-- G I F S -->
    <div class="overflow-y-auto overflow-x-hidden min-h-[60px]" style="max-height: calc(100% - 46px)">
      <div class="gap-x-8 pr-4 list-gifs">
        <GifImage
          v-for="giphy in giphies"
          :key="giphy.id"
          :giphy="giphy"
          class="mb-8 w-full cursor-pointer rounded-8"
          @selectGif="selectGif"
        />
      </div>
    </div>
    <ResizeBar
      :element="gifPickerRef"
      :width="width"
      :height="height"
      :resizePositionBottom="resizePositionBottom"
      @resize="resize"
      @save="saveSize"
    />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

const props = withDefaults(defineProps<{
  resizePositionBottom?: boolean
  height?: number
}>(), {
  height: 380
})
const emit = defineEmits(['selectGif'])

const { setNotification } = useGeneral()

const BASE_URL = 'https://api.giphy.com/v1/gifs'
const API_KEY = 'iEiO0Ibusegthc8RhkMQoIZKlrUx2POk'
const LIMIT = 34
let ATTEMPTS = 5

let debounce = null
const gifPickerRef = ref(null)
const giphies = ref([])
const searchValue = ref('')
const isFocused = ref(false)
const inputRef = ref(null)

const width = ref(useLocalStorage.getItem('gifPickerSize')?.width || 380)
const height = ref(useLocalStorage.getItem('gifPickerSize')?.height || props.height)

onMounted(() => {
  onLoad()

  nextTick(() => {
    const rect = gifPickerRef.value.getBoundingClientRect()
    const innerWidth = window.innerWidth

    width.value = innerWidth - rect.left <= width.value ? innerWidth - rect.left : width.value
  })
})

function resize (sizes: IResizeData) {
  width.value = sizes.width
  height.value = sizes.height
}

function searchByKeywords () {
  ATTEMPTS = 5
  if (searchValue.value) {
    const OFFSET = Math.floor(Math.random() * 4998) + 1

    getGifs(OFFSET)
  }
}

function getGifs (offset) {
  const link = `${BASE_URL}/search?q=${searchValue.value}&api_key=${API_KEY}&limit=${LIMIT}&offset=${offset}`

  axios.get(link)
    .then(res => {
      if (res.data.data.length > 20) {
        giphies.value = res.data.data
      } else {
        ATTEMPTS--
        const newOffset = res.data.pagination.total_count
        const OFFSET = Math.floor(Math.random() * newOffset)

        if (ATTEMPTS > 0) getGifs(OFFSET)
      }
    })
    .catch(err => {
      if (err) setNotification({ uuid: window.crypto.randomUUID(), message: err, color: 'error' })
    })
}

function onLoad () {
  const link = `${BASE_URL}/trending?api_key=${API_KEY}&limit=${LIMIT}`

  axios.get(link)
    .then(res => (giphies.value = res.data.data))
    .catch((err) => {
      if (err) setNotification({ uuid: window.crypto.randomUUID(), message: err, color: 'error' })
    })
}

function selectGif (gif) {
  emit('selectGif', gif.images.original.url)
}

function toggleInput () {
  inputRef.value.focus()
}

function searchGif () {
  clearTimeout(debounce)
  debounce = setTimeout(() => {
    searchByKeywords()
  }, 600)
}

function saveSize (sizes: IResizeData) {
  useLocalStorage.setItem('gifPickerSize', sizes)
}

defineExpose({
  toggleInput
})
</script>

<style scoped>
.list-gifs {
  column-count: 2
}
</style>
