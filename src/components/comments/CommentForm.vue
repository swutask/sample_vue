<template>
  <div
    class="p-12 absolute z-9999 shadow-dropdown rounded-10 text-14 leading-normal text-app-color bg-primary"
    :style="commentPosition"
    @click.stop
    @keydown.backspace.stop
  >
    <UserBadge
      :first-name="profile.firstName"
      :last-name="profile.lastName"
      :color="profile.color"
      :avatarUrl="user?.avatar?.url"
      class="font-semibold items-center"
    />

    <textarea
      ref="commentInputRef"
      v-model="localComment"
      class="no-border outline-none w-[240px] bg-transparent text-app-color mt-10 "
      maxlength="255"
      rows="2"
      placeholder="Type here..."
      @keydown.esc="hideComment"
      @keydown.enter.exact.prevent.stop="setComment"
      @keydown.backspace.stop
      @paste.stop
    />
    <div class="flex justify-end items-center mt-10">
      <ButtonModule
        text="Cancel"
        :has-hover="true"
        class="text-app-color text-13 max-w-[80px] mr-12 p-5"
        @click="hideComment"
      />
      <ButtonModule
        text="Comment"
        type="black"
        class="text-13 w-full rounded-6 font-semibold max-w-[80px]
             justify-center py-6 px-20 md:hover:opacity-80"
        @click="setComment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  commentPosition: string
  text: string
}>()

const emit = defineEmits(['setComment', 'hideComment'])

const { user } = useProfile()

const localComment = ref(props.text)
const commentInputRef = ref(null)

const profile = computed<Partial<IProfile>>(() => {
  return user.value?.profile || { firstName: 'Guest', color: 'Omolon' }
})

function setComment () {
  emit('setComment', localComment.value)
  localComment.value = ''
}

function hideComment () {
  localComment.value = ''
  emit('hideComment')
}

function setFocus () {
  commentInputRef.value.focus()
}

defineExpose({
  setFocus
})
</script>
