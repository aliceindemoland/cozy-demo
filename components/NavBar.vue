<template>
  <header class="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200">
    <div class="flex flex-wrap justify-between lg:flex-nowrap items-center flex-row md:justify-start h-full max-w-[1536px] w-full">
      <div class="flex items-center justify-between w-full md:w-auto">
        <SfButton variant="tertiary" square class="md:hidden">
          <SfIconMenu />
        </SfButton>
        
        <router-link
          to="/"
          aria-label="SF Homepage"
          class="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0 md:mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
        >
          <img
            src="/public/img/logo.jpg"
            alt="Sf Logo"
            class="w-[10rem] h-auto sm:w-[11rem] md:w-[12rem] lg:w-[16.5rem] lg:h-[6.75rem]"
            />
        </router-link>
        
        <SfButton 
          variant="tertiary" 
          class="md:hidden" 
          square 
          aria-label="Shopping Cart"
          @click="handleOpenDrawer"
        >
        <template #prefix>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </template>
        </SfButton>
      </div>
      
      <SfButton
        aria-label="Open categories"
        class="hidden md:block lg:hidden order-first lg:order-1 mr-4"
        square
        variant="tertiary"
      >
        <SfIconMenu />
      </SfButton>
      <SfButton class="hidden lg:flex lg:mr-4" variant="neutral">
        <span class="hidden lg:flex whitespace-nowrap">What's New</span>
      </SfButton>
      <SfButton class="hidden lg:flex lg:mr-4" variant="neutral">
        <span class="hidden lg:flex whitespace-nowrap">Apparel</span>
      </SfButton>
      <SfButton class="hidden lg:flex lg:mr-4" variant="neutral">
        <span class="hidden lg:flex whitespace-nowrap">Accessories</span>
      </SfButton>
      
      <div class="flex-grow"></div>

      <div class="hidden md:flex items-center">
        <form
          role="search"
          class="flex items-center mr-4"
          @submit.prevent="search"
        >
        <div class="relative">
    <input
      v-model="inputValue"
      type="search"
      placeholder="Find your cozy"
      class="peer pl-8 pr-2 py-1 w-40 text-sm text-gray-700 placeholder-gray-400 bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none transition-colors"
    />
    <SfIconSearch
      class="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400"
    />
  </div>
  <SfButton
    type="submit"
    variant="tertiary"
    size="sm"
    square
    aria-label="Search"
    class="ml-2"
  >
  </SfButton>
        </form>

        <nav class="flex justify-end">
          <div class="flex flex-row flex-nowrap">
            <SfButton
              class="mr-2 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
              aria-label="Favorites"
              variant="tertiary"
              square
            >
              <template #prefix>
                <SfIconFavorite />
              </template>
            </SfButton>
            <SfButton
              class="mr-2 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
              aria-label="Log in"
              variant="tertiary"
              square
            >
              <template #prefix>
                <SfIconPerson />
              </template>
            </SfButton>
            <SfButton
              class="rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
              aria-label="Cart"
              variant="tertiary"
              square
              @click="handleOpenDrawer"
            >
              <!-- <template #prefix>
                <SfIconShoppingCart />
              </template> -->
              <template #prefix>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    </template>
            </SfButton>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>



<style scoped>
.peer:focus {
  width: 200px;
}

@media (max-width: 1024px) {
  .peer:focus {
    width: 150px;
  }
}
</style>


<script setup>
import {
  SfButton,
  SfIconShoppingCart,
  SfIconFavorite,
  SfIconPerson,
  SfIconExpandMore,
  SfInput,
  SfIconSearch,
  SfIconMenu,
  SfIconArrowBack,
} from '@storefront-ui/vue';

// const emit = defineEmits(['openDrawer']);
const { isDrawerOpen, openDrawer } = useDrawer();

const handleOpenDrawer = () => {
    openDrawer();
}

</script>