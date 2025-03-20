<template>
  <form ref="referenceRef" role="search" class="relative search-bar" @submit.prevent="handleSubmit">
    <SfInput
      ref="inputReference"
      v-model="inputModel"
      :aria-label="t('search')"
      id="search-bar"
      :placeholder="t('search')"
      class="bg-slate-100 pl-4"
      @focus="open"
    >
      <template #prefix>
        <SfLoaderCircular v-if="loading" />
        <SfIconSearch v-else />
      </template>
      <template #suffix>
        <button
          v-if="inputModel"
          type="button"
          aria-label="Reset search"
          class="flex rounded-md focus-visible:outline focus-visible:outline-offset"
          @click="handleReset"
        >
          <SfIconCancel />
        </button>
      </template>
    </SfInput>
  </form>
</template>

<script setup lang="ts">
import { SfIconCancel, SfIconSearch, SfInput, useDisclosure, SfLoaderCircular } from '@storefront-ui/vue';
import { unrefElement } from '@vueuse/core';

const props = defineProps<{
  close?: () => boolean;
}>();

const localePath = useLocalePath();
const { t } = useI18n();
const router = useRouter();
const { open } = useDisclosure();
const { updateSearchTerm } = useCategoryFilter();
const { loading } = useSearch();

const inputModel = ref('');
const inputReference = ref<HTMLSpanElement>();
const handleInputFocus = () => {
  const inputElement = unrefElement(inputReference)?.querySelector('input');
  inputElement?.focus();
};
const handleReset = () => {
  inputModel.value = '';
  handleInputFocus();
};
const handleSubmit = () => {
  props.close?.();
  updateSearchTerm(inputModel.value);
  router.push({ path: localePath(paths.search), query: { term: inputModel.value } });
  handleReset();
};

watch(inputModel, () => {
  if (inputModel.value === '') {
    handleReset();
  }
});
</script>

<style scoped>
form span {
  background-color: #f1f5f9;
  padding: 0.5rem;
  border-radius: 1.375rem;
  flex-direction: row-reverse;
}
</style>
