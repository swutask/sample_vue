<template>
  <div>
    <teleport to="#main_section">
      <!-- fix or delete transition -->
      <transition name="fade">
        <div
          v-closeOnPressEsc="close"
          class="fixed top-0 left-0 pb-[50px] w-full h-full bg-primary z-9999 md:z-[107]"
        >
          <div class="flex justify-between border-b border-grey-500" @click.self="close">
            <div class="flex items-center w-full">
              <pre ref="fakeNameRef" class=" p-0 opacity-0 fixed left-0 -top-[100px] text-17 font-bold" />

              <input
                ref="titleInputRef"
                v-model="fileName"
                placeholder="Untitled"
                class="text-17 py-15 bg-transparent
                 outline-none font-bold ml-18 leading-small mr-15 truncate md:max-w-[450px] max-w-[205px]"
                :readonly="isClient"
                :maxlength="attachmentNameMaxLength"
                type="text"
                :disabled="disableComments"
                @focus="blockHotKey(true)"
                @blur="blur"
                @input="onInput"
              >

              <!--temporary hidden-->
              <AttachmentVersionControl
                v-if="currentFile && !disableComments && false"
                :key="dynamicKeyForVersionControl"
                ref="attachmentVersionControlRef"
                :file="currentFile"
                @setVersion="setVersion"
                @addVersion="addVersion"
                @deleteVersion="deleteVersion"
              />
            </div>

            <div class="flex items-center space-x-8 mr-15" @click.stop>
              <div v-if="!isMobile" class="flex items-center text-grey-975 bg-grey-150 px-10 py-5 rounded-6">
                <p class="text-13">
                  {{ file.key.split('.')[1].toUpperCase() }}
                </p>
              </div>
              <AttachmentStatus
                v-if="!disableComments && !isMobile"
                :statusId="currentVersion?.status"
                :attachmentId="currentVersion.id"
                class="hidden"
                @updateStatus="updateStatus"
              />

              <ButtonModule
                v-if="!isMobile"
                prefix="icon-download-2 text-19 mt-1 text-grey-1050"
                class="cursor-pointer px-7 py-7 rounded-8 flex items-center hover:bg-menu-hover -mr-2"
                teleportTooltip
                tooltipText="Download"
                tooltipBottom
                @click.stop="download(file)"
              />

              <ButtonModule
                v-if="!disableComments"
                :prefix="`icon-comment text-16 text-grey-1050`"
                class="hover:bg-menu-hover px-9 py-9 flex items-center rounded-8"
                teleportTooltip
                :tooltipText="isChatCollapsed ? 'Show comments' : 'Hide comments'"
                tooltipBottom
                @click="toggleChat"
              />

              <AttachmentMenu
                v-if="!isClient"
                :file="{...currentVersion, url: fileUrl}"
                :has-rename="false"
                :showDownload="false"
                :showCopyLink="showCopyLink"
                buttonClasses="hover:bg-menu-hover rounded-8 py-7 px-7"
                iconClasses="text-grey-1050"
                showOpenOriginal
                hasTooltip
                :hideDeleteButton="hideDeleteButton"
                @delete="$emit('delete')"
              />

              <ButtonModule
                prefix="icon-close text-13 text-grey-1050"
                class="hover:bg-menu-hover p-10 rounded-8"
                teleportTooltip
                tooltipText="Close"
                tooltipBottom
                @click.stop="close"
              />
            </div>
          </div>
          <div class="flex md:flex-row flex-col md:gap-[0px] gap-[30px] h-full mx-auto justify-center">
            <div
              id="wrapper"
              ref="wrapperRef"
              class="max-h-full relative overflow-y-auto flex flex-col justify-between items-center
              bg-grey-f5f5f5 w-full transition-all"
            >
              <div
                class="flex flex-col relative items-center justify-center h-full w-full"
                :class="allAttachments?.length > 1 ? 'max-h-for-attachment' : ''"
              >
                <div
                  v-if="!disableComments && !isMobile"
                  class="absolute z-[9999]"
                  :class="(mimetype === 'image' && !disableComments) ? 'cursor-annotation' : 'cursor-default'"
                  :style="`${naturalWidthForAnnotation}; ${naturalHeightForAnnotations}`"
                >
                  <div
                    class="relative"
                    :style="`${naturalWidthForAnnotation}; ${naturalHeightForAnnotations}`"
                    @click="printMousePos"
                  >
                    <ButtonModule
                      v-for="annotation in annotations"
                      :key="annotation.id"
                      class="absolute p-6"
                      :tooltipText="annotation.text"
                      tooltipTop
                      teleportTooltip
                      tooltipClasses="truncate text-13 px-10 py-7 rounded-8 z-9999 max-w-[200px]"
                      :style="printAnnotation(annotation)"
                      :showTooltipByCondition="hoveredAnnotation?.id === annotation.id ? hoveredAnnotation?.id : null"
                      @mouseenter="setHoveredAnnotation(annotation.id, true)"
                      @mouseleave="setHoveredAnnotation(null, true)"
                    >
                      <template #wrapper>
                        <AttachmentAnnotationPoint size="large" />
                      </template>
                    </ButtonModule>

                    <ButtonModule v-if="newAnnotation" class="absolute" :style="pointPosition">
                      <template #wrapper>
                        <AttachmentAnnotationPoint size="large" />
                      </template>
                    </ButtonModule>
                  </div>
                </div>

                <img
                  v-if="mimetype === 'image'"
                  ref="imgRef"
                  :src="fileUrl"
                  :alt="file.name"
                  :style="`${naturalWidth}; ${naturalHeight}`"
                  class="object-contain h-min"
                >

                <div v-else-if="mimetype === 'pdf'" class="w-full h-full">
                  <iframe
                    class="w-full h-full"
                    :src="`${fileUrl}`"
                  />
                </div>

                <div v-else-if="mimetype === 'video'">
                  <video
                    ref="videoRef"
                    :src="fileUrl"
                    controls
                    muted
                    @mouseover="playVideo"
                  />
                </div>

                <div v-else class="flex max-w-[200px] max-h-[150px]">
                  <i class="m-auto text-45 text-brand" :class="`icon-attachment-${mimetype}`" />
                </div>
              </div>

              <div
                v-if="allAttachments?.length > 1"
                class="bg-primary border-t overflow-auto
               no-scroll-bar pt-10 pb-6 border-grey-500 w-full items-center flex px-10 justify-center gap-10"
                :class="`max-h-[${footerHeight}]`"
              >
                <i
                  v-if="allAttachments.length > 5"
                  class="icon-back font-bold text-16 p-5 rounded-6 border border-grey-850
                 hover:bg-grey-200 cursor-pointer opacity-50 hover:opacity-80 card"
                  @click="moveItem('back')"
                />

                <div class="rounded-8 flex no-scroll-bar snap-x snap-center snap-mandatory overflow-auto max-w-[310px] gap-[8px]">
                  <div
                    v-for="(item, index) in allAttachments"
                    :key="item.id"
                    :ref="(el) => allAttachmentsRefs[index] = el"
                    :class="isSelected(item.id) ? 'border-black' : 'border-transparent '"
                    class="object-cover snap-center snap-always cursor-pointer rounded-10 w-[55px] h-[55px] flex-shrink-0 border-2 p-2"
                    @click="clickImage(item, index)"
                  >
                    <img
                      v-if="item.mimeType.split('/')[0] === 'image'"
                      class="w-full h-full object-cover rounded-10 cursor-pointer"
                      :src="`${item.url}?t=${new Date().getTime()}`"
                      alt="image"
                    >

                    <div v-else-if="item.mimeType.split('/')[0] === 'video'" class="h-full w-full">
                      <video
                        :src="`${item.url}?t=${new Date().getTime()}`"
                        class="rounded-10 cursor-pointer w-full h-full object-cover"
                        muted
                      />
                    </div>

                    <i
                      v-else
                      class="flex text-20 w-full h-full items-center justify-center
                      text-brand rounded-10 object-cover icon-attachment-file"
                    />
                  </div>
                </div>

                <i
                  v-if="allAttachments.length > 5"
                  class="icon-arrow-right1 font-bold text-16 p-5 rounded-6 border border-grey-850
                 hover:bg-grey-200 opacity-50 hover:opacity-80 cursor-pointer card"
                  @click="moveItem('forward')"
                />
              </div>
            </div>

            <div
              v-if="!disableComments && file.chat?.id"
              class="bg-primary flex transition-all relative border-grey-500"
              :class="[
                {'overflow-auto': isMobile},
                {'min-h-[240px]' : isMobile && !isChatCollapsed},
                isChatCollapsed ? '-right-[651px] md:min-w-0 w-0 p-0' : 'md:h-full md:min-w-[450px] md:max-w-[450px] py-10 md:border-l right-0'
              ]"
            >
              <DepthPageChat
                ref="depthPageChatRef"
                class="mb-20 mt-6 w-full"
                :fileId="+currentVersion.id"
                :fixedEditor="!isMobile"
                messageClasses="mx-15"
                imagePreviewMode
                scrollBottom
                titleClasses="font-bold mb-10 mt-5"
                :bookId="currentVersion.bookId"
                :chatId="currentVersion.chat?.id"
                :attachmentId="currentVersion.id"
                maxEditorWidth="md:w-[373px]"
                showEmptyState
              />
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'

