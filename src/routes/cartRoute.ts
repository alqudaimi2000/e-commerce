import express from 'express';
import { getActiveCartForUser } from '../services/cartService.js';
import validateJWT from '../middlewares/validateJWT.js';
const router = express.Router();


router.get('/',validateJWT, async (req: express.Request, res: express.Response) => {

    const userId = (req as any).user._id;
    const cart = await getActiveCartForUser(userId);
    res.status(200).json(cart);
}
)


export default router;