<template>
  <footer class="pt-10 bg-neutral-100">
    <div
      class="grid justify-center grid-cols-[1fr_1fr] md:grid-cols-[repeat(4,1fr)] px-4 md:px-6 pb-10 max-w-[1536px] mx-auto"
    >
      <ul v-for="{ label, subcategories } in categories" :key="label" class="grid grid-cols xs:pb-4">
        <li class="ml-4 text-base font-medium leading-6 text-neutral-900 font-body mb-2">{{ label }}</li>
        <SfListItem
          v-for="{ subcategoryLabel, link } in subcategories"
          :key="subcategoryLabel"
          class="py-1 !bg-transparent"
        >
          <SfLink
            class="no-underline text-neutral-600 hover:underline hover:!text-neutral-900 active:underline active:!text-neutral-900 text-sm"
            variant="primary"
            :href="link"
          >
            {{ subcategoryLabel }}
          </SfLink>
        </SfListItem>
      </ul>
    </div>
    <hr />
    <div class="bg-neutral-100 justify-end px-4 py-10 md:flex md:py-6 max-w-[1536px] mx-auto">
      <div class="flex justify-center py-2 gap-x-4 md:self-start">
        <SfButton
          v-for="{ label, link, icon } in socialMedia"
          :key="label"
          tag="a"
          square
          variant="tertiary"
          class="text-primary-600 active:text-primary-800 hover:text-primary-700 hover:!bg-primary-100 active:!bg-primary-200"
          :href="link"
          :aria-label="`Go to ${label} page`"
        >
          <component :is="icon" />
        </SfButton>
      </div>
      <div class="flex items-center justify-center gap-4 py-2 my-3 md:ml-auto md:my-0">
        <SfLink
          v-for="{ label, link } in bottomLinks"
          :key="label"
          variant="primary"
          class="text-primary-600 no-underline text-xs active:text-primary-800 active:underline hover:text-primary-700 hover:underline"
          :href="link"
        >
          {{ label }}
        </SfLink>
      </div>
      <p
      class="flex items-center justify-center py-1 leading-4 text-center text-xs text-primary-600/70 font-body md:ml-4"
      >
        @2024 Cozy Threads
      </p>
    </div>
  </footer>
</template>
<script lang="ts" setup>
import {
  SfIconContactSupport,
  SfIconFacebook,
  SfIconHelp,
  SfIconInstagram,
  SfIconCall,
  SfIconPinterest,
  SfIconTwitter,
  SfIconYoutube,
  SfButton,
  SfLink,
  SfListItem,
} from '@storefront-ui/vue';
const categories = [
  {
    label: 'Customer Care',
    subcategories: [
      {
        subcategoryLabel: 'Contact Us',
        link: '#',
      },
      {
        subcategoryLabel: 'Returns',
        link: '#',
      },
      {
        subcategoryLabel: 'Order and Shipping',
        link: '#',
      },
      {
        subcategoryLabel: 'FAQs',
        link: '#',
      },
    ],
  },
  {
    label: 'Services',
    subcategories: [
      {
        subcategoryLabel: 'Product Care',
        link: '#',
      },
      {
        subcategoryLabel: 'The Cozy Exchange',
        link: '#',
      },
      {
        subcategoryLabel: 'Gift Services',
        link: '#',
      },
      {
        subcategoryLabel: 'ShopRunner',
        link: '#',
      },
    ],
  },
  {
    label: 'Sustainability',
    subcategories: [
      {
        subcategoryLabel: 'Made to Last',
        link: '#',
      },
      {
        subcategoryLabel: 'Sustainable Materials',
        link: '#',
      },
      {
        subcategoryLabel: 'Climate',
        link: '#',
      },
      {
        subcategoryLabel: 'Our Impact',
        link: '#',
      },
    ],
  },
  {
    label: 'About',
    subcategories: [
      {
        subcategoryLabel: 'The Cozy Story',
        link: '#',
      },
      {
        subcategoryLabel: 'Investors',
        link: '#',
      },
      {
        subcategoryLabel: 'Careers',
        link: '#',
      },
      {
        subcategoryLabel: 'Cozy Foundation',
        link: '#',
      },
    ],
  },
];
const socialMedia = [
  {
    label: 'Facebook',
    link: '#',
    icon: SfIconFacebook,
  },
  {
    label: 'Twitter',
    link: '#',
    icon: SfIconTwitter,
  },
  {
    label: 'Instagram',
    link: '#',
    icon: SfIconInstagram,
  },
  {
    label: 'Pinterest',
    link: '#',
    icon: SfIconPinterest,
  },
  {
    label: 'Youtube',
    link: '#',
    icon: SfIconYoutube,
  },
];
const contactOptions = [
  {
    label: 'Help center',
    link: '#',
    details: ['Find answers online anytime'],
    icon: SfIconHelp,
  },
  {
    label: 'Live chat',
    link: '#',
    details: ['Mon–Fri, 5am–10pm PT', 'Sat–Sun, 6am–9pm PT'],
    icon: SfIconContactSupport,
  },
  {
    label: '1 234 567 8901',
    link: '#',
    details: ['Mon–Fri, 5am–10pm PT', 'Sat–Sun, 6am–9pm PT'],
    icon: SfIconCall,
  },
];
const bottomLinks = [
  {
    label: 'Terms & Conditions',
    link: '#',
  },
  {
    label: 'Privacy Policy',
    link: '#',
  },
];
</script>

