<template>
  <div
    class="flex items-center text-neutral-500 justify-center mt-2 md:mt-8 mb-10 font-bold md:typography-headline-4 typography-headline-6"
  >
    <template v-for="(step, index) in steps" :key="index">
      <NuxtLink v-if="step.link" :to="step.link">
        <button
          :class="{
            'font-bold text-sky-600': activeStepIndex === index,
            'hover:text-sky-600': activeStepIndex !== index,
            'text-black': activeStepIndex > index,
          }"
          class="flex items-center"
        >
          {{ step.name }}
          <span v-if="index < steps.length - 1" class="mx-4">></span>
        </button>
      </NuxtLink>
      <button
        v-else-if="step.action"
        @click="step.action"
        :class="{
          'font-bold text-sky-600': activeStepIndex === index,
          'hover:text-sky-600': activeStepIndex !== index,
          'text-black': activeStepIndex > index,
        }"
        class="flex items-center"
      >
        {{ step.name }}
        <span v-if="index < steps.length - 1" class="mx-4">></span>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { CheckoutProgressProps } from '~/components/CheckoutProgress/types';
const props = defineProps<CheckoutProgressProps>();
</script>
