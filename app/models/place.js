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
       }
    ],
    latitude: {
        type: String
    },
    longitude: {
        type: String
    }
});

// placeSchema.methods.isPlaceAvailable = (Place, startDate, endDate) => {
//     let availableDates = Place.available_dates;
//     return isValid(startDate, endDate, availableDates);
// }

placeSchema.method.is_available = function(startDate, endDate) {
  const res = this.reservations.find((booking) => {
    if (booking.start_date < startDate) {
      if (bookings.end_date < startDate) {
        return false;
      } else {
        return true;
      }
    } else if (booking.start_date <= endDate) {
      return true;
    } else {
      return false;
    }
  });
  if (!!res) {
    return false;
  }
}

// function isValid(start, end, availableDates) {
//     let isStartDateAvailable = false;
//     let isEndDateAvailable = false;
//     for (let i = 0 ; i < availableDates.length ; i++) {
//         let date = availableDates[i].date;
//         let isDateAvailable = availableDates[i].is_available;
//         if (start == date && isDateAvailable) {
//             isStartDateAvailable = true;
//         }
//         if (end == date && isDateAvailable) {
//             isEndDateAvailable = true;
//         }
//     }
//     return (isStartDateAvailable && isEndDateAvailable);
// }

// Creating a model for Place
const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
