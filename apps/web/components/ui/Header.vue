<template>
  <MegaMenu :categories="categoryTree">
    <template v-if="viewport.isGreaterOrEquals('md')">
      <!-- Search bar -->
      <UiSearch class="hidden md:block flex-1" />
      <!-- Call Us -->
      <a href="tel:+491234000">
        <UiCallUs />
      </a>
      <nav class="hidden gap-2 md:flex md:flex-row md:flex-nowrap">
        <template v-if="localeCodes.length > 1">
          <UiButton
            v-if="!isLanguageSelectOpen"
            class="group relative -ml-0.5 rounded-md cursor-pointer"
            :aria-label="t('languageSelector')"
            variant="tertiary"
            square
            data-testid="open-languageselect-button"
            @click="toggleLanguageSelect()"
            :disabled="(showConfigurationDrawer && isEditing) || (showConfigurationDrawer && disableActions)"
          >
            <template #prefix>
              <SfIconLanguage class="relative" />
            </template>
          </UiButton>
          <UiButton
            v-else
            class="group relative -ml-0.5 rounded-md cursor-pointer"
            :aria-label="t('languageSelector')"
            variant="tertiary"
            square
            data-testid="open-languageselect-button"
          >
            <template #prefix>
              <SfIconLanguage class="relative" />
            </template>
          </UiButton>
        </template>
        <UiButton
          class="group relative -ml-0.5 rounded-md"
          :tag="NuxtLink"
          :to="localePath(paths.wishlist)"
          :aria-label="t('numberInWishlist', { count: wishlistItemIds.length })"
          variant="tertiary"
          square
          data-testid="wishlist-page-navigation"
        >
          <template #prefix>
            <SfIconFavorite />
            <SfBadge
              :content="wishlistItemIds.length"
              class="outline outline-primary-500 bg-white !text-neutral-900 group-hover:outline-primary-800 group-active:outline-primary-700 flex justify-center items-center text-xs min-w-[16px] min-h-[16px]"
              data-testid="wishlist-badge"
              placement="top-right"
              :max="99"
            />
          </template>
        </UiButton>
        <UiButton
          class="group relative -ml-0.5 rounded-md"
          :tag="NuxtLink"
          :to="localePath(paths.cart)"
          :aria-label="t('numberInCart', { count: cartItemsCount })"
          variant="tertiary"
          square
        >
          <template #prefix>
            <SfIconShoppingCart />
            <SfBadge
              :content="cartItemsCount"
              class="outline outline-primary-500 bg-white !text-neutral-900 group-hover:outline-primary-800 group-active:outline-primary-700 flex justify-center items-center text-xs min-w-[16px] min-h-[16px]"
              data-testid="cart-badge"
              placement="top-right"
              :max="99"
            />
          </template>
        </UiButton>
        <SfDropdown v-if="isAuthorized" v-model="isAccountDropdownOpen" placement="bottom-end" class="z-50">
          <template #trigger>
            <UiButton
              variant="tertiary"
              class="relative rounded-md"
              :class="{ 'bg-sky-100': isAccountDropdownOpen }"
              @click="accountDropdownToggle()"
              data-testid="account-dropdown-button"
            >
              <template #prefix>
                <SfIconPerson />
              </template>
              {{ user.user?.firstName }}
            </UiButton>
          </template>
          <ul class="rounded bg-white shadow-md border border-neutral-100 text-neutral-900 min-w-[152px] py-2">
            <li v-for="({ label, link }, labelIndex) in accountDropdown" :key="`label-${labelIndex}`">
              <template v-if="label === t('account.logout')">
                <UiDivider class="my-2" />
                <SfListItem tag="button" class="text-left !hover:bg-sky-100" data-testid="account-dropdown-logout-item" @click="logOut()">
                  {{ label }}
                </SfListItem>
              </template>
              <SfListItem
                v-else
                :tag="NuxtLink"
                :to="link"
                :class="{ 'bg-sky-100': route.path === link, 'hover:bg-sky-50': route.path !== link }"
                data-testid="account-dropdown-list-item"
              >
                {{ label }}
              </SfListItem>
            </li>
          </ul>
        </SfDropdown>
        <UiButton
          v-else
          @click="navigateToLogin"
          class="group relative text-black hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-700 mr-1 -ml-0.5 rounded-md"
          variant="tertiary"
          :aria-label="t('auth.login.openLoginForm')"
          square
        >
          <SfIconPerson />
        </UiButton>
        <UiButton
          v-if="showConfigurationDrawer"
          @click="open = true"
          class="group relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-700 mr-1 -ml-0.5 rounded-md"
          variant="tertiary"
          :aria-label="t('openConfigurationDrawer')"
          square
        >
          <SfIconTune />
        </UiButton>
      </nav>
    </template>

    <div v-if="viewport.isLessThan('lg')">
      <UiButton
        variant="tertiary"
        class="relative rounded-md md:hidden"
        square
        data-testid="open-languageselect-button"
        :aria-label="t('languageSelector')"
        @click="toggleLanguageSelect()"
        :disabled="(showConfigurationDrawer && isEditing) || (showConfigurationDrawer && disableActions)"
      >
        <SfIconLanguage />
      </UiButton>
      <UiButton
        variant="tertiary"
        class="relative  rounded-md md:hidden"
        square
        @click="searchModalOpen"
        :aria-label="t('openSearchModalButtonLabel')"
      >
        <SfIconSearch />
      </UiButton>
    </div>
  </MegaMenu>
  <LanguageSelector />
  <UiModal
    v-if="viewport.isGreaterOrEquals('md') && isAuthenticationOpen"
    v-model="isAuthenticationOpen"
    tag="section"
    class="h-full md:w-[500px] md:h-fit m-0 p-0 overflow-y-auto"
  >
    <header>
      <UiButton
        :aria-label="$t('closeDialog')"
        square
        variant="tertiary"
        class="absolute right-2 top-2"
        @click="closeAuthentication"
      >
        <SfIconClose />
      </UiButton>
    </header>
    <LoginComponent v-if="isLogin" @change-view="isLogin = false" @logged-in="closeAuthentication" :is-modal="true" />
    <Register v-else @change-view="isLogin = true" @registered="closeAuthentication" :is-modal="true" />
  </UiModal>

  <NuxtLazyHydrate v-if="viewport.isLessThan('lg')" when-idle>
    <SfModal
      v-model="isSearchModalOpen"
      class="w-full h-full z-50"
      tag="section"
      role="dialog"
      aria-labelledby="search-modal-title"
    >
      <header class="mb-4">
        <UiButton square variant="tertiary" class="absolute right-4 top-2" @click="searchModalClose">
          <SfIconClose class="text-sky-100" />
        </UiButton>
        <h3 id="search-modal-title" class="absolute left-6 top-4 font-bold typography-headline-4 mb-4">
          {{ t('search') }}
        </h3>
      </header>
      <UiSearch :close="searchModalClose" />
    </SfModal>
  </NuxtLazyHydrate>
  <LazyConfigurationDrawer v-if="showConfigurationDrawer" />
