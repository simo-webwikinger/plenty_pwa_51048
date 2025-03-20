<!-- <template>
  <SfAccordionItem v-model="internalModelValue" :summary-class="summaryClass" data-testid="accordion-item">
    <template #summary>
      <slot name="summary">
        <p>{{ summary }}</p>
      </slot>
      <SfIconChevronLeft :class="['text-neutral-500', internalModelValue ? 'rotate-90' : '-rotate-90']" />
    </template>
    <div class="py-2 px-4">
      <slot />
    </div>
  </SfAccordionItem>
</template> -->
<template>
  <div class="accordion-item" :class="{ 'accordion-item--open': internalModelValue }">
    <!-- <slot name="summary">
      <p>{{ summary }}</p>
    </slot> -->
    <div class="accordion-item__content" v-show="internalModelValue">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import type { AccordionItemProps } from '~/components/ui/AccordionItem/types';

const props = defineProps<AccordionItemProps>();
// const { modelValue = false, summary = '', summaryClass = '' } = props;
const emit = defineEmits(['update:modelValue']);

const internalModelValue = useVModel(props, 'modelValue', emit, { passive: true });
</script>
