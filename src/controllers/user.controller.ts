import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import {
  formatSuccessResponse,
  formatErrorResponse,
} from '../services/http.service';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const data = req.body;
      const user = new UserModel(data);
      await user.save();
      return formatSuccessResponse(res, user);
    } catch (error) {
      console.log(error);
      return formatErrorResponse(res, error);
    }
  }
}

export default UserController;
