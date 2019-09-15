const PlaceModel = require('../models/place');

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

    getPlaceWithinPriceRangeAndCountry: (parent, args) => {
        try{
            return PlaceModel.find({ country_code: args.country_code, price_per_day: { $gte: args.min_price, $lte: args.max_price }});
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
                let total_cost = place.getTotalCost(reservation.start_date, reservation.end_date);
                reservation.total_cost = total_cost;
                place.reservations.push(reservation);
                return place.save();
            } else {
                throw new Error('Place is not available for the given dates');
            }
        } catch (err) {
            throw err.message;
        }
    },

    updatePlace: async (parent, args) => {
        try{    
            const place = await PlaceModel.findById(args.place_id);
            args.place_type ? place.place_type = args.place_type : null;
            args.country_code ? place.country_code = args.country_code : null;
            args.max_guests ? place.max_guests = args.max_guests : null;
            args.no_of_bedrooms ? place.no_of_bedrooms = args.no_of_bedrooms : null;
            args.no_of_bathrooms ? place.no_of_bathrooms = args.no_of_bathrooms : null;
            args.address ? place.address = args.address : null
            args.price_per_day ? place.price_per_day = args.price_per_day : null;
            args.latitude ? place.latitude = args.latitude : null;
            args.longitude ? place.longitude = args.longitude : null;
            return await PlaceModel.findByIdAndUpdate({ _id: args.place_id}, {$set: place,}, { new: true });
        } catch(err) {
            throw err.message;
        }
    },

    deletePlaceById: async (parent, args) => {
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
