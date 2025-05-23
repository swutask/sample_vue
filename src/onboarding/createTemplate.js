import designConfig from '@/core/design-config'

const loadHtml2Canvas = () => import('html2canvas')

async function getCanvas (settings, body) {
  const wrapper = document.createElement('div')
  const element = document.createElement('div')
  const editor = document.createElement('div')

  wrapper.classList.add('h-full', 'max-w-1100', 'mx-auto', 'w-full', 'rounded-t-9', 'bg-canvas', 'min-h-full')
  element.classList.add('editor', 'pt-40', 'md:pt-75', 'px-20', 'md:px-25', 'pb-10', 'mx-auto', 'min-h-full', 'rounded-9', 'flex-grow', 'flex', 'flex-col', 'max-w-750', 'bg-canvas')
  editor.classList.add('editor__content', 'h-full', 'font-main', 'text-canvas-color', 'text-main', 'flex', 'flex-col', 'flex-grow', 'tracking-normal')

  editor.innerHTML = body

  element.appendChild(editor)
  wrapper.appendChild(element)
  document.body.appendChild(wrapper)

  const maxWidth = designConfig.columns[settings.columnWidth]

  const config = {
    backgroundColor: settings.theme === 'dark' ? '#201D25' : '#fff',
    proxy: `${import.meta.env.VITE_APP_API}/api/attachments/proxy`,
    height: maxWidth
  }

  const html2canvas = await loadHtml2Canvas()

  const canvas = await html2canvas.default(element, config)

  document.body.removeChild(wrapper)

  return canvas
}

export default async ({ settings, project, isShared = false, name }) => {
  const canvas = await getCanvas(settings, project.body)

  return canvas.toBlob(blob => {
    const formData = new FormData()

    formData.append('projectTitle', name)
    formData.append('projectId', project.id)
    formData.append('title', name)
    formData.append('isShared', isShared)
    formData.append('content', project.body)
    formData.append('file', new File([blob], `${new Date()}.png`))

    return templateService.add(formData)
  })
}
