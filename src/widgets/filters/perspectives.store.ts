const usePerspectivesStore = defineStore('perspectives', () => {
  const perspectives = ref<IPerspective[]>([])

  const showOnTask = computed(() => {
    return perspectives.value[0]?.task?.showOnTask?.reduce((acc, item) => {
      acc[item.key] = item.selected
      return acc
    }, {} as IShowOnTaskObj)
  })

  async function getPerspectives () {
    const { data } = await perspectiveService.getPerspectives()

    perspectives.value = data.filters.map(p => ({
      ...p,
      task: p.task ? JSON.parse(p.task) : null
    }))

    return perspectives.value
  }

  async function createPerspective (payload: ICreatePerspective) {
    const { data } = await perspectiveService.createPerspective(payload)

    const perspective = {
      ...data.filter,
      task: data.filter.task ? JSON.parse(data.filter.task) : null
    }
    perspectives.value.push(perspective)
    return perspective
  }

  async function updatePerspective (data: IUpdatePerspective) {
    await perspectiveService.updatePerspectives(data)

    perspectives.value = perspectives.value.map(p => {
      return p.id === data.id ? { ...p, ...data } : p
    })
  }

  async function deletePerspective (id: number) {
    await perspectiveService.deletePerspective(id)
    perspectives.value = perspectives.value.filter(f => f.id !== id)
  }

  return {
    perspectives,
    showOnTask,
    getPerspectives,
    createPerspective,
    updatePerspective,
    deletePerspective
  }
})

export function usePerspectives () {
  const store = usePerspectivesStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
