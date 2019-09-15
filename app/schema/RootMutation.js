const {
    GraphQLString,
    GraphQLNonNull,
} = require("graphql");

const PersonType = require('../types/PersonType');
const UserType = require('../types/UserType');
const PersonResolver = require('../resolvers/person');
const UserResolver = require('../resolvers/user');

const mutation = {
    person: {
        type: PersonType,
        args: {
            firstname: { type: GraphQLNonNull(GraphQLString) },
            lastname: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: PersonResolver.Mutation.create
    },
    user: {
      type: UserType,
      args: {
        firstname: { type: new GraphQLNonNull(GraphQLString) },
        lastname: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        country_code: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: UserResolver.Mutation.createUser,
    },
};
module.exports = mutation;
