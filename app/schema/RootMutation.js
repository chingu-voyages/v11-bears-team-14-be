const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt
} = require("graphql");

const PlaceType = require('../types/PlaceType');
const PlaceResolver = require('../resolvers/place');

const mutation = {

    // Adds a new Place without reservations
    addPlace: {
        type: PlaceType,
        args: {
            place_type: { type: new GraphQLNonNull(GraphQLString) },
            host_id: { type: new GraphQLNonNull(GraphQLID) },
            country_code: { type: new GraphQLNonNull(GraphQLInt) },
            max_guests: { type: new GraphQLNonNull(GraphQLInt) },
            no_of_bedrooms: { type: new GraphQLNonNull(GraphQLInt) },
            no_of_bathrooms: { type: new GraphQLNonNull(GraphQLInt) },
            address: { type: new GraphQLNonNull(GraphQLString) },
            latitude: { type: GraphQLString },
            longitude: { type: GraphQLString }
        },
        resolve: PlaceResolver.Mutation.addPlace
    },

    // Adds a Reservation for a particular place_id
    addReservation: {
        type: PlaceType,
        args: {
            place_id: { type: new GraphQLNonNull(GraphQLID) },
            user_id: { type: new GraphQLNonNull(GraphQLInt) },
            start_date: { type: new GraphQLNonNull(GraphQLString) },
            end_date: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: PlaceResolver.Mutation.addReservation
    },

    // Deletes a Place for a given place_id. Returns the Place model which was deleted.
    deletePlaceById: {
        type: PlaceType,
        args: {
            place_id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: PlaceResolver.Mutation.deletePlaceById
    },

    // Deletes a Reservation for a given place_id and reservation_id. Returns the Place model with modified reservations.
    deleteReservationById: {
        type: PlaceType,
        args: {
            place_id: { type: new GraphQLNonNull(GraphQLID) },
            reservation_id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: PlaceResolver.Mutation.deleteReservationById
    }
}

module.exports = mutation;