export const useProducts = () => {
    const products = useState('products', () => [
        {
            id: 'price_1PjY32FZqQAkkHKQ19paJf0z',
            name: 'Cozy Sweater',
            price: 49.99,
            description: 'A warm and comfortable sweater made from the finest wool',
            image: '/img/cozy_sweater.png', 
            quantity: 0
          },
          {
            id: 'price_1PjY3kFZqQAkkHKQ3RVXHHpo',
            name: 'Snug Beanie',
            price: 19.99,
            description: 'Keep your head warm with this stylish and snug beanie',
            image: '/img/snug_beanie.png',
            quantity: 0
          },
          {
            id: 'price_1PjY4QFZqQAkkHKQ9Faddb7Z',
            name: 'Comfort Socks',
            price: 9.99,
            description: 'Soft and cozy socks that are perfect for lounging at home',
            image: '/img/comfort_socks.png',
            quantity: 0
          },
          {
            id: 'price_1PjY52FZqQAkkHKQ03qUp8GJ',
            name: 'Fuzzy Blanket',
            price: 39.99,
            description: 'Wrap yourself in warmth with our fuzzy blanket',
            image: '/img/fuzzy_blanket.png',
            quantity: 0
          },
          {
            id: 'price_1PjY6BFZqQAkkHKQUxG0mtjw',
            name: 'Lounge Pants',
            price: 29.99,
            description: 'Comfortable lounge pants for relaxing at home',
            image: '/img/lounge_pants.png',
            quantity: 0
          },
          {
            id: 'price_1PjY6xFZqQAkkHKQFGLUYHOy',
            name: 'Warm Scarf',
            price: 24.99,
            description: 'A stylish scarf that will keep you warm on chilly days',
            image: '/img/warm_scarf.png',
            quantity: 0
          },
    ])
    return {
        products
    }
}

export const useCart = () => {
    const { products } = useProducts()
    const cart = useState('cart', () => products.value.map(product => ({ ...product, quantity: 0 })))
    const TAX_RATE = 0.0825; // 8.25% tax rate, adjust as needed

    const addToCart = (product) => {
        const cartItem = cart.value.find(item => item.id === product.id)
        if (cartItem) {
            cartItem.quantity++
        }
    }
  
    const removeFromCart = (productId) => {
        const cartItem = cart.value.find(item => item.id === productId)
        if (cartItem && cartItem.quantity > 0) {
          cartItem.quantity--
        }
      }

    const itemsInCart = computed(() => {
        return cartItemsWithQuantity.value.reduce((total, item) => total + item.quantity, 0)
    })

    const cartItemsWithQuantity = computed(() => {
        return cart.value.filter(item => item.quantity > 0)
    })

    const subtotal = computed(() => {
        return cartItemsWithQuantity.value.reduce((total, item) => {
            return total + (item.quantity * item.price)
        }, 0)
    })

    const tax = computed(() => {
        return subtotal.value * TAX_RATE;
      });
    
    const totalPrice = computed(() => {
    return subtotal.value + tax.value;
    });

  
    return {
      cart,
      addToCart,
      removeFromCart,
      cartItemsWithQuantity,
      subtotal,
      itemsInCart,
      tax,
      totalPrice    
    }
  }

  export const useDrawer = () => {
    const isDrawerOpen = useState('isDrawerOpen', () => false)
  
    const openDrawer = () => {
      if (!isDrawerOpen.value) {
        isDrawerOpen.value = true
      }
    }
  
    const closeDrawer = () => {
      if (isDrawerOpen.value) {
        isDrawerOpen.value = false
      }
    }
  
    const toggleDrawer = () => {
      isDrawerOpen.value = !isDrawerOpen.value
    }
  
    return {
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      toggleDrawer
    }
  }