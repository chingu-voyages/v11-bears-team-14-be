const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} = require("graphql");

const PlaceType = require('../types/PlaceType');
const PlaceResolver = require('../resolvers/place');
const ReservationType = require('../types/ReservationType');

const query = {

    // Returns a place for a given Place Id
    getPlaceById: {
        type: PlaceType,
        args: {
            id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: PlaceResolver.Query.getPlaceById
    },

    // Returns all reservations for a given Place Id
    getReservationsByPlaceId: {
        type: new GraphQLList(ReservationType),
        args: {
            id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: PlaceResolver.Query.getReservationsByPlaceId
    }
}
module.exports = query;