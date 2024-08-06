import Stripe from 'stripe';

const config = useRuntimeConfig();
const stripe = new Stripe(config.stripeSecretKey);
const isDev = process.env.NODE_ENV === 'development';
const siteUrl = isDev ? 'http://localhost:3000' : config.public.siteUrl;

export default defineEventHandler(async (event) => {
  // Check if it's a GET request (for retrieving session)
  if (event.node.req.method === 'GET') {
    const query = getQuery(event);
    const sessionId = query.session_id;

    if (!sessionId) {
      event.node.res.statusCode = 400;
      return { error: 'Missing session_id parameter' };
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      return { session };
    } catch (error) {
      console.error('Error retrieving checkout session:', error);
      event.node.res.statusCode = 500;
      return { error: 'Failed to retrieve checkout session' };
    }
  }

  // Existing POST logic for creating a session
  if (event.node.req.method === 'POST') {
    const body = await readBody(event);
    const { items } = body;

    try {
      const session = await stripe.checkout.sessions.create({       
        line_items: items.map(item => ({
          price: item.priceId,
          quantity: item.quantity
        })),
        mode: 'payment',
        ui_mode: 'embedded',
        return_url: `${siteUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`
      });

      return { clientSecret: session.client_secret };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      event.node.res.statusCode = 500;
      return { error: 'Failed to create checkout session' };
    }
  }

  // If neither GET nor POST, return method not allowed
  event.node.res.statusCode = 405;
  return { error: 'Method not allowed' };
});


// import Stripe from 'stripe';

// export default defineEventHandler(async (event) => {
//   const config = useRuntimeConfig();
//   const stripe = new Stripe(config.stripeSecretKey);

//   const body = await readBody(event);
//   const { items } = body;

//   try {
//     const session = await stripe.checkout.sessions.create({       
//       line_items: items.map(item => ({
//         price: item.priceId,
//         quantity: item.quantity
//       })),
//       mode: 'payment',
//       ui_mode: 'embedded',
//       return_url: 'http://localhost:3000/confirmation/?session_id={CHECKOUT_SESSION_ID}'
//       // return_url: 'https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}'
//     });

//     return { clientSecret: session.client_secret };
//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     event.node.res.statusCode = 500;
//     return { error: 'Failed to create checkout session' };
//   }
// });
