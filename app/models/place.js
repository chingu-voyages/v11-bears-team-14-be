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
    reservations: [
       {
         user_id: Number,
         start_date: Date,
         end_date: Date,
         total_cost: Number
       }
    ],
    price_per_day: {
      type: Number,
      required: true
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    }
});

placeSchema.methods.is_available = function(startDate, endDate) {

  // Find any existing reservations that collide with the (startDate, endDate)
  let result = true;
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  for (let i = 0 ; i < this.reservations.length ; i++) {
    let booking = this.reservations[i];
    if ((startDate < booking.start_date && endDate < booking.start_date) || (startDate > booking.end_date && endDate > booking.end_date)) {
      result = true;
    } else {
      return false;
    }
  }
  return result;
}

placeSchema.methods.getTotalCost = function(startDate, endDate) {

  startDate = new Date(startDate);
  endDate = new Date(endDate);
  let diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  let total_days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (total_days + 1) * this.price_per_day;
}

// Creating a model for Place
const Place = mongoose.model('Place', placeSchema);

module.exports = Place;