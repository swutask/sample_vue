<template>
  <div class="w-full py-2 flex items-center justify-between relative">
    <div class="flex-grow truncate pr-10">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center justify-between truncate">
          <div v-if="item._index === 'complex-project'" class="bg-grey-500 rounded-full w-24 h-24 mr-12 flex">
            <img v-if="item._source.icon" class="w-18 h-18 m-auto" :src="`https://helloivy-icons.s3.eu-central-1.amazonaws.com/${item._source.icon}.png`" alt="icon">
            <img v-else-if="item._source.icon === null" class="w-18 h-18 m-auto" src="https://helloivy-icons.s3.eu-central-1.amazonaws.com/purple_circle.png" alt="icon">
            <img v-else class="w-18 h-18 m-auto" src="@/assets/images/planet.svg" alt="icon">
          </div>

          <div
            v-else-if="item._index !== 'complex-book'"
            class="rounded-full w-28 h-28 mr-12 flex flex-shrink-0"
          >
            <i class="m-auto mr-13" :class="icon" />
          </div>

          <div
            v-if="item._index === 'complex-book'"
            class="mr-12 flex"
          >
            <BookLabel
              class="py-4 font-semibold cursor-pointer"
              :bookId="+item._id"
              margin="mr-10"
              :customStyle="{
                fontSize: 'text-14 font-semibold',
                defaultIcon: 'w-1/2 h-1/2 mr-15',
                iconHover: 'rounded-full w-24 h-24'
              }"
              :hasBg="false"
              :hasBorder="false"
            />
          </div>

          <div v-else class="leading-tight truncate">
            <div class="text-app-color truncate text-14">{{ title }}</div>
          </div>
        </div>
      </div>

      <!-- eslint-disable vue/no-v-html -->
      <div v-if="highlight.length > 0 && item._index !== 'attachment' && item._index !== 'complex-book' " class="highlight text-grey-250 ml-40 -mt-4">
        <p v-for="(value, index) in highlight" :key="value + index" class="truncate" v-html="value" />
      </div>
    </div>

    <div
      v-if="item._index !== 'complex-task'"
      class="flex-shrink-0 rotate-icon opacity-0 group-hover:opacity-100 anim-opacity group-hover:mr-5 group-hover:ml-10"
      :class="{'opacity-100 mr-5 ml-10': activeIndex}"
    >
      <i class="icon-arrow-up text-18 text-grey-950" />
    </div>

    <BookLabel
      v-else
      class="py-4 font-medium cursor-pointer truncate w-[150px] shrink-0 justify-end"
      :bookId="+item?._source?.bookId"
      margin="!mr-2"
      :customStyle="{
        fontSize: '!text-13',
        defaultIcon: 'w-[56%] h-[56%]',
        iconHover: 'rounded-full w-28 h-28',
      }"
      :hasBg="false"
      :hasBorder="false"
    />
  </div>
</template>

<script setup lang="ts">
import type { ISearchItem } from './search.types'

const props = defineProps<{
  item: ISearchItem
  activeIndex: boolean
}>()

const icons = {
  'complex-project': null,
  'complex-book': null,
  'complex-task': 'icon-radio_btn_unchecked',
  'complex-message': 'icon-chat-page',
  'complex-attachment': 'icon-attachment-file',
  'complex-member': null
}

const icon = computed(() => {
  return icons[props.item._index]
})

const title = computed(() => {
  if (props.item._index === 'complex-message') return 'Chat'

  return props.item._source.title || props.item._source.name
})

const highlight = computed(() => {
  if (props.item._index === 'complex-message') {
    return [
      `<div class="flex"><strong class="mr-5">${props.item.profile?.firstName}:</strong><div>${props.item.highlight.text}</div></div>`
    ]
  }

  const highlights = props.item.highlight
  delete highlights.title
  return Object.values(props.item.highlight)
})
</script>
