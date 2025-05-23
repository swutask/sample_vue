<template>
  <teleport to="#main_section">
    <transition name="fade">
      <div
        v-if="isModalOpen" class="fixed top-0 left-0 text-14 p-15 w-full h-full bg-backdrop flex justify-center items-center z-[150]"
        @click.self="close"
      >
        <div class="relative bg-primary max-w-[420px] w-full rounded-4 p-10 pl-20 md:pl-40 text-app-color">
          <div class="flex justify-end">
            <ButtonModule
              :has-hover="true"
              prefix="icon-close"
              class="text-app-color p-5"
              @click="close"
            />
          </div>
          <p class="text-21 font-bold text-app-color leading-none">Note info</p>
          <div class="flex text-app-color mb-20">
            <div class="mr-40">
              <div class="mt-15">
                <p class="font-bold text-app-color">Creation date</p>
                <p>{{ parseDate(project.createdAt, 'DD-MM-YYYY hh:mm') }}</p>
              </div>
              <div class="mt-15">
                <p class="font-bold text-app-color">Last updated (auto-save)</p>
                <p>{{ parseDate(project.updatedAt, 'DD-MM-YYYY hh:mm') }}</p>
              </div>
              <div class="mt-15">
                <p class="font-bold text-app-color">File size</p>
                <p>{{ size }}</p>
              </div>
            </div>
            <div>
              <div class="mt-15">
                <p class="font-bold text-app-color">Word count</p>
                <p>{{ words }}</p>
              </div>
              <div class="mt-15">
                <p class="font-bold text-app-color">Character count</p>
                <p>{{ characters }}</p>
              </div>
              <!-- <div class="mt-15">
                <p class="font-bold text-app-color">Read time</p>
                <p>4m 33s</p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { preventBodyScroll } from '@/core/helper-functions'
import { parseDate } from '@/plugins/filters'

defineProps<{
  project: IProject
  size?: string
  words?: number
}>()

const { characters } = useProject()
const isModalOpen = ref(false)

function open () {
  preventBodyScroll(true)
  isModalOpen.value = true
}

function close () {
  preventBodyScroll(false)
  isModalOpen.value = false
}

defineExpose({
  open
})
</script>
