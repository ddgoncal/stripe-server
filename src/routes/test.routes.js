import express from 'express';
import { createTestPayment, testStripeConnection } from '../controllers/test.controller.js';

const router = express.Router();

router.post('/create-test-payment', createTestPayment);
router.get('/stripe-connection', testStripeConnection);

export { router as testRoutes };