import CrudService from './crudService.js';
import Product from '../db/productSchema.js';

class ProductService extends CrudService {}

export default new ProductService(Product);