import express from 'express';
import { getAllProducts } from '../services/productService.js';

// Create Express router instance
const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    const products = await getAllProducts();
    res.status(200).json(products);


   
});

export default router;