<template>
  <DropdownModule
    ref="dropdownModuleRef"
    class="text-app-color h-full flex items-center min-w-0 shrink-0"
    :width="300"
    is-auto-menu-position
    :contentHeight="307"
    zIndex="z-9999"
    background="bg-primary dark:bg-grey-110"
    :disabled="!memberInfo || disabledDropdown"
  >
    <template #button>
      <div
        class="flex items-center w-full"
        @mouseenter="setTooltip(true)"
        @mouseleave="setTooltip(false)"
        @click="setTooltip(false)"
      >
        <!-- avatar -->
        <div
          v-if="showAvatar"
          ref="userIconRef"
          class="user-badge-icon rounded-full flex-shrink-0 flex items-center justify-center cursor-pointer"
          :style="`width:${size}px; height:${size}px;`"
          :class="{ 'mr-10': showName && hasAvatarMargin }"
        >
          <img
            v-if="avatarUrl"
            class="avatar rounded-full object-cover w-full h-full"
            :src="avatarUrl"
            alt="avatar"
          >
          <div
            v-else
            class="flex items-center justify-center rounded-full w-full h-full"
            :style="`background: ${color};`"
            :class="['hover:filter hover:brightness-90']"
          >
            <span class="initials leading-none uppercase font-medium text-[#444]" :class="fontSize">
              {{ userInitials }}
            </span>
          </div>
        </div>
        <!-- name -->
        <div
          v-if="showName && firstName"
          class="flex w-full items-center justify-between text-grey-main flex-grow truncate user-badge-name"
        >
          <slot name="name">
            <p class="truncate" :class="nameClasses">
              {{ firstName }} <span v-if="showLastName && lastName" class="ml-2">{{ lastName }}</span>
            </p>
          </slot>

          <slot name="button" />
        </div>
        <!-- tooltip -->
        <teleport to="#main_section">
          <p
            v-if="showTooltip"
            ref="tooltipRef"
            class="shadow fixed text-app-color whitespace-nowrap text-11
            border border-grey-500 px-11 py-7 rounded-8 z-9999 bg-primary"
            :style="tooltipPosition"
          >
            {{ firstName }} {{ lastName }}
          </p>
        </teleport>
      </div>
    </template>

    <UserBadgeDropdownContent
      :memberInfo="memberInfo"
      :userInitials="userInitials"
      :avatarUrl="avatarUrl"
      :color="color"
      :isClientMember="isClientMember"
      :hideSendMessageButton="hideSendMessageButton"
      :disabledDropdown="disabledDropdown"
    />
  </DropdownModule>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  showAvatar?: boolean
  firstName?: string
  lastName?: string
  position?: string
  avatarUrl?: string
  color?: string
  size?: number
  showLastName?: boolean
  showName?: boolean
  nameClasses?: string
  userId?: number
  hideTooltip?: boolean
  disabledDropdown?: boolean
  hideSendMessageButton?: boolean
  hasAvatarMargin?: boolean
  isClientMember?: boolean
}>(), {
  showAvatar: true,
  firstName: '',
  lastName: '',
  position: '',
  avatarUrl: null,
  color: '#eee',
  size: 30,
  showLastName: true,
  showName: true,
  hideTooltip: false,
  disabledDropdown: false,
  hasAvatarMargin: true
})

const { members } = useTeam()
const { clients } = useClient()

const dropdownModuleRef = ref(null)

const showTooltip = ref(false)
const userIconRef = ref(null)
const tooltipRef = ref(null)
const tooltipPosition = ref({})

let timer = null

const fontSize = computed(() => {
  switch (props.size) {
    case 21:
      return 'text-9'
    case 22:
      return 'text-10'
    case 24:
      return 'text-10'
    case 30:
      return 'text-11'
    case 34:
      return 'text-12'
    case 40:
      return 'text-14'
    default: return 'text-11'
  }
})

const memberInfo = computed(() => {
  if (props.isClientMember) {
    const item = clients.value.find(u => u.userId === props.userId)

    return {
      ...item,
      firstName: item.user.profile.firstName,
      lastName: item.user.profile.lastName,
      color: item.user.profile.color,
      email: item.user.email
    }
  } else if (members.value?.length) {
    return members.value.find(u => u.userId === props.userId) as ITeamMember
  }

  return null
}) as ComputedRef<ITeamMember>

const userInitials = computed(() => {
  const firstInitials = props.firstName?.slice(0, 1) || ''
  const lastInitials = props.lastName?.slice(0, 1) || ''

  return firstInitials + lastInitials
})

function setTooltip (value: boolean) {
  if (props.hideTooltip || props.showName) return

  showTooltip.value = value

  clearTimeout(timer)

  if (value) {
    timer = setTimeout(() => getTooltipPosition(), 50)
  }
}

function getTooltipPosition () {
  const userIconRect = userIconRef.value?.getBoundingClientRect()
  const tooltipRect = tooltipRef.value?.getBoundingClientRect()

  if (!userIconRect || !tooltipRect) return

  const halfTooltipWidth = tooltipRect.width / 2
  const halfUserIconWidth = userIconRect.width / 2

  const left = userIconRect.left - halfTooltipWidth + halfUserIconWidth

  tooltipPosition.value = `top: ${userIconRect.bottom + 5}px; left: ${left}px`
}

function toggle () {
  if (!dropdownModuleRef.value.isDropdownVisible) {
    setTimeout(() => dropdownModuleRef.value.toggle(), 100)
  }
}

defineExpose({
  toggle
})
</script>
