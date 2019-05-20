var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Character = new Schema(
    {
        job_title: {type: String, required: true, max: 100},
        company_name: {type: String, required: true, max: 100},
        job_location: {type: String, required: true, max: 100},
        job_salary: {type: Number},
        job_description: {type: String, max: 200},
        job_rating: {type: Number, min:0, max: 10},
        job_image: {type: String}
    }
);

var Character = mongoose.model('Character', Character);

// make this available to our users in our Node applications
module.exports = Character;