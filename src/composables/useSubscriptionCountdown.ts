export function useSubscriptionCountdown (expireAt: string | number | Date) {
  const currentTime = ref(Date.now()) // Reactive timestamp
  const timeToUpdate = 600000 // Update every 10 minutes
  let intervalId: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    intervalId = setInterval(() => {
      currentTime.value = Date.now()
    }, timeToUpdate)
  })

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })

  const daysLeft = computed(() => {
    const subDate = new Date(expireAt).getTime()
    const daysElapsed = Math.ceil((subDate - currentTime.value) / (1000 * 60 * 60 * 24))

    return {
      days: daysElapsed,
      title: daysElapsed === 1 ? `${daysElapsed} day` : `${daysElapsed} days`
    }
  })

  return { daysLeft }
}
