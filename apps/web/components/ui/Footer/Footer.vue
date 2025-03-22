<template>
  <footer class="pt-10 bg-brown md:mb-0" data-testid="footer" :class="simplifiedFooter ? 'mb-0' : 'mb-[58px]'">
    <div class="flex justify-center items-center gap-4">
      <!-- add social links here -->
      <ul class="flex gap-4">
        <li class="border-r border-white pr-2">
          <UiButton variant="secondary" aria-label="Youtube">
            <SfIconYoutube size="sm" />
          </UiButton>
        </li>
        <li class="border-r border-white pr-2">
          <UiButton variant="secondary" aria-label="Facebook">
            <SfIconFacebook size="sm" />
          </UiButton>
        </li>
        <li class="border-r border-white pr-2">
          <UiButton variant="secondary" aria-label="Instagram">
            <SfIconInstagram size="sm" />
          </UiButton>
        </li>
        <li>
          <UiButton variant="secondary" aria-label="Pinterest">
            <SfIconPinterest size="sm" />
          </UiButton>
        </li>
      </ul>
    </div>
    <!-- <div
      class="grid justify-center grid-cols-[1fr_1fr] md:grid-cols-[repeat(4,1fr)] px-4 md:px-6 pb-10 max-w-screen-3xl mx-auto"
      data-testid="section-top"
    > -->
    <div
      class="flex space-between md:justify-center gap-2 flex-wrap md:flex-nowrap px-4 md:px-6 pb-10 pt-6 max-w-screen-3xl mx-auto"
      data-testid="section-top"
    >
      <div
        v-for="{ key, subcategories } in categories"
        :key="key"
        class="flex flex-row first:border-r first:border-white first:pr-[0.2rem] md:border-none"
      >
        <!-- <div class="ml-4 text-lg font-medium leading-7 text-neutral-900">
          {{ $t(`categories.${key}.label`) }}
        </div> -->
        <ul class="flex flex-nowrap md:flex-wrap flex-col md:flex-row">
          <SfListItem
            v-for="{ key: subcategoryKey, link } in subcategories"
            :key="subcategoryKey"
            class="py-2 !bg-transparent md:typography-text-md typography-text-sm max-w-fit"
          >
            <SfLink
              :tag="NuxtLink"
              class="text-zinc-400 no-underline hover:text-white"
              variant="secondary"
              :to="localePath(link)"
            >
              {{ $t(`categories.${key}.subcategories.${subcategoryKey}`) }}
            </SfLink>
          </SfListItem>
        </ul>
      </div>
    </div>
    <hr />

    <!-- <div class="bg-neutral-900" data-testid="section-bottom">
      <div class="justify-end px-4 py-10 md:flex md:py-6 max-w-screen-3xl mx-auto">
        <p class="flex items-center justify-center leading-5 text-center typography-text-sm text-white/50 md:ml-6">
          {{ companyName }}
        </p>
      </div>
    </div> -->
  </footer>
</template>

<script setup lang="ts">
import {
  SfLink,
  SfListItem,
  SfIconPinterest,
  SfIconYoutube,
  SfIconInstagram,
  SfIconFacebook,
} from '@storefront-ui/vue';
import { categories } from '~/mocks';
import type { FooterProps } from './types';

const storename: string = useRuntimeConfig().public.storename;

const companyName: string = `© ${storename} ${new Date().getFullYear()}`;

const { simplifiedFooter = false } = defineProps<FooterProps>();

const localePath = useLocalePath();
const NuxtLink = resolveComponent('NuxtLink');
</script>

<style scoped>
/* Divider Style */
.divider {
  width: 1px;
  height: 24px;
  background-color: #ccc;
  margin: 0 10px;
}
</style>
