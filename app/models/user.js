const mongoose = require("mongoose");
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const TokenModel = require('./token');

// Creating user schema
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // match: /.+@.+/
    },
    country_code: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hosted_places: [
      {
        place_id: mongoose.Schema.Types.ObjectId,
      },
    ],
    rented_places: [
      {
        place_id: mongoose.Schema.Types.ObjectId,
      },
    ],
    // TODO: add field for profile pictures
});

UserSchema.methods.generateJWT = function () {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    const token = sign({
        id: this.id,
        exp: parseInt(exp.getTime() / 1000),
    }, process.env.JWT_SECRET);
    return token;
};
UserSchema.methods.toAuthJSON = async function () {
    const tokenPayload = {
        userId: this.id,
        token: this.generateJWT(),
        status: 'active'
    }
    const createToken = new TokenModel(tokenPayload);
    await createToken.save();
    return {
        id: this.id,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        country_code: this.country_code,
        rented_places: this.rented_places,
        hosted_places: this.hosted_places,
        token: tokenPayload.token,
    };
};

UserSchema.statics.login = async function(cred) {
  const user = await this.findOne({
    email: cred.email,
  }).exec();
  if (!user) throw Error('Invalid email or password');

  console.log(cred, user);
  const logstat = await bcrypt.compare(cred.password, user.password);
  if (!logstat) throw Error('Invalid email or password');

  return user;
}

// Creating a model for User
const User = mongoose.model('User', UserSchema);

module.exports = User;
