import express from 'express';
import { generateText, generateGeminiAPICall } from '../controllers/textGeneration.controller.js';

const router = express.Router();

router.post('/generate-text', generateText);
router.get('/generate-gemini', generateGeminiAPICall);

export { router as textGenerationRoutes };
