var bodyParser = require("body-parser");
var req = require('request');
var Jobrequest = require('../models/jobrequest');
var path = require('path');

/**
 * This function creates a new job request and company on the 'job request' page.
 *
 * @param  req  object containing information about the HTTP request that raised the event
 * @param  res  used to send back the desired HTTP response back to the browser
 * @return      saves new job request to the database
 */
exports.create = function (req, res) {
    var userData = req.body;
    var jobrequest = new Jobrequest({
        first_name: userData.firstname,
        last_name: userData.lastname,
        job_title: userData.jobtitle,
        job_location: userData.joblocation,
        job_salary: userData.jobsalary,
        individual_description: userData.individualdescription
    });

    jobrequest.save(function (err, results) {
        if (err)
            res.status(500).send('Invalid data!');
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(jobrequest));
    });
};


/**
 * This function lists the job applicants' details on the 'Job Request Search' page
 *
 * @param  req  object containing information about the HTTP request that raised the event
 * @param  res  used to send back the desired HTTP response back to the browser
 * @return      render of the 'Job Request Search' Page
 */
exports.list = function (req, res) {
    Jobrequest.find({}, 'first_name last_name job_title job_location job_salary individual_description', function (err, jobrequest) {
        if (err) {
            return res.send(500, err);
        }
        res.render('requestlist', {
            title: "Job Request",
            data: jobrequest
        });
    });
};