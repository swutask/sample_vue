<template>
  <div
    class="absolute bg-primary text-app-color bottom-[56px] z-50 rounded-0
    md:rounded-4 mx-0 md:max-w-[350px] w-full h-[280px] p-14 shadow-dropdown"
  >
    <div class="flex flex-col mx-auto max-w-[320px]">
      <!-- C A T E G O R I E S -->
      <div class="flex items-center justify-around">
        <i
          v-for="category in categories"
          :key="category.id"
          class="cursor-pointer transition-all duration-50 opacity-40 hover:opacity-100 text-dark-500"
          :class="[ { 'opacity-100': selectedGroup === category.name }, category.style]"
          @click="selectGroup(category.name)"
        />
      </div>
      <!-- S E A R C H -->
      <div class="flex items-center mt-10 mb-5 px-10 rounded-4 bg-grey-400">
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
          class="w-full text-14 bg-transparent pr-10 pl-10 py-6 focus:outline-none placeholder-app-color
            opacity-50 focus:opacity-100 anim-opacity"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @click="toggleInput"
        >
      </div>
    </div>
    <!-- I C O N S -->
    <div class="flex justify-center mx-auto">
      <div
        v-if="searchValue"
        class="overflow-y-auto w-full justify-start overflow-x-hidden pt-13 max-w-[320px] max-h-[185px] min-h-[60px]"
        :class="{ 'flex justify-center items-center': !searchEmoji.length }"
      >
        <div v-if="searchEmoji.length" class="flex flex-wrap justify-start">
          <div
            v-for="(item, index) in searchEmoji"
            :key="index + item.char"
            class="relative flex justify-center items-center w-40 h-40 z-20 hover:bg-grey-400 rounded-4 cursor-pointer text-25 m-2 group-scope"
            @click="selectEmoji(item)"
          >
            <span
              class="whitespace-nowrap absolute z-10 shadow px-5 bg-backdrop text-white
                rounded-4 bottom-37 text-10 font-medium opacity-0 group-scope-hover:opacity-100"
              :class="[
                { 'left-0': index === 0 || index % 7 === 0 },
                { 'right-0': index === 6 || index % 7 === 6 }
              ]"
            >
              {{ item.name }}
            </span>
            <div v-if="item.category === 'flags'">
              <img :src="`https://helloivy-icons.s3.eu-central-1.amazonaws.com/flags/${item.name}.png`" width="24" :alt="item.name">
            </div>
            <div v-else>
              {{ item.char }}
            </div>
          </div>
        </div>
        <span v-else>No results</span>
      </div>
      <div
        v-else
        ref="scrollToUpRef"
        class="overflow-y-auto overflow-x-hidden flex flex-wrap w-full pt-13 max-w-[320px] justify-start max-h-[185px] min-h-[60px]"
      >
        <div
          v-for="(item, index) in groupByCategories?.[selectedGroup]"
          :key="index + item.char"
          class="relative flex justify-center items-center w-40 h-40 z-20 hover:bg-grey-400
            rounded-4 cursor-pointer text-24 m-2 group-scope"
          @click="selectEmoji(item)"
        >
          <span
            class="whitespace-nowrap absolute z-10 shadow px-5 rounded-4 bg-backdrop text-white
             bottom-37 text-10 font-medium opacity-0 group-scope-hover:opacity-100"
            :class="[
              { 'left-0': index === 0 || index % 7 === 0 },
              { 'right-0': index === 6 || index % 7 === 6 }
            ]"
          >
            {{ item.name }}
          </span>
          <div v-if="selectedGroup === 'flags'">
            <img :src="`https://helloivy-icons.s3.eu-central-1.amazonaws.com/flags/${item.name}.png`" width="24" :alt="item.name">
          </div>
          <div v-else>{{ item.char }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loadEmojis = () => import('@/core/emojis')

const emit = defineEmits(['selectEmoji'])

const categories = [
  {
    id: 0,
    name: 'people',
    style: 'icon-emoticon text-20'
  },
  {
    id: 1,
    name: 'animals_and_nature',
    style: 'icon-leaf text-16'
  },
  {
    id: 2,
    name: 'food_and_drink',
    style: 'icon-lunch-dining text-20'
  },
  {
    id: 3,
    name: 'travel_and_places',
    style: 'icon-flight text-20'
  },
  {
    id: 4,
    name: 'activity',
    style: 'icon-celebration text-20'
  },
  {
    id: 5,
    name: 'objects',
    style: 'icon-objects text-20'
  },
  {
    id: 6,
    name: 'symbols',
    style: 'icon-symbols text-21'
  },
  {
    id: 7,
    name: 'flags',
    style: 'icon-flag text-20 text-18'
  }
]

const selectedGroup = ref('people')
const searchValue = ref('')
const isFocused = ref(false)
const inputRef = ref(null)
const scrollToUpRef = ref(null)

const emojis = ref<TIndexedObject<IEmoji>>({})

onBeforeMount(async () => {
  emojis.value = (await loadEmojis()).default
})

const groupByCategories = computed(() => {
  return emojis.value && Object.values(emojis.value)?.reduce((r, a) => {
    r[a.category] = [...r[a.category] || [], a]
    return r
  }, {})
})

function selectGroup (group: string) {
  selectedGroup.value = group
  searchValue.value = ''
  scrollToElement()
}

const searchEmoji = computed(() => {
  return Object.values(emojis.value)
    ?.filter((object: IEmoji) => object.keywords.some(i => i.includes(searchValue.value)) ||
        object.name.includes(searchValue.value.toLowerCase()))
})

function selectEmoji (emoji: IEmoji) {
  emit('selectEmoji', emoji)
}

function toggleInput () {
  inputRef.value.focus()
}

function scrollToElement () {
  nextTick(() => {
    if (scrollToUpRef.value) {
      scrollToUpRef.value.scrollTop = 0
    }
  })
}

defineExpose({
  toggleInput
})
</script>
