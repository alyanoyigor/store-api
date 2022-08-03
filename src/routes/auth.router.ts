import express from 'express';
import AuthController from '../controllers/auth.controller';
import isAuthMiddleware from '../middlewares/isAuth.middleware';
import AuthService from '../services/auth.service';

const authRouter = express.Router();
const controller = new AuthController(new AuthService());

authRouter.post('/register', controller.registerUser.bind(controller));
authRouter.post('/login', controller.login.bind(controller));
authRouter.get('/logout', isAuthMiddleware, controller.logout.bind(controller));

export default authRouter;
