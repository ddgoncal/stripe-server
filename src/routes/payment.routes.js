import express from 'express';
import { createPaymentIntent, createCheckoutSession, handleWebhook, getPaymentStatus } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);
router.get('/status/:paymentId', getPaymentStatus);
router.post('/create-checkout-session', createCheckoutSession);

export { router as paymentRoutes };