const useTemplateStore = defineStore('template', () => {
  const templates = ref<ITemplate[]>([])
  const activeState = ref<TActiveState>('All')
  const showModal = ref(false)
  const showAside = ref(false)

  const hasTemplates = computed(() => templates.value.length > 0)

  function toggleTemplateModal (value: boolean) {
    showModal.value = value
  }

  function changeTemplateState (value: TActiveState) {
    activeState.value = value
  }

  function toggleTemplateAside (value: boolean) {
    showAside.value = value
  }

  function setTemplates (value: ITemplate[]) {
    templates.value = value
  }

  function handleUpdateTemplate ({ id, data }: { id: number; data: Partial<ITemplate> }) {
    const preparedTemplates = templates.value.map(item => {
      if (item.id === id) {
        return {
          ...item,
          ...data
        }
      }
      return item
    })

    templates.value = preparedTemplates
  }

  function handleDeleteTemplate (id: number) {
    const preparedTemplates = templates.value.filter(item => item.id !== id)

    templates.value = preparedTemplates
  }

  async function getTemplates (type: TActiveState) {
    const res = await templateService.getAll(type)
    return setTemplates(res.data.templates)
  }

  async function createTemplate (formData) {
    const res = await templateService.add(formData)
    const preparedTemplates = templates.value
    preparedTemplates.push(res.data.template)
    setTemplates(preparedTemplates)
  }

  async function updateTemplate ({ id, title, isShared }: { id: number; title: string; isShared: boolean }) {
    await templateService.update({ id, title, isShared })
    handleUpdateTemplate({
      id,
      data: {
        title,
        teamId: isShared
      }
    })
  }

  async function deleteTemplate (id: number) {
    await templateService.delete(id)
    return handleDeleteTemplate(id)
  }

  function orderTemplates ({ ids }: { ids: number[] }) {
    return templateService.order(ids)
  }

  function paste (templateId, projectId) {
    return templateService.paste({
      templateId,
      projectId
    })
  }

  return {
    // ref
    templates,
    showModal,
    showAside,
    activeState,
    hasTemplates,
    // function
    paste,
    setTemplates,
    getTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    orderTemplates,
    toggleTemplateModal,
    changeTemplateState,
    toggleTemplateAside,
    handleUpdateTemplate,
    handleDeleteTemplate
  }
})

export function useTemplate () {
  const store = useTemplateStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
