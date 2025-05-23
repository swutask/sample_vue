
<template>
  <div @click.stop>
    <DropdownModule
      :prefix="`icon-more-horizontal text-20 ${iconClasses}`"
      :width="150"
      top-position="30px"
      :isTeleported="false"
      buttonOpacity="100"
      background="bg-primary dark:bg-grey-110"
      teleportTooltip
      customClasses="customClasses"
      :tooltipText="hasTooltip ? 'More' : null"
      tooltipBottom
      :buttonClasses="buttonClasses"
      is-auto-menu-position
      @click="toggleDropdown(true)"
      @close="toggleDropdown(false)"
    >
      <div>
        <div v-if="hasRename" class="hover:bg-selection rounded-t-10 group-scope text-14">
          <ButtonModule
            text="Rename"
            prefix="icon-edit mr-15"
            class="p-10 w-full"
            @click="toggleEdit"
          />
        </div>
        <div v-if="showCopyLink" class="hover:bg-selection group-scope text-14" :class="{'rounded-t-10': !hasRename}">
          <ButtonModule
            text="Copy link"
            prefix="icon-copy mr-15"
            class="p-10 w-full"
            @click="copyLink"
          />
        </div>
        <div v-if="showDownload" class="hover:bg-selection group-scope text-14">
          <ButtonModule
            text="Download"
            prefix="icon-download-1 mr-15"
            class="p-10 w-full"
            @click="download(file)"
          />
        </div>

        <div
          v-if="showOpenOriginal"
          class="hover:bg-selection group-scope text-14"
          :class="{'rounded-10': (!hasRename && !showCopyLink), 'rounded-b-10': hideDeleteButton}"
        >
          <ButtonModule
            text="Open original"
            prefix="icon-image text-14 mr-15"
            class="p-10 w-full"
            @click="openOriginalImage(file.url)"
          />
        </div>
        <div v-if="!hideDeleteButton" class="hover:bg-selection group-scope text-14 rounded-b-10">
          <ButtonModule
            text="Delete"
            prefix="icon-delete mr-15"
            class="p-10 w-full"
            @click="deleteAttachment"
          />
        </div>
      </div>
    </DropdownModule>
  </div>
</template>

<script setup lang="ts">
import { copy, openOriginalImage } from '@/core/helper-functions'

const props = withDefaults(defineProps<{
  file: IAttachment
  hasRename?: boolean
  hideDeleteButton?: boolean
  showDownload?: boolean
  showOpenOriginal?: boolean
  showCopyLink?: boolean
  hasTooltip?: boolean
  iconClasses?: string
  customClasses?: string
  buttonClasses?: string
}>(), {
  hasRename: true,
  hideDeleteButton: false,
  showDownload: true,
  showOpenOriginal: false,
  showCopyLink: true,
  buttonClasses: 'p-4'
})

const emit = defineEmits(['toggleEdit', 'delete', 'toggleDropdown'])

const { setNotification } = useGeneral()
const { deleteFromManager, download } = useAttachment()

const showMenu = ref(false)
const route = useRoute()

function toggleEdit () {
  emit('toggleEdit')
}

function copyLink () {
  const url = `${window.location.origin}${route.fullPath}&fileId=${props.file.id}`

  copy(url, () => setNotification({ uuid: window.crypto.randomUUID(), message: 'Copied!' }))
}

function deleteAttachment () {
  deleteFromManager(props.file.id)
  emit('delete')
}

function toggleDropdown (value: boolean) {
  showMenu.value = value
  emit('toggleDropdown', value)
}
</script>
