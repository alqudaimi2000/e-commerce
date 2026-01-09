/**
 * User model for the E-commerce application.
 * Defines the structure and schema for user documents in MongoDB.
 */

import mongoose, { Schema, Document } from "mongoose";

/**
 * Interface representing a User document in MongoDB.
 * Extends Mongoose's Document interface for type safety.
 */
export interface Iuser extends Document {
    id: string; // Unique identifier (inherited from Document)
    firstName: string; // User's first name
    lastName: string; // User's last name
    email: string; // User's email address (unique)
    password: string; // Hashed password
    createdAt: Date; // Automatic timestamp
    updatedAt: Date; // Automatic timestamp
}

/**
 * Mongoose schema for the User model.
 * Defines validation rules and structure for user data.
 */
const userSchema: Schema = new Schema<Iuser>({
    firstName: { type: String, required: true }, // Required first name
    lastName: { type: String, required: true }, // Required last name
    email: { type: String, required: true, unique: true }, // Required unique email
    password: { type: String, required: true }, // Required password (will be hashed)
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

/**
 * Mongoose model for User.
 * Used to interact with the 'users' collection in MongoDB.
 */
const UserModel = mongoose.model<Iuser>('User', userSchema);

export default UserModel;