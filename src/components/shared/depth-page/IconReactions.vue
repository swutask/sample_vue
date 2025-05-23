<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 13 12" fill="transparent">
    <path
      d="M6.22898 2.61133C5.1395 2.61133 4.09464 3.04412 3.32427 3.8145C2.55389 4.58488 2.12109 5.62973 2.12109
    6.71921C2.12109 7.80869 2.55389 8.85355 3.32427 9.62393C4.09464 10.3943 5.1395 10.8271 6.22898 10.8271C7.31846
     10.8271 8.36332 10.3943 9.13369 9.62393C9.90407 8.85355 10.3369 7.80869 10.3369 6.71921"
      stroke="currentColor" stroke-width="0.733551" stroke-miterlimit="10"
    />
    <path
      d="M4.05957 7.61621C4.17785 7.90098 4.35099 8.15971 4.56914 8.37764C4.78686 8.59594 5.04558 8.76906 5.33042
     8.88706C5.61526 9.00506 5.92061 9.0656 6.22892 9.06522C6.53724 9.0656 6.84259 9.00506 7.12743 8.88706C7.41227
      8.76906 7.67099 8.59594 7.88871 8.37764C8.10686 8.15971 8.28 7.90098 8.39828 7.61621"
      stroke="currentColor" stroke-width="0.733551" stroke-miterlimit="10"
    />
    <path
      d="M5.0551 6.13169C5.37921 6.13169 5.64194 5.86895 5.64194 5.54485C5.64194 5.22075 5.37921 4.95801 5.0551
    4.95801C4.731 4.95801 4.46826 5.22075 4.46826 5.54485C4.46826 5.86895 4.731 6.13169 5.0551 6.13169Z"
      fill="white" stroke="currentColor" stroke-width="0.489034"
    />
    <path
      d="M7.40227 6.13169C7.72637 6.13169 7.98911 5.86895 7.98911 5.54485C7.98911 5.22075 7.72637 4.95801 7.40227
     4.95801C7.07817 4.95801 6.81543 5.22075 6.81543 5.54485C6.81543 5.86895 7.07817 6.13169 7.40227 6.13169Z"
      fill="white" stroke="currentColor" stroke-width="0.489034"
    />
    <path d="M10.3364 0.849609V4.37065" stroke="currentColor" stroke-width="0.733551" stroke-miterlimit="10" stroke-linecap="square" />
    <path d="M8.57617 2.61133H12.0972" stroke="currentColor" stroke-width="0.733551" stroke-miterlimit="10" stroke-linecap="square" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  width?: number
  height?: number
}>(), {
  width: 25,
  height: 25
})
</script>
