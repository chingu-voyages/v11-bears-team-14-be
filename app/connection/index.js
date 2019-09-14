//Import the mongoose module
const mongoose = require('mongoose');
const config = require('config');

/**
 * Connect to MongoDB.
 */
exports.dbconnection = () => {
    const mongoDB = config.get('db');
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.connect(mongoDB)
        .then(() => {
            console.log('Connection successful');
        })
        .catch((err) => {
            console.error(err);
            console.log('MongoDB connection error. Please make sure MongoDB is running.');
            process.exit();
        });
}
