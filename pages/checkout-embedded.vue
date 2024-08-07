<template>
  <div class="container mx-auto px-4 py-8">
    <div id="checkout"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const { cart } = useCart()

const cartItems = computed(() => cart.value
  .filter(item => item.quantity > 0)
  .map(item => ({
    priceId: item.id,
    quantity: item.quantity
  }))
)

onMounted(async() => {
  try {
    const fetchClientSecret = async () => {
      const response = await fetch("/api/checkout-embedded", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.value
        })
      });
      const { clientSecret } = await response.json();
      console.log('>>> clientSecret', clientSecret)
      return clientSecret;
    };

    const stripe = window.Stripe('pk_test_51PjXQpFZqQAkkHKQmoA3iohx0AGfaTjgOBvJGZporbY6vBnjE1QXx2wbSCkOBTw2mOQNqZBUKioXozrYEKbDAoYk00icpjoKkS');
    const checkout = await stripe.initEmbeddedCheckout({
      fetchClientSecret,
    });

    checkout.mount('#checkout');
  } catch (error) {
    console.error('Error fetching client secret:', error);
  }
})
</script>
