const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.Query = {
  byId: (root, args, context, info) => {
    return User.findById(args.id).exec();
  }
}

exports.Mutation = {
  createUser: (root, args, context, info) => {
    return bcrypt.hash(args.password, 12)
      .then((hash) => {
        const props = {
          ...args,
          password: hash,
        }
        const user = new User(props);
        return user.save();
      });
  },
}
