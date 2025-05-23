<template>
  <teleport to="#main_section">
    <div v-if="hasInstructions" class="fixed top-0 left-0 w-full h-full z-9999">
      <div
        class="absolute text-14 rounded-10 transition-all w-[320px] border-2 border-black shadow-black-05"
        :style="wrapperPosition"
      >
        <div class="bg-primary p-16 rounded-8">
          <div v-if="activeStepId !== 'onboardingCreateTask'" class="fixed z-9999" :style="dotPosition">
            <div class="w-30 h-30 rounded-full flex items-center justify-center border-2 border-green-20 pulse-animation" />
            <div
              class="bg-green-20 w-13 h-13 rounded-full
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <p class="font-bold text-16">{{ tooltipTitle }}</p>
          <div class="mt-10 leading-[1.6] text-dark-100" v-html="tooltipDescription" />

          <!-- M O D A L  F O O T E R -->
          <div class="flex items-center mt-12" :class="onboardingDataLength > 1 ? 'justify-between' : 'justify-end'" @click.stop.prevent>
            <!-- M O D A L  S T E P S -->
            <div v-if="onboardingDataLength > 1" class="flex justify-center ml-auto mr-5">
              <span
                v-for="step in onboardingDataLength" :key="step" class="rounded-full w-6 h-6 block mr-7"
                :class="step - 1 === activeStep ? 'bg-black' : 'bg-grey-800'"
              />
            </div>

            <ButtonModule
              v-if="activeStepId !== 'onboardingCreateTask'"
              :text="isLastStep ? 'Got it' : 'Next'"
              type="black"
              class="py-7 px-14 dark:text-white"
              @click.prevent="nextStep"
            />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import onboardingData from '@/core/onboarding-data'
import localStorageService from '@/core/local-storage'
import { useKeyPress } from '@/composables/useKeyPress'

const emit = defineEmits(['close'])

const route = useRoute()
const emitter = useEmitter()
const instructionKey = ref(route.name)
const { user } = useProfile()
const { toggleNewTaskModal } = useTask()

const { innerWidth } = useGeneral()
const { team } = useTeam()
const { isSidebarCollapsed } = useSidebar()

const activeStep = ref(0)
const activeStepId = ref(null)
const dotPosition = ref()
const wrapperPosition = ref()
const hasInstructions = ref(false)
const storedInstructionsData = ref(useLocalStorage.getItem('showInstructions'))

const isProjectsPage = computed(() => route.name === 'TeamBooks')

const tooltipTitle = ref('')
const isLastStep = ref(false)
const tooltipDescription = ref('')
const onboardingDataLength = ref(1)

const observer = new IntersectionObserver(([entry]) => {
  if (entry && !entry.isIntersecting) {
    if (isProjectsPage.value && activeStep.value === 2) {
      nextStep()
    }
  }
}, { root: document.body, rootMargin: '-200px' })

watch((innerWidth), () => {
  position()
})

watch(() => route.name, (value) => {
  setTimeout(() => position(), 100)
  instructionKey.value = value
})

onMounted(() => {
  setTimeout(() => position(), 300)
})

useKeyPress('Enter', nextStep)

