<template>
    <div class="flex flex-col min-h-screen">
      <NavBar />
      <main class="flex-grow container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8 text-center">Thank you for your order!</h1>
        <div v-if="loading" class="text-center">
          Loading order details...
        </div>
        <div v-else-if="error" class="text-center text-red-600">
          {{ error }}
        </div>
        <div v-else-if="confirmationData" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-2xl font-bold mb-4">Order Summary</h2>
            <p class="mb-2">Order #: 0068521705</p>
            <p class="mb-12">Order Total: {{ formatAmount(confirmationData.amount, confirmationData.currency) }}</p>
            <SfButton class="w-full !rounded-none" @click="goToHome">Continue Shopping</SfButton>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-2xl font-bold mb-4">Shipping Details</h2>
            <p class="mb-2">{{ confirmationData.shipping.address.line1 }}</p>
            <p v-if="confirmationData.shipping.address.line2" class="mb-2">{{ confirmationData.shipping.address.line2 }}</p>
            <p class="mb-4">{{ confirmationData.shipping.address.city }}, {{ confirmationData.shipping.address.state }} {{ confirmationData.shipping.address.postal_code }}</p>
            <p class="mb-4">Shipping Method: Free Ground Shipping</p>
  
        </div>
          
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-2xl font-bold mb-4">Next Steps</h2>
            <p class="mb-4">We've received your order and will contact you as soon as your package is on its way.</p>
            <p class="mb-4">For any questions, please contact our customer support.</p>
            <SfButton class="w-full !rounded-none" variant="secondary">Contact Support</SfButton>
          </div>
        </div>
      </main>
      <div class="bg-gray-100 py-8">
        <Newsletter />
      </div>
      <hr class="border-t border-gray-300">
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { SfButton } from '@storefront-ui/vue';
  
  const route = useRoute();
  const router = useRouter();
  
  const loading = ref(true);
  const error = ref(null);
  const confirmationData = ref(null);
  
  onMounted(async () => {
    console.log('>>> route.query', route.query)
    const paymentIntent = route.query.payment_intent;
    console.log('>>> confirmation payment_intent', paymentIntent)
    if (!paymentIntent) {
      error.value = 'No order information found.';
      loading.value = false;
      return;
    }

    try {
      const response = await fetch(`/api/checkout?payment_intent=${paymentIntent}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('>>> confirmation data', data)
      loading.value = false;
      confirmationData.value = data.paymentIntent;
      console.log('>>> confirmation confirmationData', confirmationData.value)
    } catch (error) {
      console.error('Error fetching order details:', error);
      error.value = 'Failed to load order details. Please try again later.';
      loading.value = false;
    }
  });
  
  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount / 100); 
  };
  
  const formatAddressKey = (key) => {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  const goToHome = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
  </style>



<!-- <template>
    <div class="flex flex-col min-h-screen">
      <NavBar />
      <main class="flex-grow container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <div v-if="loading">
          Loading order details...
        </div>
        <div v-else-if="error">
          {{ error }}
        </div>
        <div v-else-if="confirmationData">
          <p class="mb-4">We've received your order and will contact you as soon as your package is on its way.</p>
          
          <h1 class="text-3xl font-bold mb-4">Order Details</h1>
          <p class="mb-4">Reference: {{ confirmationData.id }}</p>
          <p class="mb-4">Order Amount: {{ formatAmount(confirmationData.amount, confirmationData.currency) }}</p>
          
          <h2 class="text-2xl font-bold mb-2">Shipping To</h2>
          <p class="mb-4">{{ confirmationData.shipping.address.city }}, {{ confirmationData.shipping.address.state }}</p>
 
          <SfButton @click="goToHome">Continue shopping</SfButton>
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { SfButton } from '@storefront-ui/vue';
  
  const route = useRoute();
  const router = useRouter();
  
  const loading = ref(true);
  const error = ref(null);
  const confirmationData = ref(null);
  
  onMounted(async () => {
    console.log('>>> route.query', route.query)
    const paymentIntent = route.query.payment_intent;
    console.log('>>> confirmation payment_intent', paymentIntent)
    if (!paymentIntent) {
      error.value = 'No order information found.';
      loading.value = false;
      return;
    }

    try {
      const response = await fetch(`/api/checkout?payment_intent=${paymentIntent}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('>>> confirmation data', data)
      loading.value = false;
      confirmationData.value = data.paymentIntent;
      console.log('>>> confirmation confirmationData', confirmationData.value)
    } catch (error) {
      console.error('Error fetching order details:', error);
      error.value = 'Failed to load order details. Please try again later.';
      loading.value = false;
    }
  });
  
  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount / 100); 
  };
  
  const goToHome = () => {
    router.push('/');
  };
  </script> -->
