import express from 'express';
import userRouter from './user.router';

const router = express.Router();
router.use('/user', userRouter);
// router.use('/products', productsRouter);
// router.use('/cart', cartRouter);

export default router;
