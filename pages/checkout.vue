<template>
  <div class="container mx-auto px-4 py-8">
    <NavBar/>
      <div id="checkout"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
declare const window: Window & typeof globalThis & { Stripe: any };

export default defineComponent({
  setup() {
    // const route = useRoute()
    // const clientSecret = computed(() => route.query.clientSecret as string)

    useHead({
      title: 'Checkout',
      script: [
        {
          src: 'https://js.stripe.com/v3/',
          async: true
        }
      ]
    });

    const clientSecret = ref('');

    onMounted(async() => {
      try {
        const fetchClientSecret = async () => {
        const response = await fetch("/api/stripe", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              priceId: 'price_1PjY32FZqQAkkHKQ19paJf0z',
              quantity: 1
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

    return {
      clientSecret
    }
  }
})
</script>
