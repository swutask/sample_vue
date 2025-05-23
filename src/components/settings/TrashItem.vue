<template>
  <div
    class="h-full w-full flex items-center justify-between text-app-color py-5 cursor-pointer"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="flex items-center">
      <i v-if="isFolder" class="icon-create-folder text-20 mr-10" alt="" />
      <img v-else class="w-18 h-18 mr-10" :src="iconSrc" alt="icon">

      <p v-if="isFolder" class="text-14 truncate" :class="isHover ? 'max-w-[250px]' : 'max-w-[420px]'">{{ item.name }}</p>
      <p v-else class="text-14 truncate" :class="isHover ? 'max-w-[250px]' : 'max-w-[420px]'">{{ item.title }}</p>
      <p
        v-if="isHover && item.book && item.book.title"
        class="text-12 text-app-color ml-10 font-bold"
      >
        <span class="mr-8">·</span>{{ item.book.title }}
      </p>
    </div>
    <div class="flex items-center">
      <p
        v-if="isHover && item.deletedAt"
        class="hidden lg:block text-11 text-grey-700 mr-5"
      >
        Trashed on: {{ parseDate(item.deletedAt, 'D MMM, YYYY').toLocaleLowerCase() }} <span v-if="hasSize">- {{ fileSize }}</span>
      </p>
      <ButtonModule
        :has-hover="true"
        prefix="icon-undo"
        class="text-app-color p-5 pr-3"
        @click="$emit('restore')"
      />
      <ButtonModule
        :has-hover="true"
        prefix="icon-delete"
        class="text-app-color p-5 pr-3"
        @click="$emit('delete')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { parseDate } from '@/plugins/filters'

const props = defineProps<{
  icon?: string
  item: ITrashItem
  size?: number
  isFolder?: boolean
  hasSize: boolean
}>()

defineEmits(['delete', 'restore'])

const isHover = ref(false)

const fileSize = computed(() => {
  if (props.size / 1024 / 1024 < 1) return `${(props.size / 1024).toFixed(0)}kb`

  return `${(props.size / 1024 / 1024).toFixed(2)}Mb`
})

const iconSrc = computed(() => {
  const icon = props.icon || 'default-phoenix'

  if (icon.includes('default-')) {
    return `https://helloivy-icons.s3.eu-central-1.amazonaws.com/${icon}.svg`
  }

  return `https://helloivy-icons.s3.eu-central-1.amazonaws.com/${icon}.png`
})
</script>
