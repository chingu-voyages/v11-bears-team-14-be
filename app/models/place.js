const mongoose = require('mongoose');

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
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        required: true
    }
});

// Creating a model for Place
const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
