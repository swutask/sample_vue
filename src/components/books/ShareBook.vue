<template>
  <div class="flex items-center">
    <ButtonModule
      prefix="icon-share-book text-19"
      tooltipText="Share space"
      teleportTooltip
      tooltipBottom
      type="grey"
      class="p-5 rounded-6"
      @click="openModal"
    />

    <InviteTeammates v-if="showInviteModal" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
const showInviteModal = ref(false)

function openModal () {
  showInviteModal.value = true
}

function closeModal () {
  showInviteModal.value = false
}
</script>
