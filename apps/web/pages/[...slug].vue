<!-- this is the Categories/Product page  -->
<template>
  <NuxtLayout
    name="default"
    :breadcrumbs="breadcrumbs"
    class="relative"
    :class="{ 'pointer-events-none opacity-50': loading }"
  >
    <SfLoaderCircular
      v-if="loading || checkingPermission"
      class="fixed top-[50%] right-0 left-0 m-auto z-[99999]"
      size="2xl"
    />
    <template v-else>
      <CategoryPageContent
        v-if="productsCatalog?.products"
        :title="categoryGetters.getCategoryName(productsCatalog.category)"
        :total-products="productsCatalog.pagination.totals"
        :products="productsCatalog.products"
        :items-per-page="Number(productsPerPage)"
      >
        <template #sidebar>
          <div class="md:border md:border-neutral-200 md:*:border-t md:*:pt-4">
            <CategoryTree :category="productsCatalog.category" />
            <!-- <CategorySorting />
            <CategoryItemsPerPage class="mt-6" :total-products="productsCatalog.pagination.totals" /> -->
            <CategoryFilters v-if="facetGetters.hasFilters(productsCatalog.facets)" :facets="productsCatalog.facets" />
          </div>
        </template>
      </CategoryPageContent>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { categoryGetters, categoryTreeGetters, facetGetters } from '@plentymarkets/shop-api';
import { SfLoaderCircular } from '@storefront-ui/vue';

definePageMeta({ layout: false, middleware: ['category-guard'] });

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const { data: productsCatalog, productsPerPage, loading, checkingPermission } = useProducts();
const { data: categoryTree } = useCategoryTree();
const { buildCategoryLanguagePath } = useLocalization();

const breadcrumbs = computed(() => {
  if (productsCatalog.value.category) {
    const breadcrumb = categoryTreeGetters.generateBreadcrumbFromCategory(
      categoryTree.value,
      categoryGetters.getId(productsCatalog.value.category),
    );
    breadcrumb.unshift({ name: t('home'), link: '/' });

    return breadcrumb;
  }

  return [];
});

watch(
  () => locale.value,
  (changedLocale: any) => {
    router.push({
      path: buildCategoryLanguagePath(`${productsCatalog.value.languageUrls[changedLocale]}`),
      query: route.query,
    });
  },
);

const headTitle = computed(() =>
  productsCatalog.value?.category
    ? (categoryGetters.getMetaTitle(productsCatalog.value.category) || process.env.METATITLE) ?? ''
    : process.env.METATITLE ?? '',
);

const descriptionContent = computed(() =>
  productsCatalog.value?.category
    ? (categoryGetters.getMetaDescription(productsCatalog.value.category) || process.env.METADESC) ?? ''
    : process.env.METADESC ?? '',
);

const keywordsContent = computed((): string =>
  productsCatalog.value?.category
    ? (categoryGetters.getMetaKeywords(productsCatalog.value.category) || process.env.METAKEYWORDS) ?? ''
    : process.env.METAKEYWORDS ?? '',
);

useHead({
  title: headTitle,
  meta: [
    { name: 'description', content: descriptionContent },
    { name: 'keywords', content: keywordsContent },
  ],
});
</script>
