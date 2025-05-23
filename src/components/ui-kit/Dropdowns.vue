<template>
  <DropdownModule
    v-for="dropdownModule in dropdownModuleOptions"
    :key="dropdownModule.label"
    :width="dropdownModule?.width ? dropdownModule?.width : 330"
    :customClasses="dropdownModule?.customClasses"
    positionMenu="left"
    top-position="60px"
    :buttonClasses="dropdownModule?.buttonClasses ? dropdownModule?.buttonClasses : 'px-10 py-8 font-semibold'"
    :background="dropdownModule?.background ? dropdownModule?.background : 'bg-sidebar'"
    :text="dropdownModule?.text"
    :prefix="dropdownModule?.icon"
    :suffix="dropdownModule?.suffix"
    :buttonOpacity="dropdownModule?.buttonOpacity"
    :has-hover="dropdownModule?.iconHasHover"
    :button-opacity="dropdownModule?.buttonOpacity"
    :modelValue="dropdownModule.modelValue"
    :itemClass="dropdownModule?.itemClass"
    :disabled="dropdownModule?.disabled"
  >
    <template
      v-if="!dropdownModule?.suffix && !dropdownModule?.icon && !dropdownModule?.text &&
        (!dropdownModule?.buttonClasses || !dropdownModule?.customClasses)" #button
    >
      <div class="group border-grey-700 flex justify-between cursor-pointer border rounded-10 hover:bg-selection px-15 w-[330px]">
        <div class="flex items-center justify-between py-9 cursor-pointer truncate">
          <div class="truncate mr-10">
            <div class="flex justify-between items-center">
              <p class="text-15 font-bold leading-none mr-15">{{ dropdownModule?.label }}</p>
            </div>
          </div>
        </div>

        <i class="hidden md:block icon-keyboard-arrow-down text-12 self-center text-app-color ml-20" />
      </div>
    </template>
    <div
      class=" hover:bg-selection group-scope border-project flex items-center justify-between px-20 py-9 cursor-pointer border-b"
    >
      <div class="truncate mr-10">
        <div class="flex flex-col">
          <p v-for="defaultOption in 5" :key="defaultOption" class="">{{ defaultOption }}</p>
        </div>
      </div>
    </div>
  </DropdownModule>
</template>

<script setup>
const dropdownModuleOptions = ref([
  { label: 'Default Dropdown' },
  { label: 'Disabled Dropdown', disabled: true },
  { label: 'Background Dropdown', background: 'bg-link-color' },
  { text: 'customClasses Dropdown', customClasses: 'border-2', icon: 'icon-design mr-14 text-main-color group-scope-hover:text-app-color', buttonOpacity: '100' },
  { text: 'buttonClasses Dropdown', buttonClasses: 'bg-link-color', icon: 'icon-design mr-14 text-main-color group-scope-hover:text-app-color', buttonOpacity: '100' },
  { icon: 'icon-design mr-14 text-main-color group-scope-hover:text-app-color', text: 'Icon Dropdown', buttonOpacity: '100' },
  { icon: 'icon-design mr-14 text-main-color group-scope-hover:text-app-color', text: 'ButtonOpacity Dropdown', buttonOpacity: '30' },
  { suffix: 'icon-design mr-14 text-main-color group-scope-hover:text-app-color', text: 'SuffixIcon Dropdown', buttonOpacity: '100' },
  { label: 'WidthChange Dropdown', width: 650 }
])
</script>
