import express from 'express';
import CartController from '../controllers/cart.controller';

const cartRouter = express.Router();
const cartController = new CartController();

cartRouter.patch('/:id', cartController.updateCart.bind(cartController));
cartRouter.patch(
  '/payment/:id',
  cartController.updatePayment.bind(cartController)
);

export default cartRouter;
