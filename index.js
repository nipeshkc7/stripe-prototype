// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require('express');
const app = express();
const nunjucks = require('nunjucks');


nunjucks.configure('./html', {
    autoescape: true,
    express: app
});


// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_51Hg1ivJ0u6JgDCHqHJ2mR1L8jm9Vsl9ZtbMxrUQ6KLPCf7DhBGKWWYiHRi9kjOf7vvw00uN27WeSDHaz5KjMouGV00NFVsLd5H';
SUCCESS_URL = process.env.SUCCESS_URL || 'http://localhost:8080/paymentSuccess';
FAILURE_URL = process.env.FAILURE_URL || 'http://localhost:8080/paymentFailure';

const stripe = require('stripe')(STRIPE_SECRET_KEY);

app.set("view engine", "njk");

app.get('/checkout', (req, res) => {
  res.render('checkout.njk');
});

app.get('/', (req, res) => {
  res.end('Alive');
});

app.get('/paymentSuccess', (req, res) => {
  res.end('payment successful');
});

app.get('/paymentFailure', (req, res) => {
  res.end('payment failure');
});

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: SUCCESS_URL,
    cancel_url: FAILURE_URL,
  });

  res.json({ id: session.id });
});

app.listen(8080, () => console.log(`Listening on port ${8080}!`));
