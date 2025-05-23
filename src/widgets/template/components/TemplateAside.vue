<template>
  <div>
    <div v-if="!isMobile" class="bg-primary flex flex-col justify-between h-full w-[270px] text-app-color ">
      <div class="w-full mx-auto pt-[67px] pl-30 overflow-y-auto">
        <h2 class="pl-20 mb-30 font-bold text-37">Templates</h2>

        <p
          v-for="menuItem in templatesMenu"
          :key="menuItem.title"
          :class="{'font-semibold !bg-grey-450': activeState === menuItem.type}"
          class="pl-20 py-8 leading-small cursor-pointer rounded-4 hover:bg-grey-450 bg-primary"
          @click="update(menuItem.type)"
        >
          {{ menuItem.title }}
        </p>
      </div>
    </div>

    <div v-if="isMobile && showAside" class="bg-primary flex flex-col justify-between h-full w-full text-app-color ">
      <div class="w-full pt-30 pb-50 max-w-[320px] mx-auto overflow-y-auto">
        <h2 class="pl-20 mb-30 font-bold text-24">Templates</h2>

        <div
          v-for="menuItem in templatesMenu"
          :key="menuItem.title"
          class="menu-item hover:bg-hover rounded-10 px-20 bg-grey-450"
          @click="update(menuItem.type)"
        >
          <p>{{ menuItem.title }}</p>
          <i class="text-14 icon-keyboard-arrow-left rotate-180 opacity-50" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IMenuItem {
  title: string
  type: TActiveState
}

const emit = defineEmits(['toggle'])

const { activeState, showAside, changeTemplateState } = useTemplate()
const { isMobile } = useGeneral()

const templatesMenu = [
  { title: 'All templates', type: 'All' },
  { title: 'My templates', type: 'Private' },
  { title: 'Shared templates', type: 'Shared' }
] as IMenuItem[]

function update (value: TActiveState) {
  changeTemplateState(value)

  if (isMobile.value) {
    emit('toggle')
  }
}
</script>