</template>

<script setup lang="ts">
import {
  SfBadge,
  SfDropdown,
  SfIconClose,
  SfIconLanguage,
  SfIconPerson,
  SfIconSearch,
  SfIconShoppingCart,
  SfIconTune,
  SfListItem,
  SfModal,
  SfIconFavorite,
  useDisclosure,
} from '@storefront-ui/vue';
import LanguageSelector from '~/components/LanguageSelector/LanguageSelector.vue';
import { paths } from '~/utils/paths';

const isLogin = ref(true);
const { data: cart } = useCart();
const { wishlistItemIds } = useWishlist();
const cartItemsCount = ref(0);

const NuxtLink = resolveComponent('NuxtLink');
const { t, localeCodes } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const { isOpen: isAccountDropdownOpen, toggle: accountDropdownToggle } = useDisclosure();
const { isOpen: isAuthenticationOpen, open: openAuthentication, close: closeAuthentication } = useDisclosure();
const { open: searchModalOpen, isOpen: isSearchModalOpen, close: searchModalClose } = useDisclosure();
const { open } = useConfigurationDrawer();
const { toggle: toggleLanguageSelect, isOpen: isLanguageSelectOpen } = useLocalization();
const { data: categoryTree } = useCategoryTree();
const { data: user, isAuthorized, logout } = useCustomer();
const viewport = useViewport();
const runtimeConfig = useRuntimeConfig();
const showConfigurationDrawer = runtimeConfig.public.showConfigurationDrawer;
const { isEditing, disableActions } = useEditor();

onNuxtReady(() => {
  cartItemsCount.value = cart.value?.items?.reduce((price, { quantity }) => price + quantity, 0) ?? 0;
});

watch(
  () => cart.value?.items,
  (cartItems) => {
    cartItemsCount.value = cartItems?.reduce((price, { quantity }) => price + quantity, 0) ?? 0;
  },
);

watch(
  () => isAuthenticationOpen.value,
  async () => {
    isLogin.value = true;
  },
);

const logOut = async () => {
  accountDropdownToggle();
  await logout();
  navigateTo(localePath(paths.home));
};

const accountDropdown = computed(() => [
  {
    label: t('account.heading'),
    link: localePath(paths.account),
  },
  {
    label: t('account.ordersAndReturns.section.myOrders'),
    link: localePath(paths.accountMyOrders),
  },
  {
    label: t('account.ordersAndReturns.section.returns'),
    link: localePath(paths.accountReturns),
  },
  {
    label: t('account.logout'),
  },
]);
const navigateToLogin = () => {
  if (route.path !== localePath(paths.authLogin)) {
    openAuthentication();
  }
};
</script>
