/**
 * User service for handling user authentication logic.
 * Provides functions for user registration and login.
 */

import { response } from 'express';
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Parameters for user registration.
 */
interface registerParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

/**
 * Parameters for user login.
 */
interface loginParams {
    email: string;
    password: string;
}

/**
 * Registers a new user.
 * Checks if user already exists, hashes password, saves user, and returns JWT token.
 * @param params User registration parameters
 * @returns Object with data (JWT or error message) and statusCode
 */
export const registerUser = async ({ firstName, lastName, email, password }: registerParams) => {
    // Check if user with this email already exists
    const findUser = await UserModel.findOne({ email });
    if (findUser) {
        return { data: 'User already exists', statusCode: 400 };
    }

    // Create new user with hashed password
    const newUser = new UserModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: await bcrypt.hash(password, 10), // Hash password with salt rounds 10
    });

    // Save user to database
    await newUser.save();

    // Return JWT token
    return { data: generateJWT(newUser.firstName, newUser.lastName, newUser.email), statusCode: 201 };
};

/**
 * Logs in an existing user.
 * Verifies email and password, returns JWT token if valid.
 * @param params User login parameters
 * @returns Object with data (JWT or error message) and statusCode
 */
export const loginUser = async ({ email, password }: loginParams) => {
    // Find user by email
    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
        return { data: 'Invalid email or password', statusCode: 400 };
    }

    // Compare provided password with hashed password
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
        return { data: 'Invalid email or password', statusCode: 400 };
    }

    // Return JWT token
    return { data: generateJWT(findUser.firstName, findUser.lastName, findUser.email), statusCode: 200 };
};

/**
 * Generates a JWT token for the user.
 * @param firstName User's first name
 * @param lastName User's last name
 * @param email User's email
 * @returns JWT token string
 */
const generateJWT = (firstName: string, lastName: string, email: string) => {
    // Sign JWT with user info, secret key, and 1-hour expiration
    const token = jwt.sign({ firstName, lastName, email }, 'DaXrvh1UDN7u78BP8r0EEvuXRsk09T5C', { expiresIn: '1h' });
    return token;
};