const props = withDefaults(defineProps<{
  file: IAttachment
  allAttachments?: IAttachment[]
  hideDeleteButton?: boolean
  disableComments?: boolean
  showCopyLink?: boolean
}>(), {
  showCopyLink: true
})

const emit = defineEmits(['close', 'updateFilename', 'updateTag', 'delete', 'open', 'changeImage'])

const currentFile = ref(null)

const pointWidth = 20

const route = useRoute()
const { files } = useFile()
const { newAnnotation, hoveredAnnotation, setHoveredAnnotation, messages, countMessages, getMessages, setNewAnnotationCoordinates } = useChat()
const {
  updateAttachmentName,
  download,
  getAttachmentsById,
  updateAttachmentStatus,
  localAttachment,
  attachmentNameMaxLength
} = useAttachment()
const { isMobile } = useGeneral()
const { isClient } = useProfile()
const { setNotification, blockHotKey } = useGeneral()

const imgRef = ref()
const fakeNameRef = ref()
const titleInputRef = ref()
const depthPageChatRef = ref()
const videoRef = ref<HTMLVideoElement>()
const wrapperRef = ref<HTMLDivElement>(null)
const attachmentVersionControlRef = ref(null)
const chosenIndex = ref(0)
const lastVersion = ref(null)
const currentVersion = ref(props.file)
const pointPosition = ref(null)
const footerHeight = ref('73px')
const isInputActive = ref(false)
const isChatCollapsed = ref(true)
const allAttachmentsRefs = ref([])
const dynamicKeyForVersionControl = ref(0)
const fileName = ref(props.file.name || 'Untitled')

