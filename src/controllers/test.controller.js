import { stripe, formatAmountToCents, isValidCurrency } from '../utils/stripe.utils.js';
import { AppError } from '../utils/error.utils.js';

export const createTestPayment = async (req, res) => {
  try {
    // Create a test PaymentIntent for $0.50
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 50, // $0.50
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: { integration_test: 'true' }
    });

    res.json({
      message: 'Test payment intent created',
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    });
  } catch (error) {
    console.error('Test payment creation error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const testStripeConnection = async (req, res) => {
  try {
    // Test Stripe API connection by retrieving account details
    const account = await stripe.accounts.retrieve();
    res.json({
      message: 'Stripe connection successful',
      accountId: account.id,
      chargesEnabled: account.charges_enabled
    });
  } catch (error) {
    console.error('Stripe connection test failed:', error);
    res.status(500).json({ error: error.message });
  }
};