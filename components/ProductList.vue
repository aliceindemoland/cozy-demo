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

<script setup>
import { defineEmits } from 'vue';
import ProductCard from './ProductCard.vue';
import { useProducts } from '../composables/useState';

const emit = defineEmits(['openDrawer']);
const { products } = useProducts();
console.log('>>> products', products)

const handleOpenDrawer = () => {
  emit('openDrawer');
  console.log('ProductList: openDrawer event re-emitted');
};
</script>
