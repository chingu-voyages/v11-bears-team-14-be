const PlaceModel = require('../models/place');

exports.Mutation = {
    addPlace: (parent, args) => {
        const place = new PlaceModel(args);
        return place.save();
    },

    addReservation: async (parent, args) => {
        const reservation = {
            user_id: args.user_id,
            start_date: args.start_date,
            end_date: args.end_date
        }
        const place = await PlaceModel.findById(args.place_id);
        place.reservations.push(reservation);
        return place.save();
    }
}
