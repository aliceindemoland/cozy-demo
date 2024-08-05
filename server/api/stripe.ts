import Stripe from 'stripe';

const config = useRuntimeConfig();
const stripe = new Stripe(config.stripeSecretKey);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { priceId, quantity } = body;

  try {
    const session = await stripe.checkout.sessions.create({       
      line_items: [{
            price: priceId,
            quantity: quantity   
      }],
      mode: 'payment',
      ui_mode: 'embedded',
      return_url: 'https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}'
    });

    return { clientSecret: session.client_secret };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    event.res.statusCode = 500;
    return { error: 'Failed to create checkout session' };
  }
});