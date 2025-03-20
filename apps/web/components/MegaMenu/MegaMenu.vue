<template>
  <header :class="headerClass" ref="referenceRef" class="relative w-full md:sticky md:shadow-md">
    <div v-if="showBanner" class="bg-sky-600 text-sm text-center py-2 relative">
      {{ bannerMessage }}
      <button @click="closeBanner" class="absolute top-0 right-0 mt-2 mr-2 text-slate-400">✕</button>
    </div>
    <!-- top nav links -->
    <div class="hidden md:block bg-white border-b-[1.7px] border-b-neutral-200 border-b-solid">
      <div class="flex justify-between items-center px-4 md:px-24 py-2 text-neutral-700 text-sm">
        <div class="flex items-center">
          <span class="mr-4 hidden md:inline md:text-sm">FREE RETURNS. STANDARD SHIPPING ORDERS $99+</span>
        </div>
        <div class="flex items-center text-xs md:text-sm flex-wrap justify-center md:justify-end w-full md:w-auto">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="localePath(link.path)"
            class="mr-4 hover:text-neutral-900"
          >
            {{ link.label }}
          </NuxtLink>
          <!-- Social links -->
          <SfIconFacebook size="sm" class="ml-4 hidden md:inline text-neutral-700 hover:text-neutral-900" />
          <SfIconTwitter size="sm" class="ml-2 hidden md:inline text-neutral-700 hover:text-neutral-900" />
          <SfIconInstagram size="sm" class="ml-2 hidden md:inline text-neutral-700 hover:text-neutral-900" />
        </div>
      </div>
    </div>

    <div
      class="flex justify-between items-center md:gap-8 flex-wrap md:flex-nowrap px-4 md:px-24 py-2 md:py-5 w-full border-0 bg-white border-neutral-200"
      data-testid="navbar-top"
    >
      <div class="flex items-center md:w-auto">
        <UiButton
          v-if="viewport.isLessThan('lg')"
          variant="tertiary"
          square
          :aria-label="t('closeMenu')"
          class="mr-2"
          @click="openMenu([])"
        >
          <SfIconMenu/>
        </UiButton>

        <!-- Logo -->
        <NuxtLink
          :to="localePath(paths.home)"
          :aria-label="t('goToHomepage')"
          class="flex shrink-0 w-full lg:w-48 items-center mr-auto text-white md:mr-10 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
        >
          <span class="text-sky-600 text-2xl font-bold tracking-tight">PlentyOne</span>
        </NuxtLink>
      </div>

      <slot />
    </div>

    <div v-if="viewport.isGreaterOrEquals('lg')">
      <nav ref="floatingRef" class="relative">
        <ul
          class="flex mx-24 py-4 gap-10 bg-white text-neutral-700 font-semibold border-b-1 border-neutral-200 border-solid border-t"
          @blur="
            (event) => {
              if (!(event.currentTarget as Element).contains(event.relatedTarget as Element)) {
                close();
              }
            }
          "
        >
          <!-- Home Link -->
          <li>
            <NuxtLink :to="localePath(paths.home)" class="hover:text-neutral-900" exact-active-class="active-link">{{ t('home') }}</NuxtLink>
          </li>

          <!-- Category Dropdown -->
          <li class="group" @mouseenter="open()" @mouseleave="close()">
            <div :class="{ 'active-link': isCategoryActive }">
              <span class="hover:text-neutral-900 cursor-pointer">{{ t('category') }}</span>
              <SfIconChevronRight
                class="rotate-90 text-neutral-500 group-hover:text-neutral-700 group-active:text-neutral-900"
              />
            </div>
            <transition
              enter-active-class="transform transition duration-500 ease-in-out"
              leave-active-class="transform transition duration-500 ease-in-out"
              enter-from-class="-translate-x-full md:translate-x-0 md:opacity-0"
              enter-to-class="translate-x-0 md:translate-x-0 md:opacity-100"
              leave-from-class="translate-x-0 md:opacity-100"
              leave-to-class="-translate-x-full md:translate-x-0 md:opacity-0"
            >
              <SfDrawer
                ref="drawerRef"
                v-model="isOpen"
                disable-click-away
                placement="top"
                class="grid grid-cols-1 md:gap-x-6 md:grid-cols-4 bg-white shadow-lg max-h-screen overflow-y-auto md:!absolute md:!top-[70%] max-w-[376px] md:max-w-full p-6 md:px-24"
              >
                <div
                  class="sticky top-0 flex items-center justify-between py-2 px-4 bg-primary-700 md:hidden w-full max-w-[376px]"
                >
                  <SfButton
                    square
                    variant="tertiary"
                    aria-label="Close navigation menu"
                    class="text-white ml-2"
                    @click="close()"
                    @keydown.enter.space="close()"
                  >
                    <SfIconClose />
                  </SfButton>
                </div>
                <div v-for="(menuNode, index) in categoryTree" :key="index" class="[&:nth-child(2)]:pt-0 pt-6 md:pt-0">
                  <NuxtLink :to="localePath(generateCategoryLink(menuNode))">
                    <h2
                      role="presentation"
                      class="typography-text-base font-medium text-neutral-900 whitespace-nowrap p-4 md:py-1.5"
                    >
                      {{ categoryTreeGetters.getName(menuNode) }}
                    </h2>
                  </NuxtLink>
                  <hr class="mb-3.5" />
                  <ul>
                    <li v-for="child in menuNode.children" :key="child.id">
                      <NuxtLink :to="localePath(generateCategoryLink(child))">
                        <SfListItem
                          tag="div"
                          size="sm"
                          role="none"
                          class="typography-text-base md:typography-text-sm py-4 md:py-1.5"
                        >
                          {{ categoryTreeGetters.getName(child) }}
                        </SfListItem>
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
                <SfButton
                  square
                  size="sm"
                  variant="tertiary"
                  aria-label="Close navigation menu"
                  class="hidden md:block md:absolute md:right-0 hover:bg-white active:bg-white"
                  @click="close()"
                >
                  <SfIconClose class="text-neutral-500" />
                </SfButton>
              </SfDrawer>
            </transition>
          </li>
          <!-- Considering the required Products page to be Categories page
          <li>
            <NuxtLink :to="localePath(paths.product)" class="hover:text-neutral-900"> Products </NuxtLink>
          </li> -->
          <!-- Blog Link -->
          <li>
            <NuxtLink :to="localePath('/blog')" class="hover:text-neutral-900" exact-active-class="active-link">{{ t('blog') }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <template v-else>
      <div v-if="isOpen" class="fixed z-[50] inset-0 bg-neutral-500 bg-opacity-50" />
      <SfDrawer
        ref="drawerReference"
        v-model="isOpen"
        placement="left"
        class="right-12 max-w-96 bg-white overflow-y-auto z-[1000]"
      >
        <nav>
          <div class="flex items-center justify-between p-4 border-b border-b-neutral-200 border-b-solid">
            <p class="typography-text-base font-medium">Browse products</p>
            <UiButton variant="tertiary" square :aria-label="t('closeMenu')" class="ml-2" @click="close()">
              <SfIconClose class="text-neutral-500" />
            </UiButton>
          </div>
          <ul class="mt-2 mb-6" v-if="activeMenu">
            <li v-if="activeMenu.id !== 0">
              <SfListItem
                size="lg"
                tag="button"
                type="button"
                class="border-b border-b-neutral-200 border-b-solid"
                @click="goBack()"
              >
                <div class="flex items-center">
                  <SfIconArrowBack class="text-neutral-500" />
                  <p class="ml-5 font-medium">{{ categoryTreeGetters.getName(activeMenu) }}</p>
                </div>
              </SfListItem>
            </li>
            <template v-for="node in activeMenu.children" :key="node.id">
              <li v-if="node.childCount === 0">
                <SfListItem size="lg" :tag="NuxtLink" :href="localePath(generateCategoryLink(node))" @click="close()">
                  <div class="flex items-center">
                    <p class="text-left">{{ categoryTreeGetters.getName(node) }}</p>
                    <SfCounter class="ml-2">{{ categoryTreeGetters.getCount(node) }}</SfCounter>
                  </div>
                </SfListItem>
              </li>
              <li v-else>
                <SfListItem size="lg" tag="button" type="button" class="!p-0">
                  <div class="flex items-center w-100">
                    <NuxtLink class="flex-1 m-0 p-4 pr-0" :to="localePath(generateCategoryLink(node))" @click="close()">
                      <div class="flex items-center">
                        <p class="text-left">{{ categoryTreeGetters.getName(node) }}</p>
                        <SfCounter class="ml-2">{{ categoryTreeGetters.getCount(node) }}</SfCounter>
                      </div>
                    </NuxtLink>
                    <div class="flex justify-center items-center h-8 w-16" @click="goNext(node.id)">
                      <SfIconChevronRight class="text-neutral-500" />
                    </div>
                  </div>
                </SfListItem>
              </li>
            </template>
          </ul>
        </nav>
      </SfDrawer>
    </template>
  </header>
</template>

<script lang="ts" setup>
import { type CategoryTreeItem, categoryTreeGetters } from '@plentymarkets/shop-api';
import {
  SfIconClose,
  SfDrawer,
  SfListItem,
  SfIconChevronRight,
  SfCounter,
  SfIconArrowBack,
  SfIconMenu,
  useTrapFocus,
  useDropdown,
  SfButton,
  SfIconFacebook,
  SfIconTwitter,
  SfIconInstagram,
} from '@storefront-ui/vue';
import { unrefElement } from '@vueuse/core';
import type { MegaMenuProps } from '~/components/MegaMenu/types';
import { paths } from '~/utils/paths';

const { t } = useI18n();
const viewport = useViewport();
const localePath = useLocalePath();
const { buildCategoryMenuLink } = useLocalization();
const NuxtLink = resolveComponent('NuxtLink');
const props = defineProps<MegaMenuProps>();
const { close, open, isOpen, activeNode, category, setCategory } = useMegaMenu();
const { referenceRef, floatingRef, style } = useDropdown({
  isOpen,
  onClose: close,
  placement: 'bottom-start',
  middleware: [],
});
const categoryTree = ref(categoryTreeGetters.getTree(props.categories));

const findNode = (keys: number[], node: CategoryTreeItem): CategoryTreeItem => {
  if (keys.length > 1) {
    const [currentKey, ...restKeys] = keys;
    return findNode(restKeys, node.children?.find((child) => child.id === currentKey) || node);
  } else {
    return node.children?.find((child) => child.id === keys[0]) || node;
  }
};

const generateCategoryLink = (category: CategoryTreeItem) => {
  return buildCategoryMenuLink(category, categoryTree.value);
};

const drawerReference = ref();
const megaMenuReference = ref();
const triggerReference = ref();

const activeMenu = computed(() => (category.value ? findNode(activeNode.value, category.value) : null));

const trapFocusOptions = {
  activeState: isOpen,
  arrowKeysUpDown: true,
  initialFocus: 'container',
} as const;
useTrapFocus(
  computed(() => megaMenuReference.value?.[0]),
  trapFocusOptions,
);
useTrapFocus(drawerReference, trapFocusOptions);

const openMenu = (menuType: number[]) => {
  activeNode.value = menuType;
  open();
};

const goBack = () => {
  activeNode.value = activeNode.value.slice(0, -1);
};

const goNext = (key: number) => {
  activeNode.value = [...activeNode.value, key];
};

const focusTrigger = (index: number) => {
  unrefElement(triggerReference.value[index]).focus();
};

setCategory(categoryTree.value);

watch(
  () => props.categories,
  async (categories: CategoryTreeItem[]) => {
    categoryTree.value = categoryTreeGetters.getTree(categories);
    setCategory(categoryTree.value);
  },
);

const headerClass = computed(() => ({
  'z-[10]': isOpen.value,
}));

const bannerMessage = ref('Get 20% off on your first purchase!'); // Example banner message
const showBanner = ref(true);
const closeBanner = () => {
  showBanner.value = false;
  console.log('Banner closed');
};

const navLinks = ref([
  { path: paths.account, label: 'My Account' },
  { path: paths.wishlist, label: 'My Wishlist' },
  { path: paths.cart, label: 'Cart' },
  { path: '/contact', label: 'Contact Us' },
  { path: paths.authLogin, label: 'Log In' },
]);

const route = useRoute();
const isCategoryActive = computed(() => {
  return categoryTree.value.some(menuNode => {
    const categoryPath = localePath(generateCategoryLink(menuNode));
    return route.path.includes(categoryPath);
  });
});
</script>

<style scoped>
.active-link {
  position: relative;
}

.active-link::before {
  content: '';
  position: absolute;
  top: -1.1rem;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #0284c7;
}
</style>