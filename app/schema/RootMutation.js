const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt
} = require("graphql");

const PersonType = require('../types/PersonType');
const PersonResolver = require('../resolvers/person');
const PlaceType = require('../types/PlaceType');
const PlaceResolver = require('../resolvers/place');

const mutation = {
    person: {
        type: PersonType,
        args: {
            firstname: { type: GraphQLNonNull(GraphQLString) },
            lastname: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: PersonResolver.Mutation.create
    },

    // Adds a new place without reservations
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

    // Adds a reservation for a particular place_id
    addReservation: {
        type: PlaceType,
        args: {
            place_id: { type: new GraphQLNonNull(GraphQLID) },
            user_id: { type: new GraphQLNonNull(GraphQLInt) },
            start_date: { type: new GraphQLNonNull(GraphQLString) },
            end_date: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: PlaceResolver.Mutation.addReservation
    }
}

module.exports = mutation;