<template>
    <!-- <fieldset>
      <label v-for="{ label, value } in options" :key="value" class="flex items-center my-4 cursor-pointer">
        <SfRadio v-model="placement" class="flex items-center" name="placement" :value="value" />
        <span class="ml-2">{{ label }}</span>
      </label>
    </fieldset>
    <SfButton @click="open = true"> Open Drawer </SfButton> -->
  
    <transition
      enter-active-class="transition duration-500 ease-in-out"
      leave-active-class="transition duration-500 ease-in-out"
      enter-from-class="placement === 'left' ? '-translate-x-full' : 'translate-x-full'"
      enter-to-class="placement === 'left' ? 'translate-x-0' : 'translate-x-0'"
      leave-from-class="placement === 'left' ? 'translate-x-0' : 'translate-x-0'"
      leave-to-class="placement === 'left' ? '-translate-x-full' : 'translate-x-full'"
    >
      <SfDrawer
        v-model="isOpen"
        placement="right"
        class="bg-neutral-50 border border-gray-300 max-w-[370px]"
      >
        <header class="flex items-center justify-between px-10 py-6 bg-primary-700">
          <div class="flex items-center text-white"><SfIconFavorite class="mr-2" /> Your favorite items</div>
          <SfButton square variant="tertiary" class="text-white" @click="isOpen = false">
            <SfIconClose />
          </SfButton>
        </header>
        <div class="p-5 px-10">
          <p class="mb-2">
            Focus is trapped inside this Drawer and <strong>tab</strong> button cycle through
            <a href="#" class="underline text-primary-700"> Focusable Element </a> and another
            <a href="#" class="underline text-primary-700"> Focusable Element </a>
          </p>
          <strong>You can close Drawer by clicking outside or focus and use ESC button</strong>
             <SfButton class="w-full" @click="handleContinueToCheckout"> Continue to Checkout </SfButton>
        </div>
      </SfDrawer>
    </transition>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import {
    SfDrawer,
    SfDrawerPlacement,
    SfButton,
    SfIconFavorite,
    SfIconClose,
    useTrapFocus,
  } from '@storefront-ui/vue';

  
  export default defineComponent({
  components: {
    SfDrawer,
    SfButton,
    SfIconFavorite,
    SfIconClose
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    // product: {
    //   type: Object,
    //   required: true
    // }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    console.log('Drawer setup function called', props.modelValue);

    const isOpen = computed({
      get: () => {
        console.log('isOpen getter called, value:', props.modelValue);
        return props.modelValue;
      },
      set: (value: boolean) => {
        console.log('isOpen setter called with value:', value);
        emit('update:modelValue', value);
      }
    });

    const placement = 'right';
    const clientSecret = ref('');

    const handleContinueToCheckout = async () => {
      console.log('Continue to Checkout');

      navigateTo({
            path: '/checkout',
            query: {
            clientSecret: clientSecret.value
        }
    })

    // try {
    //     const response = await fetch('/api/stripe', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         priceId: 'price_1PjY32FZqQAkkHKQ19paJf0z',
    //         quantity: 1
    //     })
    //     });
    //     const data = await response.json();
    //     console.log('>>> clientSecret', data.clientSecret)
    //     clientSecret.value = data.clientSecret;
    //     console.log('>>> clientSecret.value', clientSecret.value)

    //     if (data.clientSecret) {
    //     console.log('>>> navigateTo', clientSecret.value)
    //     await navigateTo({
    //         path: '/checkout',
    //         query: {
    //         clientSecret: clientSecret.value
    //         }
    //     })
    //     } else {
    //     console.error('No client secret received from server');
    //     }
    // } catch (error) {
    //     console.error('Error adding to cart:', error);
    // }

    }

    return {
      isOpen,
      handleContinueToCheckout
    };
  }
});
</script>
  
  