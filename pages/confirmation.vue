
<template>
    <div class="flex flex-col min-h-screen">
      <NavBar />
      <main class="flex-grow container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-4">Order Confirmation</h1>
        <div v-if="loading">
          Loading order details...
        </div>
        <div v-else-if="error">
          {{ error }}
        </div>
        <div v-else-if="sessionData">
          <p class="mb-4">Thank you for your order!</p>
          <p class="mb-4">Your order has been successfully placed and is being processed.</p>
          <p class="mb-4">Order ID: {{ sessionData.id }}</p>
          <p class="mb-4">Total Amount: {{ formatAmount(sessionData.amount_total, sessionData.currency) }}</p>
          <p class="mb-4">Status: {{ sessionData.payment_status }}</p>
          <!-- Add more order details here as needed -->
          <SfButton @click="goToHome">Return to Home</SfButton>
        </div>
      </main>
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
  const sessionData = ref(null);
  
  onMounted(async () => {
    const sessionId = route.query.session_id;
    console.log('>>> confirmation sessionId', sessionId)
    if (!sessionId) {
      error.value = 'No order information found.';
      loading.value = false;
      return;
    }
  
    try {
      const response = await fetch(`/api/checkout?session_id=${sessionId}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      sessionData.value = data.session;
      console.log('>>> confirmation sessionData', sessionData.value)
      loading.value = false;
    } catch (err) {
      console.error('Error fetching order details:', err);
      error.value = 'Failed to load order details. Please try again later.';
      loading.value = false;
    }
  });
  
  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount / 100); // Stripe amounts are in cents
  };
  
  const goToHome = () => {
    router.push('/');
  };
  </script>
