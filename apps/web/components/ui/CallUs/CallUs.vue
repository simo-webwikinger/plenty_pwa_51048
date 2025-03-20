<template>
  <div class="flex justify-center items-center gap-2 callus-container">
    <div class="icon-container">
      <div class="icon">
        <SfIconCall />
      </div>
    </div>
    <div class="">
      <h3 class="tracking-normal leading-none text-xs">{{ t('account.callus') }}</h3>
      <p class="font-bold" >+49 1234 000</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfIconCall } from '@storefront-ui/vue';
const { t } = useI18n();
</script>

<style scoped>
.callus-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  transition: transform 0.3s ease-in-out;
}

.callus-container:hover .icon {
  animation: ring 0.5s infinite alternate;
}

@keyframes ring {
  0% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(-15deg);
  }
}
</style>
