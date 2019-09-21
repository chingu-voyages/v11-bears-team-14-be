//Import the mongoose module
const mongoose = require('mongoose');
const config = require('config');

/**
 * Connect to MongoDB.
 */
exports.dbconnection = () => {
    let mongoDB;
    if (config.get('node_process') == 'test') {
        mongoDB = "mongodb://karthickr:" + config.get('testMongoPwd') + "@ds247171.mlab.com:47171/v11-bears-team-14-be";
    } else {
        mongoDB = "mongodb://localhost:27017/playground";
    }
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
