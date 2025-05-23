<template>
  <div class="relative w-full h-full max-w-[830px] lg:py-35 px-20 mx-auto select-none">
    <div class="flex lg:justify-between items-center justify-end">
      <p class="font-semibold text-25 items-center mb-15 hidden lg:flex">Spaces</p>

      <Switcher
        #default="{icon, tooltipText}"
        v-model="booksViewType"
        class="ml-10 bg-primary"
        height="34px"
        width="48px"
        :scale="{x: 0.82, y: 0.8}"
        :tabs="[
          { key: 'board-view', icon: 'icon-spaces text-14', tooltipText: 'Board view' },
          { key: 'list-view', icon: 'icon-task-list text-12', tooltipText: 'List view' }
        ]"
      >
        <div class="flex relative">
          <ButtonModule
            border-width="border-none"
            :prefix="icon"
            :tooltipText="tooltipText"
            teleportTooltip
            tooltipBottom
            :tooltipOptionalGap="35"
            class="px-15 py-2 m-auto outline-none"
          />
        </div>
      </Switcher>
    </div>

    <template v-if="clientTeams.length">
      <ClientTeam
        v-for="team in clientTeams"
        :key="team.id"
        :team="team"
      />
    </template>

    <div v-else class="px-15 text-grey-250 text-14">
      No shared spaces
    </div>
  </div>
</template>

<script setup lang="ts">
const { clientTeams } = useClient()
const { booksViewType } = useBook()
</script>
