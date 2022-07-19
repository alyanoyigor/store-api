import ProductModel from '../models/product.model';
import { TProduct } from '../types';

class ProductService {
  async createProduct(data: TProduct) {
    const product = new ProductModel(data);
    await product.save();
    return product;
  }
}

export default ProductService;
