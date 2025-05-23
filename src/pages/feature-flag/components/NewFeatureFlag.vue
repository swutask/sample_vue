<template>
  <div
    v-clickOutside="create"
    class="rounded-12 w-full mb-10 bg-primary px-15 flex items-center justify-between h-[44px] board-view-border"
  >
    <div
      class="flex items-center justify-center w-18 h-18 mr-10"
      @click="active = !active"
    >
      <i
        :class="active ?
          'icon-radio_btn_checked text-[#15cb54] text-18' :
          'icon-radio_btn_unchecked text-grey-cfcfcf text-19'"
      />
    </div>

    <InputModule
      v-model="name"
      autofocus
      max-length="50"
      class="w-full"
      inputClasses="w-full"
      @keypress.enter="create"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])

const { createFeatureFlag } = useFeatureFlag()

const name = ref('')
const active = ref(true)

async function create () {
  if (name.value.trim() !== '') {
    await createFeatureFlag(name.value, active.value)
    name.value = ''
    active.value = true
  }

  emit('close')
}
</script>
