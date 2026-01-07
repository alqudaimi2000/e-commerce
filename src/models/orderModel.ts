import e from "express";
import mongoose, { Schema, Document } from "mongoose";
import type { ObjectId } from "mongoose";

export interface IOrderItem {
     productName: string;
     productImage: string;
     price: number;
     quantity: number;


        
}

export interface Iorder extends Document {
    orderItems: IOrderItem[];
    totalAmount: number;
    address: string;
    userId: string|ObjectId;

}
const orderItemsSchema: Schema = new Schema<IOrderItem>({
    productName: { type: String, required: true },
    productImage: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
});
const OrderSchema: Schema = new Schema<Iorder>({
    orderItems: [orderItemsSchema],
    totalAmount: { type: Number, required: true, min: 0 },
    address: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
const OrderModel = mongoose.model<Iorder>('Order', OrderSchema);

export default OrderModel;