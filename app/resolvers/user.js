const User = require('../models/user');
const TokenModel = require('../models/token');
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.Query = {
  byId: async (root, args, context, info) => {
    console.log('in byId resolver with uid', context.uid);
    const res = await User.findById(context.uid).exec();
    console.log('in byId resolver', res)
    return res;
  }
}

exports.Mutation = {
  createUser: async (root, args, context, info) => {
    const emailExist = await User.findOne({ email: args.email }).exec();
    if (emailExist && emailExist.email) {
        console.log(emailExist.email)
        return new Error('Email already exist');
    }
    const hash = await bcrypt.hash(args.password, 12);
    const props = {
      ...args,
      password: hash,
    }
    const user = new User(props);
    await user.save();
    return user.toAuthJSON();
  },
  login: async (root, args, context, info) => {
    const user = await User.login(args);
    console.log('\nin login resolver: \n\n', user)
    const token = await TokenModel.findOne({ userId: user.id, status: 'active' });
    if (token) {
        token.status = 'inactive';
        token.save();
    }
    console.log(user);
    return user.toAuthJSON();
  },
  logout: async (root, args, context, info) => {
        try {
            const token = await TokenModel.findOne({ userId: context.uid, status: 'active' });
            if (token) {
                token.status = 'inactive';
                token.save();
            }
            return { message: "user has been logged out" };
        } catch (err) {
            var errMessage = err.message || 'Some error occured while performing logout operation';
            throw new Error(errMessage);
        }

    },
}
