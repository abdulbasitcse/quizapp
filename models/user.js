const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  /* name: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  }, */
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('User', userSchema);

