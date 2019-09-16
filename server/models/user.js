const mongoose = require('mongoose');

const validRoles = {
  values: ['ADMIN', 'EMPLOYEE', 'CLIENT'],
  message: '{VALUE} is not a valid role'
};

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Usarname is required '],
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: [true, 'Password is required '],
    index: true
  },
  name: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  },
  role: {
    type: String,
    default: 'CLIENT',
    enum: validRoles
  },
  doc_number: {
    type: String
  },
  doc_type: {
    type: String
  },
  address: {
    type: String
  },
  payment_method: {
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

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('user', userSchema, 'user');
