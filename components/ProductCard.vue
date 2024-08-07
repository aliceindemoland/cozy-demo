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
  openDrawer();
};
</script>
