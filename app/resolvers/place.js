const PlaceModel = require('../models/place');

exports.Query = {
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
    }
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
            place.reservations.push(reservation);
            return place.save();
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
