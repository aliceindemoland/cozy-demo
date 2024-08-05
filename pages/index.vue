<template>
    <NavBar/>
    <ProductList @openDrawer="openDrawer"/>
    <Drawer v-model="isDrawerOpen" />
    <Footer/>
  </template>
  
  <script lang="ts" setup>
  useHead({
  script: [
    {
      src: 'https://js.stripe.com/v3/',
      defer: true
    }
  ]
})
  import Drawer from '../components/Drawer.vue';
  import ProductList from '../components/ProductList.vue';

  const isDrawerOpen = ref(false);
  const openDrawer = () => {
  isDrawerOpen.value = true;
};
 
</script>
  
  