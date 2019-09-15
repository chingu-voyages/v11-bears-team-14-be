const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");


const PlaceRefType = new GraphQLObjectType({
  name: 'PlaceRef',
  fields: {
    place_id: {type: new GraphQLNonNull(GraphQLID)}
  },
});

module.exports = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLID},
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    email: {type: GraphQLString},
    country_code: { type: GraphQLString },
    rented_places: {type: GraphQLList(PlaceRefType)},
    hosted_places: {type: GraphQLList(PlaceRefType)},
    token: { type: GraphQLString }
  }
});
