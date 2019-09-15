const {
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");
const RootQuery = require('./RootQuery');
const RootMutation = require('./RootMutation');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        description: "This is the RootQuery",
        fields: RootQuery
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        description: "This is the RootMutation",
        fields: RootMutation
    })
});

module.exports = schema;