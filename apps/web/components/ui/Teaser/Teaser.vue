<template>
  <section>
    <div class="relative">
      <div class="md:absolute top-1/2 left-0 z-10 md:transform md:-translate-y-1/2 p-8 md:p-12 md:pl-16 md:max-w-[600px] md:bg-transparent" 
           :class="textblack ? 'text-black bg-white' : 'text-white bg-[#cd4b00]'"
      >
        <h2 class="mb-4 font-bold text-2xl md:text-4xl uppercase md:max-w-[82%]">
          <span :class="textblack ? 'text-white' : 'text-[#DF6907]'">{{ title }}</span>
          <br />{{ subtitle }}
        </h2>
        <p class="text-sm p-3">{{ description }}</p>
        <button class="ml-5 flex items-center gap-2 transition-all duration-300 hover:translate-x-2 hover:scale-105 tracking-[0.3rem]">{{ buttontext }} <SfIconArrowForward class="rounded-[50%] pr-1 -pl-2"
          :class="textblack ? 'bg-black text-white' : 'bg-white text-[#db5b02]'"/></button>
      </div>
      <div class="relative">
        <div>
          <img :src="desktopImage" :alt="altText" class="hidden md:block !w-[100%]" />
          <div></div>
        </div>
      </div>

      <div class="-mt-2">
        <img :src="mobileImage" :alt="altText" class="block md:hidden !w-[100%]" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { TeaserProps } from '~/components/ui/Teaser/types';
import { SfIconArrowForward } from '@storefront-ui/vue';


const { title, subtitle, description, desktopImage, mobileImage, altText, buttontext, textblack } = defineProps<TeaserProps>();
</script>
<style>
h2 {
  font-size: 2.65rem;
  line-height: 3.2rem;
  letter-spacing: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900; /* Extra Bold */

  -webkit-text-stroke: v-bind('textblack ? "1px black" : "1px white"');
}
</style>
