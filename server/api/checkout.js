import Stripe from 'stripe';

const config = useRuntimeConfig();
const stripe = new Stripe(config.stripeSecretKey);
const isDev = process.env.NODE_ENV === 'development';
const siteUrl = isDev ? 'http://localhost:3000' : config.public.siteUrl;


export default defineEventHandler(async (event) => {
    // Check if it's a GET request (for retrieving session)
    if (event.node.req.method === 'GET') {
        const query = getQuery(event);
        const paymentIntentId = query.payment_intent;

        if (!paymentIntentId) {
        event.node.res.statusCode = 400;
        return { error: 'Missing payment_intent parameter' };
        }

        try {
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
            return { paymentIntent };
        } catch (error) {
            console.error('Error retrieving payment intent:', error);
            event.node.res.statusCode = 500;
            return { error: 'Failed to retrieve payment intent' };
        }
    }

    if (event.node.req.method === 'POST') {
        const body = await readBody(event);
        const { amount } = body;
      try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: {
              enabled: true,
            },
          });
          return { clientSecret: paymentIntent.client_secret };
      } catch (error) {
        console.error('Error retrieving payment intent:', error);
        event.node.res.statusCode = 500;
        return { error: 'Failed to retrieve payment intent' };
      }
    }
  });
