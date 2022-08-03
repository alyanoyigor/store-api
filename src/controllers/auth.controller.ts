import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import {
  formatSuccessResponse,
  formatErrorResponse,
} from '../services/http.service';

export class AuthController {
  constructor(private authService: AuthService) {}

  async registerUser(req: Request, res: Response) {
    try {
      const user = await this.authService.registerUser(req.body);
      return formatSuccessResponse(res, user);
    } catch (error) {
      return formatErrorResponse(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const token = await this.authService.loginUser(req.body);
      return formatSuccessResponse(res, token);
    } catch (error) {
      return formatErrorResponse(res, error);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      if (req.context && req.context.user) {
        const user = await this.authService.logoutUser(req.context.user);
        return formatSuccessResponse(res, user);
      }
    } catch (error) {
      return formatErrorResponse(res, error);
    }
  }
}

export default AuthController;
