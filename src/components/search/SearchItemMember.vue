<template>
  <div class="w-full py-9 flex items-center justify-between">
    <div>
      <div class="flex items-center">
        <UserBadge
          :first-name="member.firstName"
          :last-name="member.lastName"
          :avatarUrl="member.avatar?.url"
          :userId="member.userId"
          :color="member.color"
          :size="30"
          class="cursor-pointer mr-7 !pl-0 font-semibold"
        />

        <div class="bg-grey-500 text-brand px-5 text-10 rounded-full">
          chat now
        </div>
      </div>

      <!-- eslint-disable vue/no-v-html -->
      <!-- <div v-if="highlight.length > 0" class="highlight text-grey-250 ml-43 -mt-4">
        <span v-for="(h, index) in highlight" :key="h + index" v-html="h" />
      </div> -->
    </div>

    <div
      class="rotate-icon opacity-0 group-hover:opacity-100 anim-opacity mr-5"
      :class="{'opacity-100': activeIndex}"
    >
      <i class="icon-arrow-up text-18 text-dark-950" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISearchItem } from './search.types'

const { members } = useTeam()
const props = defineProps<{
  item: ISearchItem
  activeIndex: boolean
}>()

const member = computed(() => members.value.find(m => m.id === +props.item._id))
</script>
