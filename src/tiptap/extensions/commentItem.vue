<template>
  <div
    class="text-app-color group mb-10 flex"
    @mouseover.stop.prevent="showInfo(true)"
    @mouseleave.stop.prevent="showInfo(false)"
  >
    <UserBadge
      :first-name="profile.firstName"
      :last-name="profile.lastName"
      :color="profile.color"
      :avatarUrl="profile.avatar?.url"
      :size="30"
      :showName="false"
      class="mr-10"
    />

    <div>
      <div class="text-15 flex items-center justify-between text-app-color flex-grow font-semibold">
        <p class="truncate">{{ profile.firstName }} {{ profile.lastName }}</p>
      </div>

      <ExpandedTextarea v-if="isEdit">
        <textarea
          ref="textareaRef"
          v-model="localComment.text"
          maxlength="255"
          rows="2"
          class="no-border w-full outline-none bg-transparent font-normal-important text-15"
          @blur="update"
          @keydown.backspace.stop
          @keydown.enter.exact.prevent.stop="update"
        />
      </ExpandedTextarea>

      <pre v-else class="font-Inter whitespace-pre-line font-normal-important bg-transparent border-none p-0 text-15">{{ comment.text }}</pre>

      <div class="">
        <div class="flex items-center font-normal-important">
          <p class="text-grey-250 text-13">{{ parseDate(comment.date, 'MMM D YYYY, HH:mm') }}</p>

          <div
            class="opacity-25 hover:opacity-100 anim-opacity text-dark-default-color"
          >
            <ButtonModule
              v-if="allowEditOrDelete"
              prefix="icon-delete md:opacity-0 group-hover:opacity-100"
              class="ml-5 p-5"
              @click="remove"
            />
          </div>
          <div class="opacity-25 hover:opacity-100 anim-opacity">
            <ButtonModule
              v-if="allowEditOrDelete"
              prefix="icon-edit md:opacity-0 group-hover:opacity-100"
              class="pl-0 p-5"
              @click="toggleEdit"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { parseDate } from '@/plugins/filters'
const props = defineProps<{
  comment: any
  user: IUser
}>()

const emit = defineEmits(['remove', 'update'])

const route = useRoute()

const textareaRef = ref(null)

const { members } = useTeam()
const localComment = ref(JSON.parse(JSON.stringify(props.comment)))
const info = ref(false)
const isEdit = ref(false)

const allowEditOrDelete = computed(() => {
  return props.user && (localComment.value.user.id === props.user.id || !localComment.value.user.id)
})

const profile = computed(() => {
  if (!localComment.value?.user?.id) return { firstName: 'Guest', color: 'Omolon' }

  let member = null

  if (route.name === 'Share') {
    member = localComment.value?.user
  } else {
    member = members?.value.find(item => item.userId === localComment.value?.user?.id)
  }

  return member || { firstName: 'Guest', color: 'Omolon' }
})

function remove () {
  emit('remove', props.comment.id)
}

function update () {
  isEdit.value = false

  if (localComment.value.text.trim() === '') {
    localComment.value.text = props.comment.text
    return
  }

  if (localComment.value.text !== props.comment.text) {
    emit('update', {
      id: localComment.value.id,
      text: localComment.value.text
    })
  }
}

function toggleEdit () {
  isEdit.value = true

  nextTick(() => {
    textareaRef.value.focus()
  })
}

function showInfo (value) {
  info.value = value
}
</script>
