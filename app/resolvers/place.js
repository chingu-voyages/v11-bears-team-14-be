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
            let deleteReservationIndex;
            for (let i = 0 ; i < place.reservations.length ; i++) {
                if (place.reservations[i].id === args.reservation_id) {
                    deleteReservationIndex = i;
                    break;
                }
            }
            let updatedReservs;
            if (deleteReservationIndex === 0 && place.reservations.length === 1) {
                updatedReservs = [];
            } else if (deleteReservationIndex === 0) {
                updatedReservs = place.reservations.splice(1, place.reservations.length);
            } else {
                let letReservs = place.reservations.splice(0, deleteReservationIndex);
                let rightReservs = place.reservations.splice(deleteReservationIndex, place.reservations.length);
                updatedReservs = letReservs.concat(rightReservs);
            }
            let updatedPlace = await PlaceModel.findByIdAndUpdate({ _id: args.place_id}, {
                $set: {
                    reservations: updatedReservs
                }
            });
            return updatedPlace;
        } catch (err) {
            throw err.message;
        }
    }
}
