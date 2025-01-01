import Stripe from 'stripe';
import dotenv from 'dotenv';
import { stripe } from '../utils/stripe.utils.js';

dotenv.config();

 // Route to handle creating a Checkout Session
 export const createCheckoutSession = async (req, res) => {
  try {
    const { amount, currency } = req.body; // Get line items from request body

    console.log(process.env.STRIPE_SUBSCRIPTION_PRICE_ID);
    const line_items = [{
      price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID,
      quantity: 1,
    }];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'subscription',
      success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`, // Your success page URL
      cancel_url: `${process.env.DOMAIN}`, // Your cancel page URL
    });
    console.log(session);
    res.json({ url: session.url }); // send the generated URL to frontend
  } catch (error) {
       console.error('Error creating Checkout Session:', error);
      res.status(500).json({ error: 'Error creating Checkout Session' });
  }
};

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      checkoutStripeUrl: process.env.STRIPE_CHECKOUT_URL,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};

export const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Handle successful payment
        console.log('Payment succeeded:', paymentIntent.id);
        break;
      case 'payment_intent.payment_failed':
        // Handle failed payment
        console.log('Payment failed:', event.data.object.id);
        break;
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    
    res.status(200).json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    console.error('Error retrieving payment status:', error);
    res.status(500).json({ error: 'Failed to retrieve payment status' });
  }
};