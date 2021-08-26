const { Schema, Types, model } = require('mongoose');

const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;
const ENGLISH_ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;
const PASSWORD_PATTERN =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const validators = require('../utils/validators');

const userSchema = Schema({
  username: {
    type: String,
    minLength: 4,
    // required: true,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => ENGLISH_ALPHANUMERIC_PATTERN.test(value),
      message: (props) =>
        `Username ${props.value} should contain only English letter and numbers!`,
    },
  },
  password: {
    type: String,
    // required: true,
    minLength: 8,
    trim: true,
    validate: {
      validator: (value) => PASSWORD_PATTERN.test(value),
      message: (props) =>
        `Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one special characters and one number!`,
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
    default: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png',
  },
  bookmarkedQuestions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
});

userSchema.pre('save', function (next) {
  console.log(this.password);
  if (!this.password) next();

  bcrypt
    .genSalt(SALT_ROUNDS)
    .then((salt) => bcrypt.hash(this.password, salt))
    .then((hash) => {
      this.password = hash;
      next();
    });
});

// validation password - one capital, one number, one special character
// validation email
userSchema.path('avatar').validate(validators.urlValidator, 'Not valid url');

module.exports = model('User', userSchema);
