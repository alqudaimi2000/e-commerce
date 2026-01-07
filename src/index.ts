/**
 * Main entry point for the E-commerce API server.
 * Sets up Express application, connects to MongoDB, and configures routes.
 */

import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./routes/userRoute.js";
import productRoute from './routes/productRoute.js';
import { seedInitialProducts } from './services/productService.js';
import cartRoute from './routes/cartRoute.js';

// Create Express application instance
const app = express();
const port = 3000;

// Connect to MongoDB and start the server
mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() => {
    console.log('Connected to MongoDB');
    seedInitialProducts(); // Seed initial products if not present
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// Middleware to parse JSON bodies
app.use(express.json());

// Mount user routes at /user path
app.use('/user', userRouter);

app.use('/product', productRoute);

app.use('/cart',cartRoute);
// Root endpoint for API health check
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});