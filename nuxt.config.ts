// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@storefront-ui/nuxt'],
  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000', 
    }
  },
  app: {
    head: {
      title: 'Cozy Threads',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Your cozy clothing store' }
      ],
      script: [
        {
          src: 'https://js.stripe.com/v3/',
          async: true
        }
      ]
    }
  },
});
