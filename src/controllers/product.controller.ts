import { Request, Response } from 'express';
import ProductModel from '../models/product.model';
import BaseController from './base.controller';

class ProductController extends BaseController {
  createProduct(req: Request, res: Response) {
    this.createItem(req, res, ProductModel);
  }
}

export default ProductController;
