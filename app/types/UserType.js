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
    place_id: new GraphQLNonNull(GraphQLID)
  },
});

module.exports = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: GraphQLID,
    firstName: GraphQLString,
    lastName: GraphQLString,
    rented_places: GraphQLList(PlaceRefType),
    hosted_places: GraphQLList(PlaceRefType),
  }
});
