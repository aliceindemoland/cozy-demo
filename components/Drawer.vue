<template>
    <transition
      enter-active-class="transition duration-500 ease-in-out"
      leave-active-class="transition duration-500 ease-in-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <SfDrawer
        v-model="isDrawerOpen"
        placement="right"
        class="bg-neutral-50 border border-gray-300 max-w-[370px]"
      >
      <div class="relative">
        <header class="px-10 py-6 bg-white">
  <div class="text-[#CDA87E]"><SfIconShoppingCart class="mr-2" /> Your Cart</div>
</header>
<SfButton 
  square 
  variant="tertiary" 
  class="absolute top-4 right-4 bg-white" 
  @click="closeDrawer"
>
  <SfIconClose :style="{ color: '#CDA87E' }"/>
</SfButton>

    </div>
<div class="p-5 px-10">
    <ul v-if="cartItemsWithQuantity.length" class="divide-y">
    <li
      v-for="item in cartItemsWithQuantity"
      :key="item.id"
      class="py-4 flex justify-between items-center"
    >
      <div>
        <h3 class="font-medium">{{ item.name }}</h3>
        <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
      </div>
      <SfButton square variant="tertiary" @click="handleRemoveFromCart(item.id)">
        <SfIconRemove />
      </SfButton>
    </li>
</ul>
<p v-else class="text-center py-4">Your cart is empty</p>
<SfButton v-if="cartItemsWithQuantity.length"class="w-full mt-4" @click="handleContinueToCheckout">Continue to Checkout</SfButton>
        </div>
      </SfDrawer>
    </transition>
  </template>

  <script setup>
  import { computed, ref } from 'vue';
  import {
    SfDrawer,
    SfButton,
    SfIconFavorite,
    SfIconClose,
  } from '@storefront-ui/vue';
  
  const placement = 'right';

  const { cart, removeFromCart } = useCart();
  const { isDrawerOpen, closeDrawer } = useDrawer();


  const cartItemsWithQuantity = computed(() => {
    return cart.value.filter(item => item.quantity > 0);
  });
  
  const handleContinueToCheckout = async () => {
    console.log('Continue to Checkout');
  
    navigateTo({
      path: '/checkout',
    });
  };

  const handleRemoveFromCart = (productId) => {
    console.log('Remove from Cart', productId);
    removeFromCart(productId);
  }
  </script>
