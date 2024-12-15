import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { paymentRoutes } from './routes/payment.routes.js';
import { textGenerationRoutes } from './routes/textGeneration.routes.js';
import { testRoutes } from './routes/test.routes.js';
import { handleError } from './utils/error.utils.js';
import { parseCorsOrigins } from './utils/utils.js';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: parseCorsOrigins(),
  methods: ['GET', 'POST', 'PUT', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options("*",cors());
app.use(express.json());

// Routes
app.use('/api/payments', paymentRoutes);
app.use('/api/generator', textGenerationRoutes);
app.use('/api/test', testRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  handleError(err, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});