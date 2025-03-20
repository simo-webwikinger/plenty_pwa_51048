<template>
  <div class="flex justify-center items-center" data-testid="category-sorting">
    <h6 class="md:text-sm text-xs text-gray-800 select-none">{{ $t('sortBy') }}:</h6>
    <div class="px-4 min-w-28 max-w-40">
      <SfSelect
        size="sm"
        v-model="selected"
        :aria-label="$t('sortBy')"
        id="sortBy"
        class="text-xs md:text-sm"
        @change="sortingChanged"
      >
        <option v-for="{ value, label } in options" :key="value" :value="value">
          {{ $t(`sortType.${label}`) }}
        </option>
      </SfSelect>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app';
import { SfSelect } from '@storefront-ui/vue';

const { getFacetsFromURL, updateSorting } = useCategoryFilter();
const route = useRoute();
const options = ref([
  {
    label: 'nameA-Z',
    value: 'texts.name1_asc',
  },
  {
    label: 'nameZ-A',
    value: 'texts.name1_desc',
  },
  {
    label: 'priceUp',
    value: 'sorting.price.avg_asc',
  },
  {
    label: 'priceDown',
    value: 'sorting.price.avg_desc',
  },
  {
    label: 'reviewsUp',
    value: 'item.feedbackDecimal_asc',
  },
  {
    label: 'reviewsDown',
    value: 'item.feedbackDecimal_desc',
  },
]);
const selected = ref(options.value[0].value);

function sortingChanged() {
  updateSorting(selected.value);
}

function sortQueryChanged() {
  const facets = getFacetsFromURL();
  selected.value = facets.sort ?? options.value[0].value;
}

sortQueryChanged();

watch(
  () => route.query.sort,
  () => {
    sortQueryChanged();
  },
);
</script>
