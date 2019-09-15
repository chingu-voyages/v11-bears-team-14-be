const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt
} = require("graphql");

const PlaceType = require('../types/PlaceType');
const PlaceResolver = require('../resolvers/place');
const UserType = require('../types/UserType');
const UserResolver = require('../resolvers/user');

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
            price_per_day: { type: new GraphQLNonNull(GraphQLInt) },
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
            end_date: { type: new GraphQLNonNull(GraphQLString) },
            total_price: { type: GraphQLInt }
        },
        resolve: PlaceResolver.Mutation.addReservation
    },

    // Updates the values of an existing place
    updatePlace: {
        type: PlaceType,
        args: {
            place_id: { type: new GraphQLNonNull(GraphQLID) },
            place_type: { type: GraphQLString },
            country_code: { type: GraphQLInt },
            max_guests: { type: GraphQLInt },
            no_of_bedrooms: { type: GraphQLInt },
            no_of_bathrooms: { type: GraphQLInt },
            address: { type: GraphQLString },
            price_per_day: { type: GraphQLInt },
            latitude: { type: GraphQLString },
            longitude: { type: GraphQLString }
        },
        resolve: PlaceResolver.Mutation.updatePlace
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
    },
  
    user: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        country_code: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: UserResolver.Mutation.createUser,
    },
  
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: {type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: UserResolver.Mutation.login,
    }
}
module.exports = mutation;