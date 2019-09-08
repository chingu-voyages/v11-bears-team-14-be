const mongoose = require('mongoose');
const dateSchema = require('./date').dateSchema;

// Creating Place schema
const placeSchema = mongoose.Schema({
    place_type: {
        type: String,
        required: true
    },
    host_id: {
        type: String,
        required: true
    },
    country_code: {
        type: Number,
        required: true
    },
    max_guests: {
        type: Number,
        default: 1,
        required: true
    },
    no_of_bedrooms: {
        type: Number,
        required: true
    },
    no_of_bathrooms: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    available_dates: [ dateSchema ],
    latitude: {
        type: String
    },
    longitude: {
        type: String
    }
});

placeSchema.methods.isPlaceAvailable = (Place, startDate, endDate) => {
    let availableDates = Place.available_dates;
    return isValid(startDate, endDate, availableDates);
}

function isValid(start, end, availableDates) {
    let isStartDateAvailable = false;
    let isEndDateAvailable = false;
    for (let i = 0 ; i < availableDates.length ; i++) {
        let date = availableDates[i].date;
        let isDateAvailable = availableDates[i].is_available;
        if (start == date && isDateAvailable) {
            isStartDateAvailable = true;
        } 
        if (end == date && isDateAvailable) {
            isEndDateAvailable = true;
        }
    }
    return (isStartDateAvailable && isEndDateAvailable);
}

// Creating a model for Place
const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