const isSelected = computed(() => (id: number) => (id === props.file.id))

const fileUrl = ref(props.file.url)

const mimetype = computed(() => {
  if (props.file.mimeType?.split('/')[0] === 'image') return 'image'
  if (props.file.mimeType?.split('/')[0] === 'video') return 'video'
  if (props.file.mimeType?.split('/')[1] === 'pdf') return 'pdf'
  if (props.file.mimeType === 'application/msword' || props.file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'google-docs'
  if (props.file.mimeType === 'application/vnd.ms-excel' || props.file.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return 'xls'
  return 'file'
})

const annotations = computed(() => {
  return messages.value?.[currentVersion.value?.chat?.id]?.reduce((acc, el) => {
    if (el?.annotation) acc.push(el.annotation)
    return acc
  }, []) || []
})

const hasMessages = computed(() => countMessages.value[currentVersion.value.chat.id] > 0)

const naturalHeight = ref(null)
const naturalWidth = ref(null)

const imageHeight = ref(null)
const imageWidth = ref(null)

const naturalHeightForAnnotations = ref(null)
const naturalWidthForAnnotation = ref(null)

watch(() => props.file, async () => {
  await getMessages({
    bookId: null,
    chatId: props.file.chat.id
  })

  calculateAndSetWidth()
  getImageSize()
})

watch(() => currentVersion.value, async (value) => {
  if (value && !props.disableComments) {
    await getMessages({
      bookId: value.bookId,
      chatId: value.chat?.id
    })

    isChatCollapsed.value = !hasMessages.value
  }
})

onBeforeUpdate(() => {
  allAttachmentsRefs.value = []
})

onMounted(async () => {
  currentFile.value = await getAttachmentsById({
    id: props.file.id,
    projectId: props.file.projectId,
    taskId: props.file.taskId
  })

  if (route.query['new-message']) {
    setTimeout(() => {
      depthPageChatRef.value.$el.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, 500)
  }

  getImageSize()

  if (route.query.annotationId) {
    setTimeout(() => setHoveredAnnotation(+route.query.annotationId, true), 500)
  }

  if (props.file?.subversion?.length > 0 && !route.query.fileId) {
    lastVersion.value = props.file?.subversion[props.file.subversion.length - 1]
    fileName.value = lastVersion.value?.name
  } else {
    lastVersion.value = props.file
  }

  if (route.query.fileId) {
    setVersion(props.file?.subversion?.find(e => e.id === +route.query.fileId))
  } else {
    currentVersion.value = lastVersion.value
  }

  nextTick(() => calculateAndSetWidth())
})

async function updateStatus (event: number) {
  await updateAttachmentStatus(event, currentVersion.value.id)
}

const moveItem = (direction: string) => {
  let number: number

  direction === 'back'
    ? number = (--chosenIndex.value)
    : number = (++chosenIndex.value)

  if (number >= props.allAttachments.length) {
    chosenIndex.value = 0
  }
  if (number < 0) {
    chosenIndex.value = props.allAttachments.length - 1
  }

  emit('changeImage', chosenIndex.value)
  scrollToNextImage(allAttachmentsRefs.value[chosenIndex.value], { root: false, xScroll: true })
}

const scrollToNextImage = (el: HTMLElement, options: any = {}) => {
  scrollToElement(el, options)
}

function scrollToElement (el, { root = true, xScroll = false, offsetY = 0 } = {}) {
  if (root) {
    window.scrollTo({ top: el.offsetTop - offsetY, behavior: 'smooth' })
  } else if (xScroll) {
    el.parentNode.scrollTo({ left: el.offsetLeft - el.parentElement.offsetLeft, behavior: 'smooth' })
  } else {
    el.parentNode.scrollTo({ top: el.offsetTop - el.parentElement.offsetTop, behavior: 'smooth' })
  }
}

async function clickImage (item: IAttachment, idx: number) {
  currentFile.value = await getAttachmentsById({
    id: item.id,
    projectId: item.projectId,
    taskId: item.taskId
  })

  emit('open', item)
  dynamicKeyForVersionControl.value++
  chosenIndex.value = idx

  fileName.value = currentVersion.value?.name
  fileUrl.value = item.url

  nextTick(() => getImageSize())
}

function calculateAndSetWidth () {
  fakeNameRef.value.textContent = fileName.value
  const textWidth = fakeNameRef.value.offsetWidth

  titleInputRef.value.style.width = textWidth + 'px'
}

function onInput (event) {
  nextTick(() => calculateAndSetWidth())
  save(event)
}

function setAnnotationSize () {
  setTimeout(() => {
    naturalWidthForAnnotation.value = `width: ${imgRef.value?.clientWidth}px`
    naturalHeightForAnnotations.value = `height: ${imgRef.value?.clientHeight}px`
  }, 200)
}

function getImageSize (fileUrl = null) {
  const img = new Image()
  img.src = fileUrl || props.file.url

  const rect = wrapperRef.value.getBoundingClientRect()

  img.onload = function () {
    imageHeight.value = img.naturalHeight
    imageWidth.value = img.naturalWidth

    naturalWidth.value = (rect.width < img.naturalWidth || rect.height < img.naturalHeight) ? 'max-width: 100%; max-height: 100%' : `width: ${img.naturalWidth}px`
    naturalHeight.value = rect.height < img.naturalHeight ? 'max-height: 100%; max-width: 100%' : 'height: min-content'
  }

  setAnnotationSize()
}

async function printMousePos (event: MouseEvent) {
  await getImageSize()
  isChatCollapsed.value = false
  if (!hoveredAnnotation.value?.id) {
    const rectAnnotations = imgRef.value?.getBoundingClientRect()

    nextTick(() => {
      const left = ((event.clientX - rectAnnotations.left) / rectAnnotations.width) * 100
      const top = ((event.clientY - rectAnnotations.top) / rectAnnotations.height) * 100

      const cursorHalfWidth = pointWidth / 2

      const cursorGap = Math.floor(((cursorHalfWidth * 100) / rectAnnotations.width))

      // update this after backend updates
      setNewAnnotationCoordinates(+(left - cursorGap).toFixed(), +(top - cursorGap).toFixed())

      pointPosition.value = {
        top: +(top - cursorGap).toFixed() + '%',
        left: +(left - cursorGap).toFixed() + '%'
      }
    })
  }
}

function printAnnotation (annotation: IAnnotation | IAnnotationPayload) {
  const rectAnnotations = imgRef.value?.getBoundingClientRect()

  if (rectAnnotations) {
    setAnnotationSize()

    const cursorHalfWidth = pointWidth / 4

    // update this after backend updates
    const top = ((rectAnnotations.height * annotation.y) / 100) - cursorHalfWidth
    const left = ((rectAnnotations.width * annotation.x) / 100) - cursorHalfWidth

    return { top: top + 'px', left: left + 'px' }
  }
}

function toggleChat () {
  isChatCollapsed.value = !isChatCollapsed.value
  getImageSize()
}

function close () {
  if (Object.values(files.value).some(item => item?.percent >= 0 && item.bookId === props.file.bookId)) {
    setNotification({
      uuid: window.crypto.randomUUID(),
      message: 'Your file is still uploading, please wait for it to finish'
    })
    return false
  } else {
    emit('close')
    newAnnotation.value = null
  }
}

const save = debounce((e) => {
  if (e.target.value?.trim() !== '') {
    updateAttachmentName({ id: lastVersion.value.id, name: e.target.value })

    emit('updateFilename', e.target.value)
    attachmentVersionControlRef.value.updateSelectedVersionName(e.target.value)
    fileName.value = e.target.value
  }
}, 300)

function blur () {
  blockHotKey(false)
  isInputActive.value = false

  if (fileName.value.trim() === '') {
    fileName.value = currentVersion.value?.name
    nextTick(() => calculateAndSetWidth())
  }
}

function playVideo () {
  videoRef.value.play()
}

function setVersion (attachment: IAttachment) {
  if (attachment) {
    const isChild = localAttachment.value[0].subversion.some(e => e.id === attachment?.id)
    currentVersion.value = {
      ...attachment,
      status: isChild ? attachment?.status : localAttachment.value[0]?.status
    }

    fileUrl.value = attachment?.externalVersion
      ? `${props.file.url}?versionId=${attachment?.externalVersion}`
      : `${props.file.url}`
    fileName.value = attachment?.name
    lastVersion.value = attachment
    getImageSize(fileUrl.value)
    nextTick(() => {
      calculateAndSetWidth()
    })
  }
}

function addVersion (attachment: IAttachment) {
  const arr = currentFile.value.subversion
  arr.push(attachment)
  currentFile.value.subversion = arr

  currentVersion.value = attachment
}

function deleteVersion (attachmentId: number) {
  currentFile.value.subversion = currentFile.value.subversion.filter(a => a.id !== attachmentId)
}
</script>
<style lang="scss">
.max-h-for-attachment {
  max-height: calc(100% - v-bind(footerHeight));
}
</style>
