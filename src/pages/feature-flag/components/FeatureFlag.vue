<template>
  <div class="rounded-12 w-full mb-10 bg-primary px-15 board-view-border flex items-center h-[44px]">
    <div
      class="flex items-center justify-center w-18 h-18 mr-10 cursor-pointer"
      @click="updateStatus"
    >
      <i
        :class="featureFlag.active ?
          'icon-radio_btn_checked text-[#15cb54] text-18' :
          'icon-radio_btn_unchecked text-grey-cfcfcf text-19'"
      />
    </div>

    <p class="mr-10 grow">{{ featureFlag.name }}</p>

    <ButtonModule
      prefix="icon-delete"
      class="ml-auto"
      @click="deleteFF"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  featureFlag: IFeatureFlag
}>()

const { updateFeatureFlag, deleteFeatureFlag } = useFeatureFlag()
const { setNotification } = useGeneral()

async function updateStatus () {
  await updateFeatureFlag(
    props.featureFlag.id,
    !props.featureFlag.active
  )

  const status = props.featureFlag.active ? 'enabled' : 'disabled'

  setNotification({
    uuid: window.crypto.randomUUID(),
    message: `"${props.featureFlag.name}" ${status}`,
    color: ''
  })
}

async function deleteFF () {
  await deleteFeatureFlag(props.featureFlag.id)
  setNotification({
    uuid: window.crypto.randomUUID(),
    message: `"${props.featureFlag.name}" deleted`,
    color: ''
  })
}
</script>
