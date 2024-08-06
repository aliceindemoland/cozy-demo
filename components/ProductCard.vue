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

      <SfButton size="sm" @click="handleAddToCart">
        <template #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
        Add to cart
      </SfButton>
    </div>
  </div>
</template>

<script setup>
import { SfRating, SfCounter, SfLink, SfButton, SfIconShoppingCart, SfIconFavorite } from '@storefront-ui/vue';
const { isDrawerOpen, toggleDrawer, openDrawer } = useDrawer();
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { addToCart } = useCart();

const handleAddToCart = async () => {
  addToCart(props.product);
  console.log('Add to cart', props.product.name, props.product.id)

  console.log('ProductCard: isDrawerOpen', isDrawerOpen.value)

    openDrawer();
  

}
</script>

