<template>
  <DropdownModule
    v-if="share"
    :text="isMobile ? '' : 'share'"
    prefix="icon-share text-12"
    type="transparent"
    :isTeleported="false"
    background="bg-primary dark:bg-grey-110"
    :width="350"
    positionMenu="right"
    classes="!bg-primary !opacity-100 !px-14 max-h-[34px]"
    class="flex"
    button-classes="text-14 font-medium"
  >
    <div class="p-20 rounded-10 text-15 text-app-color" @click.stop>
      <p class="font-semibold text-17">Share note</p>

      <p class="text-14 mt-15 mb-5">Share via link</p>
      <Switcher
        :modelValue="shareState"
        class="w-full text-14 font-medium"
        width="50%"
        :tabs="[
          { name: 'Not published', key: 'not-published' },
          { name: 'Publish to web', key: 'published' }
        ]"
        @update:modelValue="toggleShare"
      />

      <TransitionExpand>
        <div v-if="shareState.index === 1" class="pt-10">
          <div class="mt-20 flex items-center">
            <input
              type="text"
              :readonly="true"
              :value="link"
              class="w-full text-13 rounded-l-10 h-35 px-10 outline-none !text-grey-1200 bg-grey-150"
            >

            <div
              class="w-[80px] justify-center border-2 flex items-center rounded-r-10
            flex-shrink-0 px-10 text-14 font-semibold h-35 cursor-pointer text-white bg-black
            hover:opacity-80 border-transparent hover:border-black transition-all duration-50"
              @click="copyLink"
            >
              {{ btnText }}
            </div>
          </div>

          <div class="flex items-center justify-between mt-20">
            <p class="text-14 whitespace-nowrap">Anyone with this link</p>
            <Switcher
              :modelValue="shareMode"
              class="text-14 font-medium"
              width="85px"
              :scale="{ x: 0.9, y: 0.8 }"
              :tabs="[
                { name: 'Can view', key: 'ca-view' },
                { name: 'Can edit', key: 'can-edit' }
              ]"
              @update:modelValue="toggleMode"
            />
          </div>
        </div>
      </TransitionExpand>
    </div>
  </DropdownModule>
</template>

<script setup lang="ts">
import TransitionExpand from '@/components/shared/TransitionExpand'
import { copy } from '@/core/helper-functions'

const props = defineProps<{
  project?: IProject
}>()

const route = useRoute()
const { user } = useProfile()
const { isMobile } = useGeneral()
const { share, getShare, setShare } = useProject()

const shareMode = ref<ISwitcherModelValue>({
  index: 0,
  key: 'can-view'
})
const shareState = ref<ISwitcherModelValue>({
  index: 0,
  key: 'not-published'
})

const btnText = ref('Copy')

const link = computed(() => {
  const userValue = user.value.profile.userName || `${user.value.profile.firstName}${user.value.profile.lastName}`

  return `${location.origin}/${userValue}/share/${share.value.id}`.toLowerCase()
})

watch(() => route.query, to => {
  if (to.page) {
    initShare(to.page)
  }
})

onMounted(() => {
  nextTick(() => {
    if (share.value) {
      shareState.value = share.value.isActive
        ? { index: 1, key: 'published' }
        : { index: 0, key: 'not-published' }
      shareMode.value = share.value?.mode === 'read'
        ? { index: 0, key: 'can-view' }
        : { index: 1, key: 'can-edit' }
    }
  })
})

if (!share.value?.id) {
  initShare(props.project.id)
}

function initShare (id) {
  getShare(id)
    .then((data) => {
      if (!data?.id) {
        return projectService.postShare({
          isActive: false,
          mode: 'read',
          projectId: id
        }).then(({ data }) => {
          shareMode.value = { index: 0, key: 'can-view' }
          setShare(data)
        })
      } else {
        shareMode.value = data.mode === 'read'
          ? { index: 0, key: 'can-view' }
          : { index: 1, key: 'can-edit' }
        shareState.value = data.isActive
          ? { index: 1, key: 'published' }
          : { index: 0, key: 'not-published' }
      }
    })
}

function toggleShare (value: ISwitcherModelValue) {
  shareState.value = value

  projectService.postShare({
    isActive: value.index === 1,
    mode: share.value.mode,
    projectId: props.project.id
  }).then(({ data }) => setShare(data))
}

function toggleMode (value: ISwitcherModelValue) {
  shareMode.value = value

  projectService.postShare({
    isActive: share.value.isActive,
    mode: value.index === 0 ? 'read' : 'write',
    projectId: props.project.id
  }).then(({ data }) => setShare(data))
}

function copyLink () {
  copy(link.value, () => {
    btnText.value = 'Copied!'
    setTimeout(() => {
      btnText.value = 'Copy'
    }, 3000)
  })
}
</script>
