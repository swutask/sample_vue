<template>
  <div class="w-full">
    <DropdownModule
      ref="dropdownRef"
      :width="180"
      :disabled="isClient"
      dropdownClasses="!left-[150px] !top-0 !bg-primary"
      :isTeleported="!isModalView"
      class="cursor-default rounded-8 w-full"
      background="bg-primary dark:bg-grey-110"
      z-index="z-[9999]"
      top-position="100%"
      isAutoMenuPosition
      preventCloseOnClick
      remove-optional-top-gap
      dropdownShadow="bg-primary"
    >
      <template #button="{isOpen}">
        <ButtonModule
          :prefix="prefixClasses"
          classes="opacity-40 anim-opacity w-full py-8 text-dark-default"
          :class="[{ 'bg-grey-200 opacity-50': isOpen }, isScreenTaskView ? 'text-13' : 'text-14', coverBtnClasses]"
          :suffix="isModalView ? 'icon-arrow-top rotate-90 ml-auto' : ''"
        >
          {{ buttonText }}
        </ButtonModule>
      </template>

      <div class="rounded-10 max-h-[300px] text-app-color" @click.stop>
        <label
          class="mx-20 my-10 flex items-center justify-center px-12 py-6 h-30 text-12 rounded-[16px]
                        border border-grey-1400 shadow-grey-1400-05
                      hover:border-brand hover:shadow-brand-05 anim-color text-app-color leading-tight cursor-pointer"
        >
          <p> Upload image </p>
          <input ref="previewImageInputRef" class="hidden" type="file" @change="uploadPreviewImage">
        </label>
        <CheckboxModule
          v-model="showInCard"
          class="py-7 px-15 cursor-pointer hover:bg-selection leading-normal text-13"
          label="Show on task card"
          @update:modelValue="toggleShowInCard"
        />

        <CheckboxModule
          v-model="showInModal"
          class="py-7 pb-10 px-15 cursor-pointer hover:bg-selection leading-normal text-13 rounded-b-10"
          label="Show in task"
          @update:modelValue="toggleShowInPage"
        />
      </div>
    </DropdownModule>
  </div>
</template>

<script setup lang="ts">
import useTaskModal from '@/pages/task-board/useTaskModal'
withDefaults(defineProps<{
  isModalView?: boolean
  coverBtnClasses?: string
  prefixClasses?: string
}>(), {
  prefixClasses: 'icon-image-1 text-18 mr-8',
  coverBtnClasses: 'px-6'
})
const { isClient } = useProfile()
const { isScreenTaskView, modalTask } = useTask()
const {
  toggleShowInPage,
  uploadPreviewImage,
  toggleShowInCard
} = useTaskModal()

const showInCard = ref(modalTask.value.attachments[0] ? modalTask.value.attachments[0]?.showInCard : true)
const showInModal = ref(modalTask.value.attachments[0] ? modalTask.value.attachments[0]?.showInModal : true)

const buttonText = computed(() => {
  if (isScreenTaskView.value) {
    return modalTask.value.attachments.length ? 'Change cover' : 'Cover'
  } else {
    return 'Cover'
  }
})
</script>
