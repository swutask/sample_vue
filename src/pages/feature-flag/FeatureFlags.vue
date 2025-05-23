<template>
  <div class="p-25">
    <div class="flex md:flex-row flex-col items-center md:justify-normal justify-between mt-20 md:mt-0 md:gap-0 gap-10">
      <Portal to="rightHeaderProjectContent">
        <div class="space-x-10 flex md:justify-normal justify-end md:w-auto w-full items-center">
          Feature Flags
        </div>
      </Portal>
    </div>

    <div
      v-for="ff in featureFlags"
      :key="ff.id"
      class="flex items-center"
    >
      <FeatureFlag :featureFlag="ff" />
    </div>

    <NewFeatureFlag v-if="showNewFF" @close="showNewFF = false" />

    <ButtonModule
      text="new feature flag"
      class="text-14 font-normal text-grey-250 hover:text-app-color
                 relative z-10 py-8 px-10 rounded-6 anim-color-200 prevent-drag-scroll ml-6 hover:bg-menu-hover"
      prefix="icon-add text-10 mt-2 mr-7"
      @click.stop="showNewFF = true"
    />
  </div>
</template>

<script setup lang="ts">
const { featureFlags } = useFeatureFlag()
const { user } = useProfile()
const { team } = useTeam()
const router = useRouter()

const showNewFF = ref(false)

onMounted(async () => {
  if (user.value.role.name !== 'admin') {
    router.push({ name: 'Today', params: { team: team.value.link } })
  }
})
</script>
