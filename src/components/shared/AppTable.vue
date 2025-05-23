<template>
  <div class="flex flex-col overflow-hidden w-full">
    <div class="flex-grow overflow-y-auto">
      <table class="w-full table pr-10">
        <thead>
          <tr>
            <th
              v-for="header in columns"
              :key="header.prop"
              :style="{'min-width': `${header.width}px`}"
              class="sticky top-0 p-4 whitespace-nowrap text-left text-xs font-medium bg-book"
            >
              <div>
                <slot :name="`${header.prop}_header`">{{ header.label }}</slot>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="h-full w-full">
          <tr
            v-for="data in dataset"
            :key="data.id"
            class="bg-primary"
          >
            <td
              v-for="value in columns"
              :key="value"
              class="text-left text-sm"
            >
              <div class="">
                <slot :name="value.prop" :row="data">
                  {{ data[value.prop] }}
                </slot>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  columns: any[]
  dataset: any[]
}>()
</script>

<style scoped>
table {
    border-collapse: separate;
    border-spacing: 0 10px;
    margin-top: -10px; /* correct offset on first border spacing if desired */
}
td {
    border: solid 1px #ccc;
    border-style: solid none;
    padding: 10px;
}
td:first-child {
    border-left-style: solid;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
}
td:last-child {
    border-right-style: solid;
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
}
</style>
