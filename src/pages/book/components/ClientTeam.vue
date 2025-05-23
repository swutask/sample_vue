<template>
  <div>
    <div class="flex items-center pb-5 pr-10 pt-10 bg-primary">
      <div
        class="noselect flex items-center space-x-24 cursor-pointer flex-grow text-grey-250 hover:text-grey-950"
        @click="handleBooks"
      >
        <p
          class="flex-grow tracking-[0.2px] text-13"
        >
          {{ team.name }} ({{ team.books?.length }})
        </p>

        <i class="text-10" :class="isTeamBooksHidden ? 'icon-keyboard-arrow-left' : 'icon-keyboard-arrow-down'" />
      </div>
    </div>

    <div
      v-if="(!isTeamBooksHidden && team.books?.length)"
      class="flex w-full mb-20"
      :class="booksViewType.index === 0 ? 'flex-wrap gap-x-[11px]' : 'flex-col '"
    >
      <BookItem
        v-for="item in team.books"
        :key="item.id"
        :book="item"
        :clientTeam="team"
      />

      <div
        v-if="(team.books?.length > 7)"
        class="flex items-center mt-10 mb-15 text-grey-250 anim-color cursor-pointer ml-17 hover:text-app-color"
        @click="showMore = !showMore"
      >
        <i
          class="icon-arrow-to-top mr-28"
          :class="[showMore ? '' : 'transform rotate-180']"
        />
        <button
          class="text-13"
        >
          {{ showMore ? 'Show less' : 'Show more' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  team: IClientTeams
}>()

const { booksViewType } = useBook()

const isTeamBooksHidden = ref(false)
const showMore = ref(false)

function handleBooks () {
  isTeamBooksHidden.value = !isTeamBooksHidden.value
}
</script>
