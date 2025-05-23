<template>
  <div
    v-if="isMounted"
    class="max-w-[1135px] mx-auto w-full relative h-full text-app-color"
  >
    <div class="px-20 pt-[30px] md:pt-[55px] mx-auto min-h-full flex-grow flex flex-col h-full">
      <h1 class="mb-10 text-22 font-bold leading-none">Statistic</h1>

      <AppTable :columns="columns" :dataset="statistic">
        <template #createdAt_header>
          <div class="flex items-center cursor-pointer" @click="handleSorting('createdAt')">
            Sign up date
            <transition name="fade">
              <i
                v-if="orderBy === 'createdAt'"
                class="icon-arr-left text-20 ml-5 text-brand font-bold transform"
                :class="orderByAscending ? '-rotate-90' : 'rotate-90'"
              />
            </transition>
          </div>
        </template>

        <template #teamMembers_header>
          <div class="flex items-center cursor-pointer" @click="handleSorting('members')">
            Members
            <transition name="fade">
              <i
                v-if="orderBy === 'members'"
                class="icon-arr-left text-20 ml-5 text-brand font-bold transform"
                :class="orderByAscending ? '-rotate-90' : 'rotate-90'"
              />
            </transition>
          </div>
        </template>

        <template #createdAt="{ row }">
          {{ parseDate(row.createdAt) }}
        </template>

        <template #teamMembers="{ row }">
          <div v-if="row.teamMembers.length">
            <button @click.stop="toggleDropdown(row.id)">
              {{ row.teamMembers.length }} users
            </button>

            <div class="relative" @click.stop>
              <InfoDropdown v-if="show[row.id]" width="w-[250px]" title="Members" class="relative -top-15 z-[10000]" @show-dropdown="close(row.id)">
                <div class="px-12 overflow-y-auto">
                  <div v-for="(member, index) in row.teamMembers" :key="index">
                    <UserBadge
                      v-if="member.user"
                      :first-name="member?.user.profile.firstName"
                      :last-name="member?.user.profile.lastName"
                      :avatarUrl="member?.user.avatar?.url"
                      :userId="member?.user.id"
                      :color="member?.user.profile.color"
                      class="mb-4 text-15 items-center"
                    />
                  </div>
                </div>
              </InfoDropdown>
            </div>
          </div>

          <span v-else>No members</span>
        </template>

        <template #planId="{ row }">
          {{ findCurrentPlan(row) }}
        </template>

        <template #footer>
          <div class="flex mt-20">
            <PaginationModule
              :total-items="count"
              :current-page="currentPage"
              :items-per-page="itemsPerPage"
              @updatePage="updatePage"
            />
          </div>
        </template>
      </AppTable>
    </div>
  </div>
</template>

<script setup lang="ts">
const { plans } = usePlan()
const { user } = useProfile()
const router = useRouter()

const columns = [
  { label: 'Sign up date', prop: 'createdAt', width: 150 },
  { label: 'Company name', prop: 'name', width: 130 },
  { label: 'Members', prop: 'teamMembers', width: 120 },
  { label: 'Status', prop: 'planId', width: 100 }
]

const statistic = ref([])
const count = ref(0)
const currentPage = ref(1)
const itemsPerPage = ref(20)
const show = ref({})
const isMounted = ref(false)
const orderBy = ref('createdAt')
const orderByAscending = ref(false)

const { handleLoading } = useGeneral()

onMounted(() => {
  nextTick(() => {
    if (user.value.role.name !== 'admin') {
      router.go(-1)
    } else {
      isMounted.value = true
      initData()
    }
  })
})

function handleSorting (value) {
  if (orderBy.value === value) {
    orderByAscending.value = !orderByAscending.value
  } else {
    orderBy.value = value
    orderByAscending.value = true
  }

  initData()
}

function toggleDropdown (id) {
  show.value = {}
  show.value[id] = true
}

function close (id) {
  show.value[id] = false
}

function parseDate (date) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function findCurrentPlan (team) {
  const currentPlan = team.subscriptions[0]
  const planName = plans.value.find(item => item.id === currentPlan.planId)?.name

  if (currentPlan.expireAt && +new Date(currentPlan.expireAt) < +new Date()) {
    return `${planName} - Expired`
  }

  return planName
}

function initData () {
  handleLoading(true)
  statisticService.getStatistic({
    limit: itemsPerPage.value,
    page: currentPage.value,
    orderColumn: orderBy.value,
    orderDirection: orderByAscending.value ? 'ASC' : 'DESC'
  })
    .then(res => {
      statistic.value = res.data.result
      count.value = res.data.count
    })
}

function updatePage (value) {
  currentPage.value = value
  initData()
}
</script>
