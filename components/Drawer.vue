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
        class="bg-neutral-50 border-l border-gray-300 w-full sm:max-w-[370px] md:max-w-[480px] flex flex-col"
      >
        <div class="relative">
          <header class="px-4 sm:px-10 py-6 bg-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="text-lg font-medium">My bag</span>
            <SfButton 
              square 
              variant="tertiary" 
              class="absolute top-4 right-4 bg-white" 
              @click="closeDrawer"
            >
              <SfIconClose :style="{ color: '#CDA87E' }"/>
            </SfButton>
          </header>
        </div>
        <div class="flex-grow overflow-y-auto p-4 sm:p-5 sm:pl-10 sm:pr-5">
        <ul v-if="cartItemsWithQuantity.length" class="divide-y">
          <li
            v-for="item in cartItemsWithQuantity"
            :key="item.id"
            class="py-4 flex items-center"
          >
            <img 
              :src="item.image" 
              :alt="item.name"
              class="w-16 h-16 object-cover mr-4"
            />
            <div class="flex-grow">
              <h3 class="font-medium">{{ item.name }}</h3>
              <p class="text-sm text-gray-500">Qty: {{ item.quantity }} @ ${{ item.price.toFixed(2) }}</p>
            </div>
            <SfButton square variant="tertiary" @click="handleRemoveFromCart(item.id)">
              <SfIconRemove :style="{ color: '#CDA87E' }"/>
            </SfButton>
          </li>
        </ul>
        <p v-else class="text-center py-4">Your bag is empty</p>
      </div>
        <!-- Sticky Subtotal Section -->
        <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-5">
          <div v-if="cartItemsWithQuantity.length" class="mb-4">
            <p class="font-medium flex justify-between">
              <span>Subtotal:</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </p>
          </div>
          
          <SfButton 
            v-if="cartItemsWithQuantity.length"
            class="w-full !rounded-none" 
            @click="handleContinueToCheckout"
          >
            Checkout
          </SfButton>
          <SfButton 
          v-else
          class="w-full !rounded-none" 
          @click="handleContinueBrowsing"
        >
          Continue browsing
        </SfButton>
        </div>
      </SfDrawer>
    </transition>
  </template>
  
  <script setup>
  import { SfDrawer, SfButton, SfIconShoppingCart, SfIconClose, SfIconRemove } from '@storefront-ui/vue';
  
  const { cart, removeFromCart, cartItemsWithQuantity, subtotal } = useCart();
  const { isDrawerOpen, closeDrawer } = useDrawer();
  
  const handleContinueToCheckout = async () => {
    navigateTo({
    //   path: '/checkout-embedded',
    path: '/checkout',
    });
  };
  
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  }

  const handleContinueBrowsing = () => {
  closeDrawer();
}
  </script>
  
  <style scoped>
  .sf-drawer {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  </style>
