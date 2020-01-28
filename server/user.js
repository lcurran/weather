const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regex = RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const userSchema = new Schema({
  email: {
    type: String,
    index: {
      unique: true,
      dropDups: true
    },
    validate: {
      validator: v => regex.test(v),
      message: props => `${props.value} is not a valid email.`
    },
    required: [true, 'User email is required.']
  },
  location: {
    type: String,
    required: [true, 'User location is required.']
  }
});

module.exports = mongoose.model('User', userSchema);
