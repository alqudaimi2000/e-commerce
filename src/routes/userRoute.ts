/**
 * User routes for the E-commerce API.
 * Handles user registration and login endpoints.
 */

import express from 'express';

// Create Express router instance
const router = express.Router();
import { registerUser, loginUser } from '../services/userService.js';

/**
 * POST /user/register
 * Registers a new user with the provided details.
 * Expects: { firstName, lastName, email, password } in request body.
 * Returns: JWT token on success, error message on failure.
 */
router.post('/register', async (req: express.Request, res: express.Response) => {
    const { firstName, lastName, email, password } = req.body;
    const result = await registerUser({ firstName, lastName, email, password });
    res.status(result.statusCode).json(result.data);
});

/**
 * POST /user/login
 * Authenticates a user with email and password.
 * Expects: { email, password } in request body.
 * Returns: JWT token on success, error message on failure.
 */
router.post('/login', async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    res.status(result.statusCode).json(result.data);
});

export default router;