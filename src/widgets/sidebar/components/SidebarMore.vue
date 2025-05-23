<template>
  <DropdownModule
    ref="sidebarMoreRef"
    preventCloseOnClick
    :isTeleported="false"
    background="bg-primary dark:bg-grey-110"
  >
    <template #button>
      <ButtonModule
        prefix="icon-more-horizontal text-21 lg:text-20 mr-10"
        class="cursor-pointer flex items-center relative text-13
        w-full py-6 px-8 rounded-8 hover:bg-grey-f6f6f6 text-dark-1100"
        :text="isMobile ? null : 'More'"
        skipGap
      />
    </template>

    <div class="p-8 space-y-3">
      <template
        v-for="(route, idx) in routes"
        :key="route.name"
      >
        <div
          v-if="route?.toolName && route.isVisible"
          class="px-10 py-4 hover:bg-grey-150 relative rounded-8 group cursor-pointer"
          :class="setActiveStyle(route.name)"
          @click="navigate(idx)"
        >
          <div class="flex justify-between items-center">
            <ButtonModule
              :prefix="route.icon"
              class="w-full h-full text-13"
              :text="route.text"
              skipGap
            />

            <NotificationDot
              v-if="showDot(route)"
              :unreadCount="showDot(route)"
              class="absolute top-2 left-22"
            />

            <ButtonModule
              :prefix="route.isPined ? 'icon-tool-pined' : 'icon-tool-unpined'"
              class="p-3 transition duration-50 rounded-4 bg-opacity-10 cursor-pointer
                     anim-opacity hover:bg-grey-d7d7d7 hover:!opacity-100"
              :tooltipText="route.isPined ? 'Unpin from sidebar' : 'Pin to sidebar'"
              tooltipClasses="text-12 px-7 py-7 rounded-8 z-9999"
              tooltipPosition="-top-30 -translate-x-1/2"
              @click.stop="togglePin(route)"
            />
          </div>
        </div>
      </template>
    </div>
  </DropdownModule>
</template>

<script setup lang="ts">
defineProps<{
  routes: INavigationRoute[]
}>()

const { showDot, navigationHandler, setActiveStyle, updatePinValue } = useSidebar()
const { isMobile } = useGeneral()

const sidebarMoreRef = ref()

function navigate (value: number) {
  navigationHandler(value)

  sidebarMoreRef.value.close()
}

function togglePin (route: INavigationRoute) {
  updatePinValue({
    ...route,
    isPined: !route.isPined
  })
}
</script>
