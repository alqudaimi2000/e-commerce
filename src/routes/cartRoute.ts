import express from 'express';
import { addItemToCart, getActiveCartForUser } from '../services/cartService.js';
import validateJWT from '../middlewares/validateJWT.js';
import type { ExtendRequest } from '../types/extendedRequest.js';
const router = express.Router();


router.get('/',validateJWT, async (req: ExtendRequest, res) => {

    const userId = req?.user?._id;
    const cart = await getActiveCartForUser(userId);
    res.status(200).json(cart);
}
)

router.post('/items',validateJWT, async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const {productID, quantity} = req.body;
    const response = await addItemToCart({ userId, productID, quantity });
    res.status(response.statusCode).json(response);

});

export default router;