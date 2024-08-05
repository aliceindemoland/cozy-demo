<template>
  <div class="flex flex-wrap justify-center gap-8 max-w-[1240px] mx-auto">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @openDrawer="handleOpenDrawer"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProductCard from './ProductCard.vue';

export default defineComponent({
  components: {
    ProductCard
  },
  emits: ['openDrawer'],
  setup(props, { emit }) {
    const products = ref([
      {
        id: 'price_1PjY32FZqQAkkHKQ19paJf0z',
        name: 'Cozy Sweater',
        price: 49.99,
        description: 'A warm and comfortable sweater made from the finest wool',
        image: '/img/cozy_sweater.png'
      },
      {
        id: 2,
        name: 'Snug Beanie',
        price: 19.99,
        description: 'Keep your head warm with this stylish and snug beanie',
        image: '/img/snug_beanie.png'
      },
      {
        id: 3,
        name: 'Comfort Socks',
        price: 9.99,
        description: 'Soft and cozy socks that are perfect for lounging at home',
        image: '/img/comfort_socks.png'
      },
      {
        id: 4,
        name: 'Fuzzy Blanket',
        price: 39.99,
        description: 'Wrap yourself in warmth with our fuzzy blanket',
        image: '/img/fuzzy_blanket.png'
      },
      {
        id: 5,
        name: 'Lounge Pants',
        price: 29.99,
        description: 'Comfortable lounge pants for relaxing at home',
        image: '/img/lounge_pants.png'
      },
      {
        id: 6,
        name: 'Warm Scarf',
        price: 24.99,
        description: 'A stylish scarf that will keep you warm on chilly days',
        image: '/img/warm_scarf.png'
      },
    ]);

    const handleOpenDrawer = () => {
      // console.log('ProductList: openDrawer event received', product.name);
      emit('openDrawer');
      console.log('ProductList: openDrawer event re-emitted');
    };

    return {
      products,
      handleOpenDrawer
    };
  }
});
</script>