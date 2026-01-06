import { response } from 'express';
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
interface registerParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface loginParams {
    email: string;
    password: string;
}

export const registerUser = async ({ firstName, lastName, email, password }: registerParams) => {
    const findUser = await UserModel.findOne({ email });
    if (findUser) {
        return { data: 'User already exists' ,statusCode: 400};
    }
    const newUser = new UserModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: await bcrypt.hash(password, 10),
    });
    await newUser.save();
    return { data: generateJWT(newUser.firstName, newUser.lastName, newUser.email), statusCode: 201 };
}

export const loginUser = async ({ email, password }: loginParams) => {
    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
        return { data: 'Invalid email or password' ,statusCode: 400};
    }   
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
        return { data: 'Invalid email or password' ,statusCode: 400};
    }

    return { data: generateJWT(findUser.firstName, findUser.lastName, findUser.email), statusCode: 200 };
}


const generateJWT = (firstName: string, lastName: string, email: string) => {
    const token = jwt.sign({ firstName, lastName, email }, 'DaXrvh1UDN7u78BP8r0EEvuXRsk09T5C', { expiresIn: '1h' });
    return token;
}

