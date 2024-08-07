
<template>
  <div class="bg-white min-h-screen">
    <NavBarCheckout />
    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <!-- Order Summary (right column on large screens, top on mobile) -->
        <div class="lg:col-start-2 mb-8 lg:mb-0">
          <OrderSummary @handlePayment="handlePayment"/>
        </div>

        <!-- Payment Element (left column on large screens, bottom on mobile) -->
        <div class="lg:col-start-1 lg:row-start-1">
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

const config = useRuntimeConfig();
const isDev = process.env.NODE_ENV === 'development';
const siteUrl = isDev ? 'http://localhost:3000' : config.public.siteUrl;

let stripe;
let loading = ref(true);
let elements;
let clientSecret = ref(null);

const { cart, subtotal } = useCart()

const cartItems = computed(() => cart.value
  .filter(item => item.quantity > 0)
  .map(item => ({
    priceId: item.id,
    quantity: item.quantity
  }))
)

const handlePayment = async () => {
  elements.submit();
  try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(subtotal.value * 100) 
        })
      });

      const data = await response.json();
      console.log('>>> clientSecret', data.clientSecret)
      clientSecret.value = data.clientSecret;

      console.log('>>> siteUrl', siteUrl)
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: clientSecret.value,
        confirmParams: {
          return_url: `${siteUrl}/confirmation`
        }
      });
  } catch (error) {
    console.error('Error confirming payment:', error);
  }
}

onMounted(async() => {
  stripe = await loadStripe('pk_test_51PjXQpFZqQAkkHKQmoA3iohx0AGfaTjgOBvJGZporbY6vBnjE1QXx2wbSCkOBTw2mOQNqZBUKioXozrYEKbDAoYk00icpjoKkS');
  const options = { mode: 'shipping' };

  
  elements = stripe.elements({
    mode: "payment",
    amount: Math.round(subtotal.value * 100),
    currency: "usd"
  });
  
  const paymentElement = elements.create('payment');
  paymentElement.mount("#payment-element");
  const addressElement = elements.create('address', options);
  addressElement.mount('#address-element');
  
  
// const appearance = { /* appearance */ };
// const options = { mode: 'shipping' };
// const elements = stripe.elements({ clientSecret });
// const linkAuthElement = elements.create('linkAuthentication');
// const addressElement = elements.create('address', options);
// const paymentElement = elements.create('payment');
// linkAuthElement.mount('#link-auth-element');
// addressElement.mount('#address-element');
// paymentElement.mount('#payment-element');

})
</script>
