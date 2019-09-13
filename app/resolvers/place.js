const PlaceModel = require('../models/place');

// TODO 
    // update place id
    // get all places
    // get all places by user_id
    // get places by country code
    // get places by type of place and country code
    // get places by price range and country code
    // get places by max_guests and country code



exports.Query = {

    getAllPlaces: (parent, args) => {
        try {
            return PlaceModel.find({});
        } catch (err) {
            throw err.message;
        }
    },

    getAllPlacesByUserId: (parent, args) => {
        try {
            return PlaceModel.find({ host_id: args.user_id });
        } catch (err) {
            throw err.message;
        }
    },

    getPlacesByCountryCode: (parent, args) => {
        try {
            return PlaceModel.find({ country_code: args.country_code });
        } catch (err) {
            throw err.message;
        }
    },

    getPlaceByTypeAndCountry: (parent, args) => {
        try {
            return PlaceModel.find({ country_code: args.country_code, place_type: args.place_type });
        } catch (err) {
            throw err.message;
        }
    },

    getPlaceByMaxGuestsAndCountry: (parent, args) => {
        try{
            return PlaceModel.find({ country_code: args.country_code, max_guests: {$gte: args.guests} });
        } catch(err) {
            throw err.message;
        }
    },

    getPlaceById: (parent, args) => {
        try {
            return PlaceModel.findById(args.id);
        } catch (err) {
            throw err.message;
        }
    },

    getReservationsByPlaceId: async (parent, args) => {
        try {
            let place = await PlaceModel.findById(args.id); 
            return place.reservations;
        } catch (err) {
            throw err.message;
        }
    },
}

exports.Mutation = {

    addPlace: (parent, args) => {
        try {
            const place = new PlaceModel(args);
            return place.save();
        } catch (err) {
            throw err.message;
        }
    },

    addReservation: async (parent, args) => {
        try {
            const reservation = {
                user_id: args.user_id,
                start_date: args.start_date,
                end_date: args.end_date
            }
            const place = await PlaceModel.findById(args.place_id);
            if (place.is_available(reservation.start_date, reservation.end_date)) {
                place.reservations.push(reservation);
                return place.save();
            } else {
                throw new Error('Place is not available for the given dates');
            }
        } catch (err) {
            throw err.message;
        }
    },

    deletePlaceById: async(parent, args) => {
        try {
            const deletedPlace = await PlaceModel.findByIdAndRemove(args.place_id);
            return deletedPlace;
        } catch (err) {
            throw err.message;
        }
    },

    deleteReservationById: async(parent, args) => {
        try {
            const place = await PlaceModel.findById(args.place_id);
            let updatedReservations = place.reservations.filter((element) => element.id !== args.reservation_id);
            let updatedPlace = await PlaceModel.findByIdAndUpdate({ _id: args.place_id}, {
                $set: {
                    reservations: updatedReservations
                }
            });
            return updatedPlace;
        } catch (err) {
            throw err.message;
        }
    }
}
