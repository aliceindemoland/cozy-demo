// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@storefront-ui/nuxt'],
  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY
  }
});
