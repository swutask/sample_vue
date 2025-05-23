<template>
  <DropdownModule
    ref="menuRef"
    :tooltipText="tooltipText"
    teleportTooltip
    tooltipBottom
    :prefix="`!text-18 ${menuIsOpen || showDropdown ? 'opacity-100' : 'opacity-80'}
              ${ isActive && '!text-dark-default'}
              ${dropdownIconClasses} !opacity-100`"
    :iconHasHover="false"
    class="text-app-color text-15 group-hover:opacity-80 transition duration-50
           rounded-6 bg-opacity-10 anim-opacity hover:!bg-menu-hover"
    :class="[
      menuRef?.isDropdownVisible ? 'flex opacity-100' : 'hidden group-hover:flex opacity-50 hover:opacity-100',
      {'!flex' :showAlways}
    ]"
    :width="210"
    type="icon"
    buttonClasses="!p-0 !py-2"
    is-auto-menu-position
    zIndex="z-9999"
    :contentHeight="248.5"
    background="bg-primary dark:bg-grey-110"
    @click="toggleMenu(true)"
    @close="toggleMenu(false)"
  >
    <div class="z-[1010] default-dropdown" @click.stop>
      <ButtonModule
        text="Rename"
        prefix="icon-edit mr-15"
        class="btn-classes"
        @click="toggleEdit"
      />

      <ButtonModule
        text="Copy link"
        prefix="icon-copy-link mr-15"
        class="btn-classes"
        @click="copyLink"
      />

      <ButtonModule
        v-if="isTeamAccount && !book.isSample"
        text="Invite"
        prefix="icon-supervisor-account mr-15"
        class="btn-classes"
        @click="openInviteModal('member')"
      />

      <ButtonModule
        v-if="clients?.length && isTeamAccount && !book.isSample"
        text="Observer access"
        prefix="icon-client-access mr-15"
        class="btn-classes"
        @click="openInviteModal('observers')"
      />

      <ButtonModule
        v-if="isTeamAccount && !book.isSample && !book.isToday"
        text="Duplicate space"
        prefix="icon-duplicate mr-15"
        class="btn-classes"
        @click="duplicate"
      />

      <ButtonModule
        :text="book.archivedAt ? 'Unarchive' : 'Archive'"
        prefix="icon-archive mr-15"
        class="btn-classes"
        @click="archiveBook(true)"
      />

      <ButtonModule
        text="Delete"
        prefix="icon-delete mr-15"
        class="btn-classes"
        @click="showConfirm"
      />
    </div>
  </DropdownModule>

  <ConfirmModal
    ref="confirmRef"
    title="Delete space"
    confirmBtnClass="!px-25 !py-8"
    titleClasses="text-17 font-semibold"
    confirm-btn-title="Delete"
    @confirm="handleDelete"
  >
    <p class="text-14 mt-15 mb-25">Are you sure you want to delete this space with all its content included?</p>
  </ConfirmModal>

  <InviteTeammates
    v-if="showInviteModal && !isClient"
    :type="inviteModalType"
    :book="book"
    @close="closeInviteModal"
  />
</template>

<script setup lang="ts">
import useBooks from '@/components/books/useBooks'

const props = defineProps<{
  book: IBook
  showAlways?: boolean
  tooltipText?: string
}>()

const emit = defineEmits(['toggleEdit'])

const { deleteBook } = useBook()
const { clients } = useClient()
const { isClient } = useProfile()

const confirmRef = ref(null)

const {
  // data
  menuIsOpen,
  inviteModalType,
  showInviteModal,
  // refs
  menuRef,
  // computed
  dropdownIconClasses,
  isTeamAccount,
  showDropdown,
  isActive,
  // function
  closeInviteModal,
  openInviteModal,
  archiveBook,
  toggleMenu,
  copyLink,
  duplicate,
  closeMenu
} = useBooks({ props })

function toggleEdit () {
  closeMenu()
  emit('toggleEdit')
}

function handleDelete () {
  deleteBook(props.book.id)
    .then(() => confirmRef.value.close())
}

function showConfirm () {
  closeMenu()
  confirmRef.value.open()
}
</script>

<style lang="scss">
.btn-classes {
 @apply text-app-color px-12 py-9 w-full text-13
}
</style>
