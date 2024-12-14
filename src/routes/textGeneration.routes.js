import express from 'express';
import { generateText } from '../controllers/textGeneration.controller.js';

const router = express.Router();

router.post('/generate-text', generateText);

export { router as textGenerationRoutes };
