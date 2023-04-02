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

});

productSchema.post('save', function(doc, next) {
  console.log('A new product was saved to the database:', doc);
  next();
});

const Product = model('product', productSchema);

export default Product;