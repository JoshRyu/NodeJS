var mongoose = require('mongoose');

//The URL which will be queried. Run "mongod.exe" for this to connect
var mongoDB = 'mongodb://localhost:27017/jobrequest';

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB);
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
