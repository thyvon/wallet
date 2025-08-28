<script setup>
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import { Link, usePage } from '@inertiajs/vue3'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import BaseIcon from '@/Components/BaseIcon.vue'
import UserAvatarCurrentUser from '@/Components/UserAvatarCurrentUser.vue'
import NavBarMenuList from '@/Components/NavBarMenuList.vue'
import BaseDivider from '@/Components/BaseDivider.vue'

// Props
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

// Emits
const emit = defineEmits(['menu-click'])

// Use Inertia Link if routeName is set, 'a' if href, otherwise div
const is = computed(() => {
  if (props.item.routeName) return Link
  if (props.item.href) return 'a'
  return 'div'
})

// Dropdown active state
const isDropdownActive = ref(false)

// Component classes
const componentClass = computed(() => {
  const base = [
    isDropdownActive.value
      ? `navbar-item-label-active dark:text-slate-400`
      : `navbar-item-label dark:text-white dark:hover:text-slate-400`,
    props.item.menu ? 'lg:py-2 lg:px-3' : 'py-2 px-3',
  ]

  if (props.item.isDesktopNoLabel) {
    base.push('lg:w-16', 'lg:justify-center')
  }

  return base
})

// Label text (get user name from Inertia props)
const itemLabel = computed(() =>
  props.item.isCurrentUser ? usePage().props.auth.user.name : props.item.label,
)

// Click handler for menu
const menuClick = (event) => {
  emit('menu-click', event, props.item)

  if (props.item.menu) {
    isDropdownActive.value = !isDropdownActive.value
  }

  // Handle logout if needed
  if (props.item.isLogout) {
    emit('menu-click', event, { logout: true })
  }
}

// Click handler for dropdown items
const menuClickDropdown = (event, item) => {
  emit('menu-click', event, item)
}

// Reference for click outside
const root = ref(null)

const forceClose = (event) => {
  if (root.value && !root.value.contains(event.target)) {
    isDropdownActive.value = false
  }
}

onMounted(() => {
  if (props.item.menu) {
    window.addEventListener('click', forceClose)
  }
})

onBeforeUnmount(() => {
  if (props.item.menu) {
    window.removeEventListener('click', forceClose)
  }
})

// Computed href for Link or external anchor
const itemHref = computed(() => {
  if (props.item.routeName) return route(props.item.routeName)
  return props.item.href ?? null
})
</script>

<template>
  <BaseDivider v-if="item.isDivider" nav-bar />
  <component
    v-else
    :is="is"
    ref="root"
    class="block lg:flex items-center relative cursor-pointer"
    :class="componentClass"
    :href="itemHref"
    :target="item.target ?? null"
    @click="menuClick"
  >
    <div
      class="flex items-center"
      :class="{
        'bg-gray-100 dark:bg-slate-800 lg:bg-transparent lg:dark:bg-transparent p-3 lg:p-0':
          item.menu,
      }"
    >
      <UserAvatarCurrentUser v-if="item.isCurrentUser" class="w-6 h-6 mr-3 inline-flex" />
      <BaseIcon v-if="item.icon" :path="item.icon" class="transition-colors" />
      <span
        class="px-2 transition-colors"
        :class="{ 'lg:hidden': item.isDesktopNoLabel && item.icon }"
      >
        {{ itemLabel }}
      </span>
      <BaseIcon
        v-if="item.menu"
        :path="isDropdownActive ? mdiChevronUp : mdiChevronDown"
        class="hidden lg:inline-flex transition-colors"
      />
    </div>
    <div
      v-if="item.menu"
      class="text-sm border-b border-gray-100 lg:border lg:bg-white lg:absolute lg:top-full lg:left-0 lg:min-w-full lg:z-20 lg:rounded-lg lg:shadow-lg lg:dark:bg-slate-800 dark:border-slate-700"
      :class="{ 'lg:hidden': !isDropdownActive }"
    >
      <NavBarMenuList :menu="item.menu" @menu-click="menuClickDropdown" />
    </div>
  </component>
</template>

<style scoped></style>
