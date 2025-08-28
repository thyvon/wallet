<script setup>
import { ref, computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import { mdiMinus, mdiPlus } from '@mdi/js'
import { getButtonColor } from '@/colors.js'
import BaseIcon from '@/Components/BaseIcon.vue'
import AsideMenuList from '@/Components/AsideMenuList.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isDropdownList: Boolean,
})

const emit = defineEmits(['menu-click'])

// Check if menu item has color
const hasColor = computed(() => props.item && props.item.color)

// Active style for menu item
const activeInactiveStyle = computed(() =>
  hasColor.value ? '' : 'aside-menu-item-active font-bold'
)

// Dropdown open state
const isDropdownActive = ref(false)

// Menu item classes
const componentClass = computed(() => [
  props.isDropdownList ? 'py-3 px-6 text-sm' : 'py-3',
  hasColor.value
    ? getButtonColor(props.item.color, false, true)
    : 'aside-menu-item dark:text-slate-300 dark:hover:text-white',
])

// Check if item has submenu
const hasDropdown = computed(() => !!props.item.menu)

// Build href for Link or external link
const itemHref = computed(() => {
  if (props.item.route) {
    return route(props.item.route) // Laravel named route
  }
  return props.item.href ?? null // external link
})

// Handle menu click
const menuClick = (event) => {
  emit('menu-click', event, props.item)

  if (hasDropdown.value) {
    isDropdownActive.value = !isDropdownActive.value
  }

  // Handle logout
  if (props.item.isLogout) {
    emit('menu-click', event, { logout: true })
  }
}
</script>

<template>
  <li>
    <component
      :is="props.item.route || props.item.href ? Link : 'a'"
      :href="itemHref"
      class="flex cursor-pointer items-center"
      :class="componentClass"
      @click="menuClick"
    >
      <BaseIcon
        v-if="props.item.icon"
        :path="props.item.icon"
        class="flex-none"
        :class="activeInactiveStyle"
        w="w-16"
        :size="18"
      />

      <span
        class="grow text-ellipsis line-clamp-1"
        :class="[{ 'pr-12': !hasDropdown }, activeInactiveStyle]"
      >
        {{ props.item.label }}
      </span>
      <BaseIcon
        v-if="hasDropdown"
        :path="isDropdownActive ? mdiMinus : mdiPlus"
        class="flex-none"
        :class="activeInactiveStyle"
        w="w-12"
      />
    </component>

    <AsideMenuList
      v-if="hasDropdown"
      :menu="props.item.menu"
      :class="['aside-menu-dropdown', isDropdownActive ? 'block dark:bg-slate-800/50' : 'hidden']"
      is-dropdown-list
    />
  </li>
</template>

<style scoped></style>
