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

interface AddOrRemoveItemToCartParams {
    userId: string;
    productID: any;
    quantity?: number;

}

interface RemoveItemFromCartParams {
    userId: string;
    productID: any;
}
export const addOrRemoveItemToCart = async ({ userId, productID, quantity }: AddOrRemoveItemToCartParams) => {

    const cart = await getActiveCartForUser(userId);
    // Check if the product already exists in the cart
    const existsInCart = cart.products.find(item => item.productId.toString() === productID.toString());
    
    // Fetch the product
    const product = await ProductModel.findById(productID);
    if (!product) {
        return { message: 'Product not found', statusCode: 404 };
    }
    
    const newQuantity = quantity || 1;
    
    if (existsInCart) {
        const totalQuantity = existsInCart.quantity + newQuantity;
        if (totalQuantity > 0) {
            // Check stock only if increasing quantity
            if (totalQuantity > existsInCart.quantity && totalQuantity > product.stock) {
                return { message: 'Insufficient stock', statusCode: 400 };
            }
            // Update quantity
            existsInCart.quantity = totalQuantity;
        } else {
            // Remove item if quantity <= 0
            cart.products = cart.products.filter(item => item.productId.toString() !== productID.toString());
        }
    } else {
        if (newQuantity > 0) {
            // Check stock for new item
            if (newQuantity > product.stock) {
                return { message: 'Insufficient stock', statusCode: 400 };
            }
            // Add new item
            cart.products.push({
                productId: productID,
                quantity: newQuantity,
                unitPrice: product.price,
            });
        } else {
            return { message: 'Product not in cart', statusCode: 400 };
        }
    }
    
    // Recalculate the total amount of the cart
    cart.totalAmount = cart.products.reduce((total, item) => {
        return total + item.unitPrice * item.quantity;
    }, 0);
    
    // Update the total amount of the cart
    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
}

export const removeItemFromCart = async ({ userId, productID }: RemoveItemFromCartParams) => {
    const cart = await getActiveCartForUser(userId);
    // Check if the product exists in the cart
    const existsInCart = cart.products.find(item => item.productId.toString() === productID.toString());
    if (!existsInCart) {
        return { message: 'Product not in cart', statusCode: 400 };
    }
    // Remove item from cart
    cart.products = cart.products.filter(item => item.productId.toString() !== productID.toString());
     const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
}   

export const clearCartForUser = async (userId: string) => {
    const cart = await getActiveCartForUser(userId);

    cart.products = [];
    cart.totalAmount = 0;
    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
}

