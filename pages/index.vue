<template>
  <div class="relative">
    <div :class="{ 'filter blur-sm': isDrawerOpen }">
      <NavBar />
      <ProductList />
      <Footer />
    </div>
    
    <div 
      v-if="isDrawerOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
      @click="closeDrawer"
    ></div>
    
    <Drawer />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Drawer from '../components/Drawer.vue';
import ProductList from '../components/ProductList.vue';


const { isDrawerOpen, openDrawer, closeDrawer } = useDrawer();

onMounted(() => {
  closeDrawer();
});
</script>

