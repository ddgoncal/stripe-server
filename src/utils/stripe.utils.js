import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

// Centralized Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Utility function to format amount to cents
export const formatAmountToCents = (amount) => Math.round(amount * 100);

// Utility function to format amount to dollars
export const formatAmountToDollars = (amount) => amount / 100;

// Validate currency code
export const isValidCurrency = (currency) => {
  const validCurrencies = ['usd', 'eur', 'gbp', 'jpy'];
  return validCurrencies.includes(currency.toLowerCase());
};