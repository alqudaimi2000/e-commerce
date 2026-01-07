import CartModel from '../models/cartModel.js';
import ProductModel from '../models/productModel.js';

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
    let cart = await CartModel.findOne({ userId: userId, status: 'active' });
    console.log('Active cart for user:', cart);
    if (!cart) {
        console.log('Active cart for user:', cart);

        console.log('No active cart found for user, creating a new one.');
        // If no active cart exists, create a new one
        cart = await createCartFromUser({ userId });
    }
    return cart;
}

interface AddItemToCartParams {
    userId: string;
    productID: any;
    quantity?: number;

}
export const addItemToCart = async ({ userId, productID, quantity }: AddItemToCartParams) => {

    const cart = await getActiveCartForUser(userId);
    // Check if the product already exists in the cart
    const existsInCart = cart.products.find(item => item.productId.toString() === productID.toString());
    
    // Fetch the product
    const product = await ProductModel.findById(productID);
    if (!product) {
        return { message: 'Product not found', statusCode: 404 };
    }
    
    const newQuantity = quantity || 1;
    let totalQuantity = newQuantity;
    
    if (existsInCart) {
        totalQuantity += existsInCart.quantity;
    }
    
    // Check if total quantity exceeds stock
    if (totalQuantity > product.stock) {
        return { message: 'Insufficient stock', statusCode: 400 };
    }
    
    if (existsInCart) {
        // Update the existing item's quantity
        existsInCart.quantity = totalQuantity;
    } else {
        // Add new item to cart
        cart.products.push({
            productId: productID,
            quantity: newQuantity,
            unitPrice: product.price,
        });
    }
    
    // Recalculate the total amount of the cart
    cart.totalAmount = cart.products.reduce((total, item) => {
        return total + item.unitPrice * item.quantity;
    }, 0);
    
    // Update the total amount of the cart
    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
}