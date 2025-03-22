<template>
    <div class="w-full p-5 overflow-x-auto no-preflight">


        test page 
    </div>
  </template>
  
  <script setup lang="ts">
  const { data, getLegalTexts } = useLegalInformation();
  
  definePageMeta({
    pageType: 'static',
  });
  
  await getLegalTexts({
    type: 'TermsConditions',
  });
  
  const getHTMLTexts = () => {
    return data.value.htmlText ?? '';
  };
  </script>
  