import express from 'express';
import { addOrRemoveItemToCart, clearCartForUser, getActiveCartForUser, removeItemFromCart,  } from '../services/cartService.js';
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
    const response = await addOrRemoveItemToCart({ userId, productID, quantity });
    res.status(response.statusCode).json(response);

});

router.put('/items',validateJWT, async (req: ExtendRequest, res) => {
    // Update item quantity in cart

    const userId = req?.user?._id;


    const { productID, quantity } = req.body;
    const cart = await getActiveCartForUser(userId);
    const response = await addOrRemoveItemToCart({ userId, productID, quantity });
    res.status(response.statusCode).json(response);
});

router.delete('/items/:id',validateJWT, async (req: ExtendRequest, res) => {
    // Remove item from cart
    const userId = req?.user?._id;
    const productID = req.params.id;
    

    // To remove completely, pass a large negative quantity
    const response = await removeItemFromCart({ userId, productID });
    res.status(response.statusCode).json(response);
});

router.delete('/',validateJWT, async (req: ExtendRequest, res) => {
    // Clear the entire cart
    const userId = req?.user?._id;
    const response = await clearCartForUser(userId);
    res.status(response.statusCode).json(response);
});

export default router;