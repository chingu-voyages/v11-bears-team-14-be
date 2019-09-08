const mongoose = require('mongoose');

// Creating Date schema
const dateSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    is_available: {
        type: Boolean,
        default: true
    }
});

// Creating a model for Date
const DateModel = mongoose.model('Date', dateSchema);

module.exports = {
    dateSchema: dateSchema,
    dateModel: DateModel
}