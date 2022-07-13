import express from 'express';
import CartController from '../controllers/cart.controller';

const cartRouter = express.Router();
const cartController = new CartController();

cartRouter.patch('/:id', cartController.updateCart.bind(cartController));
cartRouter.delete('/:id', cartController.deleteCart.bind(cartController));

export default cartRouter;
