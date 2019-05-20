var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Jobrequest = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        last_name: {type: String, required: true, max: 100},
        job_title: {type: String, required: true, max: 100},
        job_location: {type: String, required: true, max: 100},
        job_salary: {type: Number},
        individual_description: {type: String, max: 200}
    }
);

var Jobrequest = mongoose.model('Jobrequest', Jobrequest);

// make this available to our users in our Node applications
module.exports = Jobrequest;