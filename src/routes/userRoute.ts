import express from 'express';

const router =express.Router();
import { registerUser, loginUser } from '../services/userService.js';   


router.post('/register', async (req: express.Request, res: express.Response) => {
    const { firstName, lastName, email, password } = req.body;
    const result = await registerUser({ firstName, lastName, email, password });
    res.status(result.statusCode).json(result.data);
});

router.post('/login', async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    res.status(result.statusCode).json(result.data);
});

export default router;