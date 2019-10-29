const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Decimal128 = Schema.Types.Decimal128;

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String
  },
  price: {
    type: Decimal128,
    required: [true, 'Price is required']
  },
  freeTaxInstallmentsAmount: {
    type: Number,
    default: 0
  },
  deliveringPrice: {
    type: Number,
    default: 0
  },
  soldAmount: {
    type: Number,
    default: 0
  },
  image: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});


productSchema.methods.toJSON = function () {
  const product = this;
  const productObject = product.toObject();
  productObject.price = product.price.toString();
  return productObject;
};

module.exports = mongoose.model('product', productSchema, 'product');
