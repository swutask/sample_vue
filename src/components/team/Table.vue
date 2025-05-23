<template>
  <div class="w-full pr-2 text-14">
    <!-- header -->
    <div v-if="!hideHeader" class="flex items-center font-medium ml-10" :class="{'justify-between': isClient}">
      <div
        v-for="item in menuItems"
        v-show="item.show"
        :key="item.name"
        class="shrink-0"
        :class="!isClient ? item.class : 'w-[140px]'"
      >
        <div
          class="py-5 px-10 rounded-8 flex items-center anim-color text-13"
          :class="{'hover:bg-grey-150 cursor-pointer': sortByItem.includes(item.name) && !isClient}"
          @click="sort(item.name)"
        >
          {{ item.name }}
          <transition name="fade">
            <i
              v-if="item.name === sortedBy && sortByItem.includes(item.name) && !isClient"
              class="icon-arr-left text-13 ml-5 font-bold transform"
              :class="sortDirection ? '-rotate-90' : 'rotate-90'"
            />
          </transition>
        </div>
      </div>
      <div v-if="!isClient" class="w-[160px] flex py-5 px-10 shrink-0 text-13">Location & timezone</div>
      <div v-if="!isClient" class="w-[40px] text-start shrink-0 text-13 ml-auto">Billing</div>
      <div v-if="!isClient" class="w-[40px] text-center shrink-0"><div class="opacity-0" /></div>
    </div>

    <!-- content -->
    <div class="pl-2">
      <div v-if="members && members.length === 0" class="my-20 text-grey-300">
        {{ noMembersMessage }}
      </div>

      <div v-else class="mt-10">
        <component
          :is="components[component]"
          v-for="member in members"
          :key="member.id"
          :member="member"
          class="mb-10"
        />
      </div>
    </div>

    <!-- footer -->
    <div v-if="!hideFooter" class="py-7 flex">
      <PaginationModule
        :total-items="totalMembers"
        :current-page="page"
        :items-per-page="limit"
        @updatePage="updatePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Member from '@/components/team/Member.vue'
import Client from '@/components/team/Client.vue'
import TemporaryClient from '@/components/team/TemporaryClient.vue'
import TemporaryMember from '@/components/team/TemporaryMember.vue'

const props = withDefaults(defineProps<{
  members: ITeamMember[] | IClient[] | ITemporaryClient[]
  totalMembers?: number
  sortByItem?: string[]
  isClient?: boolean
  component?: string
  hideHeader?: boolean
  hideFooter?: boolean
  noMembersMessage?: string
  searchValue?: string
}>(), {
  sortByItem: () => ['Name', 'Spaces', 'Role'],
  component: 'Member',
  searchValue: ''
})

const components = {
  Member,
  Client,
  TemporaryClient,
  TemporaryMember
}

const emit = defineEmits(['getMembers'])

const sortedBy = ref('Name')
const sortDirection = ref(true)
const page = ref(1)
const limit = ref(20)

const menuItems = computed(() => {
  return [
    {
      name: 'Name',
      class: 'w-[240px] flex anim-opacity -ml-8 mr-10',
      show: true
    },
    {
      name: 'Email',
      class: 'w-[250px] flex',
      show: true
    },
    {
      name: 'Spaces',
      class: 'w-[130px] flex',
      show: true
    },
    {
      name: 'Role',
      class: 'w-[150px] flex',
      show: !props.isClient
    }
  ]
})

function sort (value: string) {
  if (!props.sortByItem.includes(value)) return

  if (sortedBy.value === value) {
    sortDirection.value = !sortDirection.value
  } else {
    sortedBy.value = value
    sortDirection.value = true
  }

  getMember()
}

function getMember () {
  emit('getMembers', {
    limit: limit.value,
    page: page.value - 1,
    column: sortedBy.value.toLowerCase(),
    direction: sortDirection.value ? 'ASC' : 'DESC',
    search: props.searchValue
  })
}

function updatePage (value) {
  page.value = value
  getMember()
}
</script>
