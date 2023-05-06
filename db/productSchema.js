import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  priceWithCurrency: {
    type: String,
    required: false,
  },

});

productSchema.pre('save', function(next) {
    this.priceWithCurrency = `${this.price} Ft`
    next();
});

const Product = model('product', productSchema);

export default Product;