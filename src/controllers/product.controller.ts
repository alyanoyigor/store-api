import { Request, Response } from 'express';
import { formatErrorResponse, formatSuccessResponse } from '../services/http.service';
import ProductService from '../services/product.service';

class ProductController {
  constructor(private productService: ProductService = new ProductService()) {}

  async createProduct(req: Request, res: Response) {
    try {
      const product = this.productService.createProduct(req.body);
      return formatSuccessResponse(res, product);
    } catch (error) {
      return formatErrorResponse(res, error);
    }
  }
}

export default ProductController;
