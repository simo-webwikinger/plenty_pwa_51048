<template>
  <SfListItem
    size="lg"
    :class="['md:py-1.5 hover:bg-gray-50', { 'font-medium': selected }]"
    data-testid="category-tree-item"
    v-if="name.length > 0"
  >
    <NuxtLink :to="localePath(href)">
      <span class="flex gap-2 items-center *:hover:scale-[1.02]">
        <span class="text-base md:text-sm capitalize flex items-center" data-testid="list-item-menu-label">
          <slot />
          {{ name }}
        </span>
        <SfCounter v-if="Number(count) > -1" class="md:text-sm font-normal">{{ count }}</SfCounter>
      </span>
      <template #suffix>
        <SfIconCheck v-if="selected" size="sm" class="text-primary-500" />
      </template>
    </NuxtLink>
  </SfListItem>
</template>

<script setup lang="ts">
import { SfCounter, SfIconCheck, SfListItem } from '@storefront-ui/vue';
import type { CategoryTreeItemType } from '~/components/CategoryTree/types';

const localePath = useLocalePath();

defineProps<CategoryTreeItemType>();
</script>
