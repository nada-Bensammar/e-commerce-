import express from 'express';
import productRoutes from './routes/productRoutes.js';
import connectDB from './config/db.js';

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

export default app;