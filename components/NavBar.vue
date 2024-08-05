<template>
  <header class="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200">
    <div
      class="flex flex-wrap justify-between lg:flex-nowrap items-center flex-row md:justify-start h-full max-w-[1536px] w-full"
    >
      <SfButton variant="tertiary" square class="md:hidden" aria-label="Go back">
        <SfIconArrowBack />
      </SfButton>
      <a
        href="#"
        aria-label="SF Homepage"
        class="inline-block mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
      >
        <img
          src="/public/img/logo.jpg"
          alt="Sf Logo"
          class="w-[175px] md:h-6 md:w-[176px] lg:w-[16.5rem] lg:h-[6.75rem]"
        />
      </a>
      <SfButton variant="tertiary" class="md:hidden" square aria-label="Search">
        <SfIconSearch />
      </SfButton>
      <SfButton
        aria-label="Open categories"
        class="hidden md:block lg:hidden order-first lg:order-1 mr-4"
        square
        variant="tertiary"
      >
        <SfIconMenu />
      </SfButton>
      <SfButton class="hidden lg:flex lg:mr-4" variant="neutral">
        <span class="hidden lg:flex whitespace-nowrap">Home</span>
      </SfButton>
      <SfButton class="hidden lg:flex lg:mr-4" variant="neutral">
        <span class="hidden lg:flex whitespace-nowrap">Products</span>
      </SfButton>

      <nav class="flex-1 hidden md:flex justify-end lg:order-last lg:ml-4">
        <div class="flex flex-row flex-nowrap">
          <SfButton
            v-for="actionItem in actionItems"
            :key="actionItem.ariaLabel"
            class="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
            :aria-label="actionItem.ariaLabel"
            variant="tertiary"
            square
          >
            <template #prefix>
              <Component :is="actionItem.icon" />
            </template>
          </SfButton>
        </div>
      </nav>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
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

const actionItems = [
  {
    label: 'Log in',
    icon: SfIconPerson,
    ariaLabel: 'Log in',
    role: 'login',
  },
  {
    icon: SfIconShoppingCart,
    ariaLabel: 'Cart',
    role: 'button',
    label: '',
  },
];

const inputValue = ref('');

const search = () => {
  alert(`Successfully found 10 results for ${inputValue.value}`);
};
</script>

