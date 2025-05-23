const featureFlagStore = defineStore('feature-flag', () => {
  const featureFlags = ref<IFeatureFlag[]>([])

  const isGoogleOauthShown = computed(() => {
    const ff = featureFlags.value.find(item => item.key === 'google_oauth')
    if (!ff) return true
    return ff.active
  })

  async function getFeatureFlags () {
    const { data } = await featureFlagService.getFeatureFlags()

    featureFlags.value = data.featureFlags
  }

  async function createFeatureFlag (name: string, active: boolean) {
    const { data } = await featureFlagService.createFeatureFlag(name, active)

    featureFlags.value.push(data.featureFlag)
  }

  function updateFeatureFlag (id: number, active: boolean) {
    featureFlags.value = featureFlags.value.map(item => {
      if (item.id === id) {
        item.active = active
      }

      return item
    })

    return featureFlagService.updateFeatureFlag(id, active)
  }

  function deleteFeatureFlag (id: number) {
    featureFlags.value = featureFlags.value.filter(item => item.id !== id)

    return featureFlagService.deleteFeatureFlag(id)
  }

  return {
    featureFlags,
    isGoogleOauthShown,
    getFeatureFlags,
    createFeatureFlag,
    updateFeatureFlag,
    deleteFeatureFlag
  }
})

export function useFeatureFlag () {
  const store = featureFlagStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
