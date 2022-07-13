import express from 'express';
import cartRouter from './cart.router';
import paymentRouter from './payment.router';
import productRouter from './product.router';
import userRouter from './user.router';

const router = express.Router();

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/payment', paymentRouter);

export default router;
