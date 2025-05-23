<template>
  <NavigationSwitcher v-if="isSidebarCollapsed" customHeight="h-35" :routes="headerRoutes" isMainNavigation />
</template>

<script setup lang="ts">
const { team } = useTeam()
const { isClient } = useProfile()
const { isSidebarCollapsed } = useSidebar()
const { headerRoutes } = useSidebar()

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (isClient.value) {
    headerRoutes.value = [
      { name: 'TeamBooks', icon: 'icon-books-v2 text-21', text: 'Projects', isVisible: true, id: 'onboardingProjectsMenuItem', unreadCount: false, isPined: true },
      { name: 'Chat', icon: 'icon-chat-page text-17', text: 'Chat', isVisible: true, unreadCount: false, isPined: true }
    ]
  }
})

watch(() => route.query, () => {
  if (route.query?.privateChatUserId && route.name !== 'Chat') {
    router.push({
      name: 'Chat',
      params: { team: team.value?.link },
      query: {
        messageId: route.query?.messageId,
        userId: route.query?.userId,
        bookId: route.query?.bookId,
        privateChatUserId: route.query?.privateChatUserId
      }
    })
  }
}, { immediate: true })
</script>
