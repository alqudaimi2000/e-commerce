/**
 * Product model for the E-commerce application.
 * Defines the structure and schema for product documents in MongoDB.
 */

import mongoose, { Schema, Document } from "mongoose";

/**
 * Interface representing a Product document in MongoDB.
 * Extends Mongoose's Document interface for type safety.
 */
export interface IProduct extends Document {
    id: string; // Unique identifier (inherited from Document)
    imageUrl: string; // URL of the product image
    name: string; // Product name
    description: string; // Product description
    price: number; // Product price
    stock: number; // Available stock quantity
    createdAt: Date; // Automatic timestamp
    updatedAt: Date; // Automatic timestamp
}

/**
 * Mongoose schema for the Product model.
 * Defines validation rules and structure for product data.
 */
const productSchema: Schema = new Schema<IProduct>({
    imageUrl: { type: String, required: true }, // Required image URL
    name: { type: String, required: true }, // Required product name
    description: { type: String, required: true }, // Required description
    price: { type: Number, required: true }, // Required price (numeric)
    stock: { type: Number, required: true }, // Required stock quantity (numeric)
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

/**
 * Mongoose model for Product.
 * Used to interact with the 'products' collection in MongoDB.
 */
const ProductModel = mongoose.model<IProduct>('Product', productSchema);

export default ProductModel;