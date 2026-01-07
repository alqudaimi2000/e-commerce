import mongoose, { Schema, Document } from "mongoose";
import type { ObjectId } from "mongoose";
import type { IProduct } from "./productModel.js";
import type { Iuser } from "./userModel.js";

const cartStatusEnum = ['active', 'completed', 'cancelled'] as const;

export interface ICartProduct extends Document {
    productId: IProduct; // ID of the product
    quantity: number; // Quantity of the product in the cart
    unitPrice: number; // Price of the product at the time it was added to the cart
}

export interface ICart extends Document {
    id: string; // Unique identifier (inherited from Document)
    userId: String | ObjectId; // ID of the user who owns the cart
    products: ICartProduct[]; 
    totalAmount: number; // Total amount of the cart
    status: 'active' | 'completed' | 'cancelled'; // Status of the cart
    createdAt: Date; // Automatic timestamp
    updatedAt: Date; // Automatic timestamp
}

const cartProductSchema: Schema = new Schema<ICartProduct>({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Required product ID
    quantity: { type: Number, required: true, min: 1 }, // Required quantity with minimum value of 1
    unitPrice: { type: Number, required: true, min: 0 }, // Required unit price with minimum value of 0
});
const cartSchema: Schema = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Required user ID
    products: { type: [cartProductSchema], default: [] }, // Array of products in the cart
    totalAmount: { type: Number, required: true, min: 0, default: 0 }, // Required total amount with minimum value of 0
    status: { type: String, enum: cartStatusEnum, default: 'active' }, // Cart status with default value 'active'
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically
const CartModel = mongoose.model<ICart>('Cart', cartSchema);

export default CartModel;