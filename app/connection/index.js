//Import the mongoose module
const mongoose = require('mongoose');

/**
 * Connect to MongoDB.
 */
exports.dbconnection = () => {
    const mongoDB = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SRV}/test?retryWrites=true`;
    // mongoose.set('useFindAndModify', false);
    // mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);
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