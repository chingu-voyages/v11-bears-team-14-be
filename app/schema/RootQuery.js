const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLString
} = require("graphql");

const PlaceType = require('../types/PlaceType');
const PlaceResolver = require('../resolvers/place');
const ReservationType = require('../types/ReservationType');

const query = {

    // Returns all places
    getAllPlaces: {
        type: new GraphQLList(PlaceType),
        resolve: PlaceResolver.Query.getAllPlaces
    },

    // Returns a place for a given Place Id
    getPlaceById: {
        type: PlaceType,
        args: {
            id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: PlaceResolver.Query.getPlaceById
    },

    // Returns all places hosted by a user_id
    getAllPlacesByUserId: {
        type: new GraphQLList(PlaceType),
        args: {
            user_id: { type: GraphQLNonNull(GraphQLInt)}
        },
        resolve: PlaceResolver.Query.getAllPlacesByUserId
    },

    // Returns all places for a country code
    getPlaceByCountryCode: {
        type: new GraphQLList(PlaceType),
        args: {
            country_code: { type: GraphQLNonNull(GraphQLInt)}
        },
        resolve: PlaceResolver.Query.getPlacesByCountryCode
    },

    // Returns all places by place-type and country code
    getPlaceByTypeAndCountry: {
        type: new GraphQLList(PlaceType),
        args: { 
            country_code: { type: GraphQLNonNull(GraphQLInt)},
            place_type: { type: GraphQLNonNull(GraphQLString)}
        },
        resolve: PlaceResolver.Query.getPlaceByTypeAndCountry
    },

    // Returns all places less than the given no of guests and country code
    getPlaceByMaxGuestsAndCountry: {
        type: new GraphQLList(PlaceType),
        args: {
            country_code: { type: GraphQLNonNull(GraphQLInt)},
            guests: { type: GraphQLNonNull(GraphQLInt)}
        },
        resolve: PlaceResolver.Query.getPlaceByMaxGuestsAndCountry
    },

    // Returns all places within given price range and country code
    getPlaceWithinPriceRangeAndCountry: {
        type: new GraphQLList(PlaceType),
        args: {
            country_code: { type: GraphQLNonNull(GraphQLInt)},
            min_price: { type: GraphQLNonNull(GraphQLInt)},
            max_price: { type: GraphQLNonNull(GraphQLInt)}
        },
        resolve: PlaceResolver.Query.getPlaceWithinPriceRangeAndCountry
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