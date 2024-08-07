
<template>
  <div class="bg-white min-h-screen">
    <NavBarCheckout />
    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Error message display -->
      <div v-if="messages.length > 0" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error:</strong>
        <span class="block sm:inline">{{ messages[0] }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg @click="errorMessage = ''" class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>

      <div class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <!-- Order Summary (right column on large screens, top on mobile) -->
        <div class="lg:col-start-2 mb-8 lg:mb-0">
          <OrderSummary @handlePayment="handlePayment"/>
        </div>

        <!-- Payment Element (left column on large screens, bottom on mobile) -->
        <div class="lg:col-start-1 lg:row-start-1">
          <div id="link-auth-element" class="bg-neutral-50 shadow-md p-6"></div>
          <div id="address-element" class="bg-neutral-50 shadow-md p-6"></div>
          <div id="payment-element" class="bg-neutral-50 shadow-md p-6"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from 'vue-router';

const router = useRouter();
const config = useRuntimeConfig();
const isDev = process.env.NODE_ENV === 'development';
const siteUrl = isDev ? 'http://localhost:3000' : config.public.siteUrl;

let stripe;
let elements;
let clientSecret = ref(null);
const loading = ref(true);
const messages = ref([]);

const { cart, subtotal, totalPrice } = useCart()

const cartItems = computed(() => cart.value
  .filter(item => item.quantity > 0)
  .map(item => ({
    priceId: item.id,
    quantity: item.quantity
  }))
)

const handlePayment = async () => {

  const {error} = await elements.submit();
  if (error) {
    console.error('first Error submitting payment:', error.message);
    return;
  }

  try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(totalPrice.value * 100) 
        })
      });

      const data = await response.json();
      clientSecret.value = data.clientSecret;


      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: clientSecret.value,
        confirmParams: {
          return_url: `${siteUrl}/confirmation`
        }
      });

      if (error.type === "card_error" || error.type === "validation_error") {
        messages.value.push(error.message);
      } else {
        messages.value.push("An unexpected error occured.");
      }
    } catch (error) {
      console.error('Error handling payment:', error);
    }
}

const goToHome = () => {
    router.push('/');
  };

onMounted(async() => {
  if (subtotal.value === 0) {
    goToHome();
  }

  stripe = await loadStripe('pk_test_51PjXQpFZqQAkkHKQmoA3iohx0AGfaTjgOBvJGZporbY6vBnjE1QXx2wbSCkOBTw2mOQNqZBUKioXozrYEKbDAoYk00icpjoKkS');
  const options = { mode: 'shipping' };
  const appearance = {
  theme: 'flat',
  labels: 'floating',
  variables: {
    colorPrimary: '#915d3d',
    colorBackground: '#ffffff',
    colorText: '#1D1F22',
    colorDanger: '#D12727',
    fontFamily: 'Inter, system-ui, sans-serif',
    spacingUnit: '3px',
    borderRadius: '0px',
    colorTextSecondary: '#72757E', 
    iconColor: '#CDA87E',  
    fontSizeBase: '16px',
    colorTextPlaceholder: '#6B7280',
  }
};
  
  elements = stripe.elements({
    mode: "payment",
    amount: Math.round(subtotal.value * 100),
    currency: "usd",
    appearance: appearance
  });
  
  const paymentElement = elements.create('payment');
  paymentElement.mount("#payment-element");
  const addressElement = elements.create('address', options);
  addressElement.mount('#address-element');
  const linkAuthElement = elements.create('linkAuthentication');
linkAuthElement.mount('#link-auth-element');
})
</script>
