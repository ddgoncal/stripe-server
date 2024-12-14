// services/stripe.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createCharge(amount, currency, source) {
    try {
       return await stripe.charges.create({ amount, currency, source });
   } catch(error) {
       console.error('Error in createCharge:', error);
       throw new Error(error.message);
   }

}

// Add more Stripe functions as needed

module.exports = {
    createCharge,
    // ... other functions for managing customers, subscriptions etc
};