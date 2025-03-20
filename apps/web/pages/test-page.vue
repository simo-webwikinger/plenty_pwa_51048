<template>
  <div>
    <h1>All Routes test</h1>
    <ul>
      <li v-for="route in routes" :key="route.path">{{ route.path }}</li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const routes = router.getRoutes();
</script>
