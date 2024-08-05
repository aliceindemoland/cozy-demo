<template>
  <div class="border border-neutral-200 rounded-md hover:shadow-lg w-[300px] h-[500px]">
    <div class="relative">
      <SfLink href="#" class="block">
        <img
          :src="`${product.image}`"
          alt="`${product.description}`"
          class="block object-cover h-auto rounded-md aspect-square"
          width="300"
          height="300"
        />
      </SfLink>
      <SfButton
        variant="tertiary"
        size="sm"
        square
        class="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
        aria-label="Add to wishlist"
      >
        <SfIconFavorite size="sm" />
      </SfButton>
    </div>
    <div class="p-4 border-t border-neutral-200">
      <SfLink href="#" variant="secondary" class="no-underline"> {{ product.name }} </SfLink>
      <div class="flex items-center pt-1">
        <SfRating size="xs" :value="5" :max="5" />

        <SfLink href="#" variant="secondary" class="pl-1 no-underline">
          <SfCounter size="xs">123</SfCounter>
        </SfLink>
      </div>
      <p class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700">
        {{ product.description }}
      </p>
      <span class="block pb-2 font-bold typography-text-lg"> {{ product.price }} </span>

      <SfButton size="sm" @click="handleClick">
        <template #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
        Buy now
      </SfButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SfRating, SfCounter, SfLink, SfButton, SfIconShoppingCart, SfIconFavorite } from '@storefront-ui/vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const clientSecret = ref('');
const emit = defineEmits(['openDrawer']);

const handleClick = async () => {
  console.log('Buy now', props.product.name, props.product.id)
  emit('openDrawer');
  console.log('ProductCard: openDrawer event emitted');
  
  // try {
  //   const response = await fetch('/api/stripe', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       priceId: props.product.id,
  //       quantity: 1
  //     })
  //   });
  //   const data = await response.json();
  //   console.log('>>> clientSecret', data.clientSecret)
  //   clientSecret.value = data.clientSecret;
  //   console.log('>>> clientSecret.value', clientSecret.value)

  //   // if (data.clientSecret) {
  //   //   console.log('>>> navigateTo', clientSecret.value)
  //   //   await navigateTo({
  //   //     path: '/checkout',
  //   //     query: {
  //   //       clientSecret: clientSecret.value
  //   //     }
  //   //   })
  //   // } else {
  //   //   console.error('No client secret received from server');
  //   // }
  // } catch (error) {
  //   console.error('Error adding to cart:', error);
  // }
}
</script>

