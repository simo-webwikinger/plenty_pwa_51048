<template>
  <div data-testid="product-accordion">
    <div
      ref="tablistRef"
      role="tablist"
      aria-label="Select tab"
      aria-orientation="horizontal"
      class="flex gap-2 border-b border-b-neutral-200 pb-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <button
        v-for="tab in tabs"
        :id="tabId(tab.label)"
        :key="tab.label"
        type="button"
        role="tab"
        :aria-controls="panelId(tab.label)"
        :aria-selected="isActive(tab)"
        :disabled="tab.disabled"
        :tabindex="isActive(tab) ? 0 : -1"
        :class="[
          'px-4 py-2 -mb-1 font-medium whitespace-nowrap text-neutral-500 hover:enabled:text-primary-800 active:enabled:underscore active:enabled:text-primary-900 disabled:text-disabled-500 focus-visible:outline focus-visible:-outline-offset-2 focus-visible:shadow-[inset_0_0_0_4px_rgb(255,255,255)]',
          isActive(tab) ? '!text-black border-b-2 border-primary-500' : '',
        ]"
        @click="activeTab = tab"
        @keydown="handleKeyDown"
      >
        {{ tab.label }}
      </button>
    </div>

    <div
      v-for="tab in tabs"
      :id="panelId(tab.label)"
      :key="tab.label"
      role="tabpanel"
      :aria-labelledby="tabId(tab.label)"
    >
      <div v-if="isActive(tab)" class="p-4 text-neutral-500">
        <div v-if="tab.label === t('productDetails')">
          <UiAccordionItem
            v-if="productGetters.getDescription(product)?.length"
            summary-class="md:rounded-md w-full hover:bg-neutral-100 py-2 pl-4 pr-3 flex justify-between items-center select-none"
            v-model="productDetailsOpen"
          >
            <div class="no-preflight" v-html="productGetters.getDescription(product)"></div>
          </UiAccordionItem>
        </div>
        <div v-if="tab.label === t('technicalData')">
          <UiAccordionItem
            v-if="productGetters.getTechnicalData(product)?.length"
            summary-class="md:rounded-md w-full hover:bg-neutral-100 py-2 pl-4 pr-3 flex justify-between items-center select-none"
            v-model="technicalDataOpen"
          >
            <div class="no-preflight" v-html="productGetters.getTechnicalData(product)"></div>
          </UiAccordionItem>
        </div>
        <div v-if="tab.label === t('reviews')">
          <slot name="reviews" />
        </div>
        <div v-if="tab.label === t('moreInformation')">
          <slot name="more-information" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productGetters, reviewGetters } from '@plentymarkets/shop-api';
import type { ProductAccordionPropsType } from '~/components/ProductAccordion/types';

const props = defineProps<ProductAccordionPropsType>();
const { product } = toRefs(props);
const { t } = useI18n();

const productDetailsOpen = ref(true);
const technicalDataOpen = ref(false);

interface Tab {
  label: string;
  disabled?: boolean;
}

const tabs: Tab[] = [
  { label: t('productDetails') },
  { label: t('technicalData'), disabled: true },
  { label: t('reviews') },
  { label: t('moreInformation') },
];

const tablistRef = ref<HTMLDivElement>();
const activeTab = ref<Tab>(tabs[0]);
const isActive = computed(() => (tab: Tab) => activeTab.value.label === tab.label);
const tabId = (label: string) => `${label}-tab`;
const panelId = (label: string) => `${label}-panel`;

const handleKeyDown = (event: KeyboardEvent) => {
  const elements = Array.from(tablistRef.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]') || []);
  const current = elements.findIndex((el) => event.currentTarget === el);
  const nextTab = getNextIndex(current, elements);
  const prevTab = getPreviousIndex(current, elements);
  const lastTab = elements.length - 1;
  const goTo = (index: number) => () => {
    event.stopPropagation();
    event.preventDefault();
    const goToElement = elements[index];
    goToElement.focus();
    goToElement.click();
    goToElement.scrollIntoView();
  };
  const interactionsMap = new Map([
    ['ArrowLeft', goTo(prevTab)],
    ['ArrowRight', goTo(nextTab)],
    ['Home', goTo(0)],
    ['End', goTo(lastTab)],
  ]);
  const interaction = interactionsMap.get(event.key);
  interaction?.();
};

function getPreviousIndex(current: number, elements: HTMLButtonElement[]) {
  for (let index = current - 1; index >= 0; index -= 1) {
    if (!elements[index].disabled) {
      return index;
    }
  }
  for (let index = elements.length - 1; index > -1; index -= 1) {
    if (!elements[index].disabled) {
      return index;
    }
  }
  return current;
}

function getNextIndex(current: number, elements: HTMLButtonElement[]) {
  for (let index = current + 1; index < elements.length; index += 1) {
    if (!elements[index].disabled) {
      return index;
    }
  }
  for (let index = 0; index < elements.length; index += 1) {
    if (!elements[index].disabled) {
      return index;
    }
  }
  return current;
}
</script>
