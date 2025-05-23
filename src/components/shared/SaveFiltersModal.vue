<template>
  <div
    class="flex justify-end text-brand text-12 cursor-pointer select-none md:hover:text-dark-default mt-10"
    @click="showSaveFiltersModal = !showSaveFiltersModal"
  >
    Set as default
  </div>
  <teleport to="#main_section">
    <transition name="fade">
      <div
        v-if="showSaveFiltersModal"
        v-closeOnPressEsc="close"
        class="fixed top-0 left-0 px-15 py-[60px] w-full h-full bg-backdrop z-9999 md:z-[105] overflow-y-auto"
        @click.self="close"
      >
        <div
          id="wrapper"
          class="fixed top-[40%] left-[40%] bg-primary mx-auto max-w-[450px] w-full rounded-10 p-20 shadow-modal dark:shadow-event-dark"
        >
          <p class="text-16 font-semibold">
            {{ modalText.title }}
          </p>
          <p class="text-grey-950 text-14 mt-5 mb-8">
            {{ modalText.body }}
          </p>

          <div class="flex space-x-5 justify-end mt-20">
            <ButtonModule text="Cancel" classes="bg-grey-50 px-15 py-7 rounded-6" titleClass="text-grey-950 text-14" @click="close" />

            <ButtonModule text="Save" classes="bg-brand px-15 py-7 rounded-6" titleClass="text-white text-14" @click="saveFilters" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
const emit = defineEmits(['close', 'updateFilters'])

const route = useRoute()
const showSaveFiltersModal = ref(false)

const modalText = computed(() => {
  return {
    title: route.name === 'Today'
      ? 'Save filters as new default for Overview page?'
      : 'Save filters as new default for this space?',
    body: route.name === 'Today'
      ? 'This will become the new default filter configuration and will only be visible for you, not your team'
      : 'Save filters as new default for this space?'
  }
})

function close () {
  emit('close')
}

async function saveFilters () {
  try {
    emit('updateFilters')
  } catch (error) {
    console.log(error)
  } finally {
    close()
  }
}
</script>
