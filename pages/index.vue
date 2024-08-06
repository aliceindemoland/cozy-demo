<template>
  <NavBar/>
  <ProductList/>
  <Drawer/>
  <Footer/>
</template>

<script setup>
import { ref } from 'vue';
// import { useHead } from '#head';
import Drawer from '../components/Drawer.vue';
import ProductList from '../components/ProductList.vue';

useHead({
  script: [
    {
      src: 'https://js.stripe.com/v3/',
      defer: true
    }
  ]
});

const { openDrawer, closeDrawer } = useDrawer();

onMounted(() => {
  closeDrawer();
  console.log('Drawer closed on page load');
});
</script>