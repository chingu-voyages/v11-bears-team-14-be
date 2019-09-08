const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

// Creating user schema
const userSchema = new mongoose.Schema({
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
        match: /.+@.+/
    },
    country_code: {
        type: Number,
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

// Method to generate Auth token
userSchema.methods.generateAuthToken = () => {
    // TODO make private key configurable
    return jwt.sign({ _id : this._id }, 'jwtPrivateKey');
}

// Creating a model for User
const User = mongoose.model('User', userSchema);

module.exports = User;