async function position () {
  storedInstructionsData.value = useLocalStorage.getItem('showInstructions')
  hasInstructions.value = storedInstructionsData.value[instructionKey.value]
  if (!hasInstructions.value) return

  const currentOnboardingData = ['TaskBoardTeam', 'TeamBook', 'Chat']
    .includes(instructionKey.value.toString())
    ? onboardingData[instructionKey.value]
    : onboardingData[instructionKey.value].filter(item => {
      return isSidebarCollapsed.value ? item.id.endsWith('Header') : !item.id.endsWith('Header')
    })

  const currentItem = currentOnboardingData[activeStep.value]
  activeStepId.value = currentItem.id

  tooltipTitle.value = currentItem.title
  tooltipDescription.value = typeof currentItem.description === 'function'
    ? currentItem.description(team.value.name)
    : currentItem.description

  isLastStep.value = currentOnboardingData.length === activeStep.value + 1
  onboardingDataLength.value = currentOnboardingData.length

  const onboardingBookItem = document.querySelector(`[data-onboarding-id=${currentItem.id}]`) as HTMLElement

  observer.observe(onboardingBookItem)
  await new Promise(resolve => setTimeout(resolve, 10))

  const rect = onboardingBookItem.getBoundingClientRect()

  const wrapperWidth = 320
  const gap = 30
  const dotSize = 30

  let wrapperTop = rect.bottom + gap
  let wrapperLeft = rect.left + rect.width / 2 - wrapperWidth / 2
  let dotTop = rect.bottom - dotSize / 2
  let dotLeft = rect.left + rect.width / 2 - dotSize / 2

  if (currentItem.id === 'onboardingCreateTask') {
    onboardingBookItem.classList.add('!border-dark-default', 'border-2', '!shadow-create-task', 'border-animate')
    onboardingBookItem.style.zIndex = '10001'
    onboardingBookItem.style.position = 'relative'
    onboardingBookItem.addEventListener('click', handleNewTaskClick)
  }

  if (currentItem.position) {
    dotTop = rect.top + rect.height / 2 - dotSize / 2

    switch (currentItem.position) {
      case 'calendar':
        wrapperTop = rect.top / 4
        wrapperLeft = rect.top / 2 + gap * 8
        dotTop = rect.top / 5 - gap
        dotLeft = rect.top * 2 + gap
        break

      case 'center':
        wrapperTop = rect.top + rect.height / 2 + gap
        break

      case 'right':
        wrapperLeft = rect.right + gap + dotSize
        wrapperTop = rect.top + rect.height / 2 - dotSize / 2
        dotLeft = rect.right
        break

      case 'top-center':
        dotTop = rect.top + dotSize / 2
        wrapperTop = rect.top + dotSize + gap
        break

      case 'top-middle':
        dotTop = rect.top + dotSize / 2
        dotLeft = rect.top * 8 + gap * 6
        wrapperTop = rect.top + dotSize + gap
        wrapperLeft = rect.right - rect.left * 4 - gap
        break

      case 'task-board':
        dotTop = rect.top - gap
        dotLeft = rect.top * 7 + gap
        wrapperTop = rect.top + dotSize - gap / 2
        wrapperLeft = rect.top * 4 + gap * 6
        break

      case 'new-task':
        wrapperTop = rect.top + dotSize + gap - 12
        break

      case 'top-right':
        wrapperTop = rect.top + dotSize + gap
        dotTop = rect.top + dotSize / 2
        wrapperLeft = rect.right - wrapperWidth / 2 - 150
        dotLeft = rect.right - 150 - dotSize / 2
        break

      case 'top-right-no-gap':
        wrapperTop = rect.top - wrapperWidth / 2 - 50
        wrapperLeft = rect.right - wrapperWidth
        dotLeft = rect.right - 35
        break

      case 'top-left':
        wrapperTop = rect.top
        wrapperLeft = rect.left - wrapperWidth - gap - dotSize
        dotLeft = rect.left - dotSize / 2 - gap
        break

      case 'top-left-no-gap':
        wrapperTop = rect.top - wrapperWidth / 2
        wrapperLeft = rect.left - wrapperWidth
        dotLeft = rect.left
        break
      default:
        break
    }
  }

  if (wrapperLeft < 0) {
    wrapperLeft = 10
  }

  if (wrapperLeft + wrapperWidth > window.innerWidth) {
    wrapperLeft = window.innerWidth - wrapperWidth - 10
  }

  wrapperPosition.value = `top: ${wrapperTop}px; left: ${wrapperLeft}px`
  dotPosition.value = `top: ${dotTop}px; left: ${dotLeft}px`
}

function handleNewTaskClick () {
  if (activeStepId.value === 'onboardingCreateTask') {
    setTimeout(() => toggleNewTaskModal(true), 10)

    const onboardingBookItem = document.querySelector('[data-onboarding-id=\'onboardingCreateTask\']') as HTMLElement
    if (onboardingBookItem) {
      onboardingBookItem.classList.remove('!border-dark-default', 'border-2', '!shadow-create-task', 'border-animate')
      onboardingBookItem.style.zIndex = ''
      onboardingBookItem.style.position = ''
    }

    nextStep()
  }
}

function close () {
  const localInstructions = { ...storedInstructionsData.value }
  delete localInstructions[instructionKey.value]
  storedInstructionsData.value = localInstructions

  hasInstructions.value = false
  useLocalStorage.setItem('showInstructions', localInstructions)
  activeStep.value = 0

  if (!localInstructions?.Today) {
    const localData = localStorageService.getItem('app-download-show') || {}

    const userId = user.value.id

    if (!localData[userId]) {
      localData[userId] = {}
      localData[userId].tooltipClosed = true
    }
  }

  if (Object.keys(localInstructions).length === 0) {
    emit('close')
  }
}

function nextStep () {
  nextTick(() => {
    if (isLastStep.value) {
      close()
    } else {
      activeStep.value++
      position()
    }
  })
}

emitter.on('activateInstruction', (key: string) => {
  instructionKey.value = key
  setTimeout(() => position(), 300)
})
</script>

<style lang="scss" scoped>
  .pulse-animation {
    animation-delay: 1s;
    animation: animate 1.5s linear infinite
  }

  @keyframes animate {
    0% {
      transform: scale(1);
    }

    25% {
      transform: scale(1.2);
    }

    50% {
      transform: scale(1);
    }

    75% {
      transform: scale(0.9);
    }

    100% {
      transform: scale(1);
    }
  }
</style>
