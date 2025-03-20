<template>
  <div class="flex items-center flex-col mb-4 pb-8">
    <CheckoutProgress :steps="steps" :activeStepIndex="0" />
    <div
      v-if="!cartIsEmpty"
      class="md:grid md:grid-cols-12 md:gap-x-6 md:mr-4 mb-6 md:mb-0"
      data-testid="cart-page-content"
    >
      <div class="col-span-8 mb-2 md:mb-0 shadow-md md:shadow-none">
        <table class="min-w-full divide-y divide-neutral-200">
          <thead class="hidden md:contents">
            <tr class="text-left">
              <th scope="col" class="py-3.5 pl-4 pr-3 text-sm font-bold text-neutral-700 sm:pl-6"></th>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-sm font-bold text-neutral-700 sm:pl-6">Product</th>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-sm font-bold text-neutral-700 sm:pl-6">Price</th>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-sm font-bold text-neutral-700 sm:pl-6">Quantity</th>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-sm font-bold text-neutral-700 sm:pl-6 text-right">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200 bg-white">
            <UiCartProductCard v-for="(cartItem, index) in cart?.items" :key="cartItem.id" :cart-item="cartItem" />
          </tbody>
        </table>
        <UiDivider class="w-auto" />
        <!-- coupon -->
        <Coupon class="mb-2" />
      </div>
      <div class="relative col-span-4 md:sticky md:top-10 h-fit" :class="{ 'pointer-events-none opacity-50': loading }">
        <SfLoaderCircular v-if="loading" class="absolute top-[130px] right-0 left-0 m-auto z-[999]" size="2xl" />
        <OrderSummary :cart="cart">
          <!-- <Coupon v-if="viewport.isGreaterOrEquals('lg')" class="mb-5" /> -->
          <UiButton
            data-testid="checkout-button"
            :tag="NuxtLink"
            :to="goToCheckout()"
            size="lg"
            class="w-full mb-4 md:mb-0 bg-sky-600 hover:bg-sky-700 active:bg-sky-700 hover:scale-[1.02] transition-transform duration-400 ease-in-out"
          >
            {{ t('goToCheckout') }}
          </UiButton>
          <client-only>
            <PayPalExpressButton :disabled="loading" class="mt-4" type="CartPreview" />
            <PayPalPayLaterBanner placement="cart" :amount="cartGetters.getTotal(cartGetters.getTotals(cart))" />
          </client-only>
        </OrderSummary>
      </div>
    </div>
    <div v-else class="flex items-center justify-center flex-col pt-24 pb-32" data-testid="cart-page-content">
      <h2 class="mt-8 typography-headline-3 font-bold">{{ t('emptyCart') }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfLoaderCircular } from '@storefront-ui/vue';
import { cartGetters } from '@plentymarkets/shop-api';
import CheckoutProgress from '~/components/CheckoutProgress/CheckoutProgress.vue';
definePageMeta({ pageType: 'static' });

const NuxtLink = resolveComponent('NuxtLink');
const { t } = useI18n();
const viewport = useViewport();
const localePath = useLocalePath();
const { isAuthorized } = useCustomer();
const { data: cart, cartIsEmpty, loading } = useCart();
const goToCheckout = () => (isAuthorized.value ? localePath(paths.checkout) : localePath(paths.guestLogin));
const steps = [
  { name: 'Shopping Cart', link: '/cart' },
  { name: 'Checkout', link: '/checkout' },
  { name: 'Order Complete', link: '#' },
];
</script>
