<!-- <template>
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
      <div class="flex items-center pt-1">

      </div>
      <p class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700 italic text-right">
        "{{ product.description }}"
      </p>
      <div class="sticky bottom-0 p-4 bg-white border-t border-neutral-200">
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-medium text-base text-neutral-900 truncate flex-1 mr-2">{{ product.name }}</h3>
        <span class="font-bold typography-text-lg whitespace-nowrap">${{ product.price }}</span>
      </div>
      <SfButton size="sm" class="w-full mt-2" @click="handleAddToCart">
        <template #prefix>
        </template>
        Add 1 to cart
      </SfButton>
    </div>
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
 -->


 <template>
  <div class="hover:shadow-lg w-[300px] h-[500px] flex flex-col">
    <div class="relative flex-grow overflow-hidden">
      <SfLink href="#" class="block">
        <img
          :src="`${product.image}`"
          :alt="`${product.description}`"
          class="block object-cover h-auto w-full aspect-square"
        />
      </SfLink>
      <SfButton
        variant="tertiary"
        size="sm"
        square
        class="absolute top-2 right-2 bg-transparent hover:bg-white/50 transition-colors duration-200"
        aria-label="Add to wishlist"
      >
        <SfIconFavorite size="sm" class="text-white" />
      </SfButton>
    </div>
    <div class="p-4 bg-white flex-grow flex flex-col justify-between">
      <div>
        <p class="font-normal leading-5 typography-text-sm text-neutral-700 italic text-right mb-2">
          "{{ product.description }}"
        </p>
      </div>
      <div>
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-medium text-base text-neutral-900 truncate flex-1 mr-2">{{ product.name }}</h3>
          <span class="font-bold typography-text-lg whitespace-nowrap">${{ product.price }}</span>
        </div>
        <SfButton variant="primary" size="sm" class="w-full !rounded-none" @click="handleAddToCart">
          Add to bag
        </SfButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SfButton, SfIconShoppingCart, SfIconFavorite, SfLink } from '@storefront-ui/vue';
import { useCart } from '../composables/useState';
import { useDrawer } from '../composables/useState';

const { isDrawerOpen, toggleDrawer, openDrawer } = useDrawer();
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const { addToCart } = useCart();

const handleAddToCart = async () => {
  addToCart(props.product);
  console.log('Add to cart', props.product.name, props.product.id);
  console.log('ProductCard: isDrawerOpen', isDrawerOpen.value);
  openDrawer();
};
</script>
