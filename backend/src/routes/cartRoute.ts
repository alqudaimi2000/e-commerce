import express from 'express';
import { addOrRemoveItemToCart, clearCartForUser, getActiveCartForUser, removeItemFromCart, checkout  } from '../services/cartService.js';
import validateJWT from '../middlewares/validateJWT.js';
import type { ExtendRequest } from '../types/extendedRequest.js';
const router = express.Router();


router.get('/',validateJWT, async (req: ExtendRequest, res) => {
    try
    {const userId = req?.user?._id;
    const cart = await getActiveCartForUser(userId);
    res.status(200).json(cart);}
    catch (error){
        res.status(500).json({message:'Server Error'}); 
}
}
)

router.post('/items',validateJWT, async (req: ExtendRequest, res) => {
    try{const userId = req?.user?._id;
    const {productID, quantity} = req.body;
    const response = await addOrRemoveItemToCart({ userId, productID, quantity });
    res.status(response.statusCode).json(response);
}catch (error){
        res.status(500).json({message:'Server Error'});
}
});

router.put('/items',validateJWT, async (req: ExtendRequest, res) => {
    // Update item quantity in cart

    try{const userId = req?.user?._id;


    const { productID, quantity } = req.body;
    const cart = await getActiveCartForUser(userId);
    const response = await addOrRemoveItemToCart({ userId, productID, quantity });
    res.status(response.statusCode).json(response);}catch (error){
        res.status(500).json({message:'Server Error'});     
}
});

router.delete('/items/:id',validateJWT, async (req: ExtendRequest, res) => {
    try{// Remove item from cart
    const userId = req?.user?._id;
    const productID = req.params.id;
    

    // To remove completely, pass a large negative quantity
    const response = await removeItemFromCart({ userId, productID });
    res.status(response.statusCode).json(response);
}catch (error){
        res.status(500).json({message:'Server Error'}); 
}
});

router.delete('/',validateJWT, async (req: ExtendRequest, res) => {
    try{// Clear the entire cart
    const userId = req?.user?._id;
    const response = await clearCartForUser(userId);
    res.status(response.statusCode).json(response);}catch (error){
        res.status(500).json({message:'Server Error'}); 
}
});


router.post('/checkout',validateJWT, async (req: ExtendRequest, res) => {
    // Placeholder for checkout logic
    try{const  userId = req?.user?._id;
    const address = req.body.address;
    const response = await checkout({ userId, address });
    res.status(200).json(response);}catch (error){
        res.status(500).json({message:'Server Error'}); 
}
});
export default router;