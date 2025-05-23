<template>
  <DropdownModule background="bg-primary dark:bg-grey-110">
    <template #button="{isOpen}">
      <ButtonModule
        class="cursor-pointer px-12 py-8 flex justify-between items-center
         border-grey-400 border shadow-[0px_0px_0px_0.5px_#F2F2F2] dark:shadow-event-dark rounded-4 w-full max-w-[170px]"
      >
        <div class="text-13 mr-5">{{ computedRole.name }}</div>
        <i
          v-if="!disabled"
          class="icon-keyboard-arrow-down text-12 text-grey-11"
          :class="!isOpen ? '' : 'transform rotate-180'"
        />
      </ButtonModule>
    </template>

    <div
      v-for="(roleItem, index) in roles"
      :key="roleItem.name"
      class="cursor-pointer border-t p-12 border-grey-500 hover:bg-selection leading-normal"
      :class="[{ 'border-none': index === 0 }, index === 0 ? 'rounded-t-10' : '', index === roles.length - 1 ? 'rounded-b-10' : '']"
      @click="$emit('setRole', roleItem.type)"
    >
      <span class="font-semibold text-15 leading-tiny">{{ roleItem.name }}</span>
      <span class="font-normal text-12 leading-tiny">{{ roleItem.description }}</span>
    </div>
  </DropdownModule>
</template>

<script setup lang="ts">
import roles from '@/components/team/roles'
const props = defineProps<{
  role: string
  disabled: boolean
}>()

defineEmits(['setRole'])

const computedRole = computed(() => {
  const r = roles.find(rl => rl.type === props.role)
  if (!r) {
    return {
      name: 'No role'
    }
  }
  return r
})
</script>
