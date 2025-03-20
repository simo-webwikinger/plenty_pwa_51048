<template>
  <h6
    class="py-2 pt-2 px-4 mt-4 mb-4 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest select-none"
    data-testid="category-filters"
  >
    {{ $t('filters') }}
  </h6>
  <div class="flex flex-col gap-2 px-4 md:border-none">
    <CategoryFiltersFilter v-for="facet in facets" :key="facet.id" :facet="facet" />
  </div>
</template>

<script setup lang="ts">
import type { CategoryFiltersProps } from '~/components/CategoryFilters/types';

const props = defineProps<CategoryFiltersProps>();

const { facets } = toRefs(props);
</script>
