<template>
  <div class="flex items-center">
    <img
      v-if="isClient ? avatar : shouldShowLogo"
      ref="imageRef"
      :src="isClient ? avatar : teamLogo"
      alt="Team logo icon"
      class="w-auto object-cover flex-shrink-0 mr-12"
      :class="{'mr-8': showTitle}"
      :style="`height: ${computedHeight}px`"
    >

    <TeamLitteral v-if="!shouldShowLogo && name" :name="name" />

    <p
      v-if="showTitle && showName"
      class="font-semibold pr-1 text-dark-default max-w-[210px] mt-2 truncate pl-3 hidden lg:flex text-14"
    >
      {{ isClient ? `${user.profile.firstName} ${user.profile.lastName}` : name }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  sharedPageInfo?: { logo: string | null; name: string }
  showName?: boolean
}>(), {
  showName: true
})
const { team } = useTeam()
const { isClient, user } = useProfile()

const imageRef = ref()
const proportion = ref(null)
const longLogoHeight = ref(24)
const shortLogoHeight = 24
const proportionLimit = 2.6

const computedHeight = computed(() => proportion.value < proportionLimit ? shortLogoHeight : longLogoHeight.value)

const teamLogo = computed(() => props.sharedPageInfo ? props.sharedPageInfo.logo : team.value?.teamLogo?.url)

const name = computed(() => {
  if (isClient.value) {
    return user.value.profile?.firstName
  } else {
    return props.sharedPageInfo ? props.sharedPageInfo.name : team.value?.name
  }
})

const showTitle = computed(() => teamLogo.value ? proportion.value < proportionLimit : true)

const avatar = computed(() => user.value?.avatar?.url)

const shouldShowLogo = computed(() => isClient.value ? !!avatar.value : !!teamLogo.value)

const getImageSize = () => {
  const img = imageRef.value

  if (img) {
    img.onload = () => {
      if (img.width > 185) {
        longLogoHeight.value = 18
      } else {
        longLogoHeight.value = 24
      }
      proportion.value = img.width / img.height
    }
  }
}

watch(() => teamLogo.value, () => {
  nextTick(() => {
    getImageSize()
  })
})

onMounted(() => getImageSize())
</script>
