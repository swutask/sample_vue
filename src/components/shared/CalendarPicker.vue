<template>
  <div v-clickOutside="close" class="md:relative">
    <div class="flex" @click="toggleShow">
      <slot :isOpen="show">
        <i
          class="icon-calendar cursor-pointer p-8 text-22"
          :class="classes"
        />
      </slot>
    </div>

    <div v-if="show" class="absolute z-100 position-center-mobile-only" :class="position">
      <v-calendar
        :key="currentDate"
        :attributes="computedAttributes"
        trim-weeks
        :initialPage="initialPage"
        timezone="UTC"
        class=""
        :from-date="date"
        @update:from-page="update"
        @dayclick="dayclick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  currentDate: string | Date
  position?: string
}>(), {
  position: 'md:top-37 md:right-0'
})

const emit = defineEmits(['dayclick'])

const show = ref(false)

const date = computed(() => new Date(props.currentDate))

const classes = computed(() => {
  const prefix = show.value ? '' : 'hover:'
  return `${prefix}bg-menu-hover text-app-color rounded-6 anim-color-200`
})

const currenMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())

const initialPage = computed(() => ({
  month: new Date(props.currentDate || new Date()).getUTCMonth() + 1,
  year: new Date(props.currentDate || new Date()).getFullYear()
}))

const computedAttributes = computed(() => {
  return [
    {
      key: 'today',
      highlight: {
        class: 'bg-transparent',
        contentClass: 'text-app-color anim-color !font-bold',
        contentStyle: { fontWeight: 700 }
      },
      dates: new Date()
    }
  ]
})

function update (value) {
  currenMonth.value = value.month
  currentYear.value = value.year
}

function toggleShow () {
  show.value = !show.value
}

function close () {
  show.value = false
}

function dayclick (data) {
  emit('dayclick', data)
  close()
}
</script>
