<template>
  <DropdownModule
    class="text-app-color h-full flex items-center mr-10 cursor-default"
    :width="250"
    zIndex="z-[200]"
    positionDirection="left"
    background="bg-primary dark:bg-grey-110"
    :isTeleported="true"
  >
    <template #button="{isOpen}">
      <div class="flex items-center cursor-pointer text-grey-975 bg-grey-150 pl-10 pr-5 py-5 rounded-6">
        <p class="text-13">
          Version {{ selectedVersion.version }}
        </p>

        <i
          class="icon-arrow-top text-16 ml-5"
          :class="isOpen ? '' : 'transform rotate-180'"
        />
      </div>
    </template>
    <div class="select-none p-15 cursor-default">
      <div
        v-for="value in versions"
        :key="value.name"
        class="text-app-color text-14 py-9 px-10 rounded-10 mb-10 p-5 hover:bg-menu-hover cursor-pointer group"
        @click="select(value)"
      >
        <div class="flex justify-between w-full items-center truncate">
          <div class="flex items-center truncate">
            <div
              class="text-12 mr-10 h-34 w-34 flex items-center justify-center rounded-6 bg-grey-50 font-bold flex-shrink-0"
            >
              V{{ value.version }}
            </div>
            <div class="truncate">
              <p class="leading-small font-medium truncate mb-3">{{ value.name }}</p>
              <p class="leading-small text-11 text-grey-250 truncate">
                Uploaded {{ getTime(value.createdAt) }}
              </p>
            </div>
          </div>

          <ButtonModule
            v-if="value.version > 1"
            :has-hover="true"
            prefix="icon-delete"
            class="text-app-color p-3 pr-3 hidden group-hover:flex"
            @click.stop="deleteFile(value.id)"
          />

          <i
            v-if="selectedVersion.version === value.version"
            class="icon-check text-18"
            :class="{'group-hover:hidden': value.version > 1}"
          />
        </div>
      </div>

      <!-- attach file button -->
      <div class="flex cursor-pointer mt-15" @click="openImageUploader">
        <ButtonModule
          type="black"
          text="Upload new version"
          class="text-14 justify-center px-28 py-16 w-full font-semibold md:hover:opacity-80"
        />

        <input ref="inputImageRef" class="hidden" type="file" @change="uploadImageFromInput">
      </div>
    </div>
  </DropdownModule>
</template>
<script setup lang="ts">
import ImageUploadMixin from '@/mixins/ImageUploadMixin'
import { getTime } from '@/core/helper-functions'

const props = defineProps<{
  file: IAttachment
}>()

const emit = defineEmits(['setVersion', 'addVersion', 'deleteVersion', 'delete'])
const route = useRoute()

const { addNewVersionToAttachments, deleteVersion, deleteFromManager } = useAttachment()

const inputImageRef = ref<HTMLInputElement>(null)
const selectedVersion = ref(null)

const versions = computed(() => {
  const allVersions = props.file?.subversion?.length > 0 ? [...props.file.subversion] : []
  allVersions.unshift(props.file)
  return allVersions.reverse()
})

watch(() => versions.value?.length, _ => {
  selectedVersion.value = route.query.fileId ? versions.value.find(e => e.id === +route.query.fileId) : versions.value[0]
  select(selectedVersion.value)
}, {
  immediate: true
})

watch(() => route.query.fileId, (value) => {
  if (value) {
    selectedVersion.value = versions.value.find(e => e.id === +value)
    select(selectedVersion.value)
  }
})

function select (value: IAttachment) {
  selectedVersion.value = value
  emit('setVersion', value)
}

const imageUpload = ImageUploadMixin({
  bookId: route.params.id,
  showInFileManager: false
})

async function uploadImageFromInput (event: Event) {
  const allFiles = (event.target as HTMLInputElement).files

  const attachments = Array.from(allFiles)

  if (attachments.length === 0) return

  const images = await imageUpload.upload(attachments, props.file)

  if (images.length > 0) {
    addNewVersionToAttachments(props.file.id, images[0])
    emit('addVersion', images[0])
  }
}

function openImageUploader () {
  inputImageRef.value.click()
}

function deleteFile (id: number) {
  if (props.file.id === id) {
    deleteFromManager(props.file.id)
  } else {
    deleteVersion(props.file.id, id)
    emit('deleteVersion', id)
  }
}

function updateSelectedVersionName (name) {
  selectedVersion.value.name = name
}

defineExpose({
  updateSelectedVersionName
})
</script>
