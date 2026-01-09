import express from 'express';
import { getAllProducts } from '../services/productService.js';

// Create Express router instance
const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    try{const products = await getAllProducts();
    res.status(200).json(products);}
    catch (error){
        res.status(500).json({message:'Server Error'});

}
   
});

export default router;