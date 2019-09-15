const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.Query = {
  byId: async (root, args, context, info) => {
    const res = await User.findById(args.id).exec();
    return res;
  }
}

exports.Mutation = {
  createUser: async (root, args, context, info) => {
    return bcrypt.hash(args.password, 12)
      .then((hash) => {
        const props = {
          ...args,
          password: hash,
        }
        const user = new User(props);
        await user.save();
        return user;
      });
  },
}
