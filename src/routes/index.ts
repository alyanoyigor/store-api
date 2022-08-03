import express from 'express';
import accessTokenMiddleware from '../middlewares/accessToken.middleware';
import authRouter from './auth.router';
import cartRouter from './cart.router';
import paymentRouter from './payment.router';
import productRouter from './product.router';
import userRouter from './user.router';

const router = express.Router();

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/payment', paymentRouter);
router.use('/auth', accessTokenMiddleware, authRouter);

export default router;
