import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import type { ExtendRequest } from '../types/extendedRequest.js';

const validateJWT = (req:ExtendRequest, res:Response, next:NextFunction) => {
    const autherizationHeader = req.get('Authorization');
    if (!autherizationHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
        
    }
    const token = autherizationHeader.replace('Bearer ', '');
    if (!token) {
        return  res.status(401).json({ message: 'Token missing' }); 
    }
    jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', async (err, payload) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (!payload) {
            return res.status(401).json({ message: 'Invalid token payload' });
        }
        const user = await UserModel.findOne({ email: (payload as any).email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;

        next();
    });
}
export default validateJWT;