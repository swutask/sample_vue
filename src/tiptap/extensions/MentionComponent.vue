<template>
  <NodeViewWrapper
    as="button"
    class="mention rounded-8 !m-0 'hover:bg-grey-1111 bg-grey-425 hover:bg-grey-500"
    v-bind="node.attrs"
    @click.stop
  >
    <UserBadge
      v-if="node.attrs.label === 'users'"
      :firstName="profile.firstName"
      :lastName="profile.lastName"
      :avatarUrl="profile.avatar?.url"
      :userId="profile.userId"
      :showLastName="false"
      :color="profile.color"
      :size="21"
      font-size="!text-12"
      nameClasses="text-12"
      class="inline-flex items-center select-none !leading-none"
    />

    <button v-else class="flex items-center" @click="open">
      <i class="mention-icon mr-5" :class="icon" />
      <span class="mention-title !text-13 multi-truncate !leading-tight" style="--mt-lines: 1;">{{ title }}</span>
    </button>
  </NodeViewWrapper>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import UserBadge from '@/components/shared/UserBadge.vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  components: { UserBadge, NodeViewWrapper },

  props: nodeViewProps,

  setup (props) {
    const route = useRoute()
    const router = useRouter()

    const { setModalTask } = useTask()

    const title = computed(() => {
      return props.node.attrs.title
    })

    const icon = computed(() => {
      const icons = {
        project: 'icon-article',
        task: 'icon-task-board',
        attachment: 'icon-attachment-file'
      }

      return icons[props.node.attrs?.label] || 'icon-article'
    })

    const { members, isTeamAccount } = useTeam()
    const { user } = useProfile()

    const profile = computed(() => {
      let member = null

      if (isTeamAccount.value) {
        member = members.value.find(item => item.id === props.node.attrs?.id)
      } else if (route.name !== 'Share') {
        member = user.value.profile
      }

      return member || {
        userId: props.node.attrs?.id,
        firstName: props.node.attrs?.title,
        lastName: props.node.attrs?.lastName || '',
        color: props.node.attrs?.color || '',
        avatar: {
          url: props.node.attrs?.avatar
        }
      }
    })

    function open () {
      if (route.name !== 'Share') {
        setModalTask(null)
        router.push(props.node.attrs.href)
      }
    }

    return {
      // ref
      // data
      // computed
      icon,
      title,
      profile,
      // function
      open
    }
  }
})
</script>
