# Cozy Threads Demo Application

**Hosted at:** [https://cozy-demo.onrender.com/](https://cozy-demo.onrender.com/)  
**Prepared by:** [Alice Tung](https://www.linkedin.com/in/alicectung/)  

## Overview
The Cozy Threads demo application showcases a direct-to-consumer ecommerce platform for high-quality, ethically-sourced apparel and accessories. Built using the modern Nuxt.js framework, the application emphasizes a component-based architecture and reactive state management, providing a smooth and responsive user experience.

## Architecture and Design

### Modern Framework
I chose Nuxt.js due to my familiarity with Vue.js on a production codebase and for its capability to quickly spin up a full-stack application. Nuxt.js offers easy implementation of server routes and a modular system that is highly extendable.

### Storefront UI
I integrated the [Storefront UI library](https://docs.storefrontui.io/v2/) which I have previously consulted for implementing a custom component library. Key reasons for this choice include:
- **Ease of Access:** Comprehensive documentation and access to component source code.
- **Common E-commerce Blocks:** Provides pre-designed e-commerce components, making it ideal for demo purposes.
- **Theme Customization:** Easily achieved using Tailwind CSS configs, supporting multiple themes simultaneously with configurable overrides.
- **Framework Support:** Compatible with popular web frameworks like React and Vue.
- **Active Maintenance:** The library is actively maintained, with an enterprise version available.

### Stripe Elements
The checkout page showcases three types of Stripe Web Elements: Link Authentication, Payment Element, and Address Element. This integration provides a secure checkout flow, maintains the site’s branding through Appearance API, and offers a superior user experience.

## Design Principles
The Cozy Threads application embodies a modern, minimalist aesthetic that prioritizes user experience and product presentation. It features:
- **Clean Interface:** A neutral color palette accented by warm, earthy tones.
- **Prominent Product Images:** Generated via text prompt with Canva Magic Media, supported by concise information and intuitive navigation.
- **Consistent UI Elements:** Minimalist style with square corners, contributing to a sophisticated yet approachable look.
- **Responsive Design:** Creates a calm, trustworthy shopping environment across various devices, aligning with the brand's ethos and target audience.

## Application Structure
The application is divided into several main views:
- **Home/Product Catalog (`index.vue`):** Displays a list of Cozy Threads' products, including images, titles, descriptions, and prices.
- **Shopping Cart (`drawer.vue`):** Allows customers to view and manage their selected items.
- **Checkout (`checkout.vue`):** Implements a secure checkout flow using Stripe.js library.
- **Order Confirmation (`confirmation.vue`):** Confirms the order and provides transaction details to the customer.

## Technical Decisions
1. **Vue Router:** Manages navigation within the single-page application (SPA), ensuring smooth transitions between different views.
2. **State Management:** Utilizes Composition API to implement reusable logic, such as the `useCart` composable for handling cart operations.
3. **Backend API:** A Node.js backend handles server-side operations and integrates with Stripe for payment processing.

## Key Components
- **NavBar:** Facilitates site-wide branding and navigation.
- **ProductList:** Displays the product catalog.
- **Drawer:** Manages the shopping cart functionality.
- **OrderSummary:** Displays order details and the total amount.
- **Footer and Newsletter:** Provides additional site information and encourages user engagement.

## Areas for Improvement
Given more time, the application could be enhanced with the following features:
- **Stripe Products:** Using Stripe products as a CMS to fetch available products via API calls. This approach ensures a single source of truth for product data, simplifying management and updates.
- **Tax Calculation:** Leveraging the Stripe Tax API automates tax calculations during the checkout flow. This ensures accurate tax computation based on the customer's location and applicable tax regulations, reducing manual errors and compliance issues.
- **Event Webhooks:** Listen to events directly from the Stripe account to automatically trigger backend actions and keep customer transactions in sync.

## Conclusion
This project demonstrates the ability to design and build a functional ecommerce application with a focus on component-based architecture and state management. The integration with Stripe’s Payment APIs ensures secure and efficient transaction handling. The key decisions made during implementation focus on flexibility, maintainability, and usability.

With more time, additional features such as CMS integration, automated tax calculation, and Stripe webhooks could further enhance the application, providing an even better user experience.
