const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");
const ReservationType = require('../types/ReservationType');

const PlaceType = new GraphQLObjectType({
    name: 'PlaceType',
    fields: () => ({
        id: { type: GraphQLID },
        place_type: { type: new GraphQLNonNull(GraphQLString) },
        host_id: { type: new GraphQLNonNull(GraphQLID) },
        country_code: { type: new GraphQLNonNull(GraphQLInt) },
        max_guests: { type: new GraphQLNonNull(GraphQLInt) },
        no_of_bedrooms: { type: new GraphQLNonNull(GraphQLInt) },
        no_of_bathrooms: { type: new GraphQLNonNull(GraphQLInt) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        reservations: { type: new GraphQLList(ReservationType) },
        price_per_day: { type: new GraphQLNonNull(GraphQLInt) },
        latitude: { type: GraphQLString },
        longitude: { type: GraphQLString }
    })
});

module.exports = PlaceType;