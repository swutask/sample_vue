<template>
  <div class="items-center hover:bg-menu-hover p-10 cursor-pointer" @click="click">
    <UserBadge
      :size="24"
      class="mb-5"
      hideTooltip
      :firstName="`${item.user.profile.firstName}`"
      :avatarUrl="item.user?.avatar?.url"
      nameClasses="text-13 font-semibold"
    />
    <p
      v-for="(text, index) in item.highlight.text"
      :key="item + index.toString()"
      class="truncate highlight text-13" v-html="text"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: ISearchMessage
}>()

const emit = defineEmits(['scrollToMessage', 'close'])

const router = useRouter()
const route = useRoute()

function click () {
  emit('scrollToMessage', props.item.id)

  const query = Object.assign({}, route.query)
  query.messageId = props.item.id.toString()

  router.replace({ query })
}
</script>
