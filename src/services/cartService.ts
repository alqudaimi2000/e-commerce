import CartModel from '../models/cartModel.js';

interface CreateCartForUser {
    userId: string;
    
}

const createCartFromUser = async ({ userId }: CreateCartForUser) => {
    // Create a new cart for the user with default values
    const newCart = new CartModel({
        userId: userId,
    });
    await newCart.save();
    return newCart;
}


export const getActiveCartForUser = async (userId: string) => {
    // Find the active cart for the user
    let cart = await CartModel.findOne({ userId: userId, isActive: true });
    if (!cart) {
        // If no active cart exists, create a new one
        cart = await createCartFromUser({ userId });
    }
    return cart;
}