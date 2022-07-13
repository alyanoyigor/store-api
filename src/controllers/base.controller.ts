import { Request, Response } from 'express';
import { Model } from 'mongoose';
import {
  formatSuccessResponse,
  formatErrorResponse,
} from '../services/http.service';

class BaseController {
  findItem<T>(res: Response, item: T) {
    if (!item) {
      throw new Error("Can't find item by determine id");
    }

    return formatSuccessResponse(res, item);
  }

  async createItem<T>(req: Request, res: Response, Model: Model<T>) {
    try {
      const data = req.body;
      const item = new Model(data);
      await item.save();

      return formatSuccessResponse(res, item);
    } catch (error) {
      console.log(error);
      return formatErrorResponse(res, error);
    }
  }
}

export default BaseController;
