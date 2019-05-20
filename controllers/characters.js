var bodyParser = require("body-parser");
var req = require('request');
var Character = require('../models/characters');
var path = require('path');
var async = require('async');


/**
 * This function creates a new job listing and company on the 'submit' page.
 *
 * @param  req  object containing information about the HTTP request that raised the event
 * @param  res  used to send back the desired HTTP response back to the browser
 * @return      saves new job to the database
 */
exports.create = function (req, res) {
    var userData = req.body;
    var character = new Character({
        job_title: userData.jobtitle,
        job_salary: userData.jobsalary,
        company_name: userData.companyname,
        job_location: userData.joblocation,
        job_description: userData.jobdescription,
        job_rating: userData.jobrating,
        job_image: userData.jobimage
    });

    character.save(function (err, results) {
        if (err)
            res.status(500).send('Invalid data!');
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(character));
    });
};

/**
 * This function pulls search parameters from the 'index' to the 'search' page
 *
 * @param  req  object containing information about the HTTP request that raised the event
 * @param  res  used to send back the desired HTTP response back to the browser
 * @return      render of the 'search' Page
 */
exports.list = function (req, res) {
    Character.find({}, 'job_title job_salary company_name job_location job_rating job_description job_image', function (err, characters) {
        if (err) {
            return res.send(500, err);
        }
        if (req.query.jobname ==  null){
            res.render('search', {
                title: "Search page",
                data: characters, job: 'placeholder=Job name', location: 'placeholder=Location name'
            });
        }
        else {
            res.render('search', {
                title: "Search page",
                data: characters, job: 'value=' + req.query.jobname, location: 'value=' + req.query.joblocation
            });
        }
    });
};

/**
 * This function lists the company details and reviews on the 'company' page
 *
 * @param  req  object containing information about the HTTP request that raised the event
 * @param  res  used to send back the desired HTTP response back to the browser
 * @return      render of the 'company' Page
 */
exports.companyList = function (req,res) {
    Character.find({}, 'company_name job_rating job_description job_image', function (err, characters) {
        if (err) {
            return res.send(500, err);
        }
        res.render('company', {
            title: "Company Reviews",
            data: characters
        });
    });
};

/**
 * This function lists the job details on the 'joblist' page.
 *
 * @param  req  object containing information about the HTTP request that raised the event
 * @param  res  used to send back the desired HTTP response back to the browser
 * @return      render of the 'joblist' page
 */
exports.jobListing = function (req, res) {
    async.parallel({
        character: function (callback) {
            Character.findById(req.params.id).exec(callback)
        }
    }, function (err, results) {
        if(err) { return next(err); }
        if (results.character==null) {
            var err = new Error('User not found.');
            err.status = 404;
            return next(err);
        }
        console.log("CHARACTER");
        console.log(results.character);
        console.log("RESULTS");
        res.render('joblist', { title: 'User profile page', data: results.character});

    });
};

/**
 * This function pulls search parameters from the 'index' to the 'search' page
 *
 * @param  req  object containing information about the HTTP request that raised the event
 * @param  res  used to send back the desired HTTP response back to the browser
 * @return      render of the 'search' Page
 */
exports.search = function (req, res) {
    var searchJobTitle = req.body.name;
    var searchJobLocation = req.body.location;
    Character.find({'job_title': searchJobTitle}, function(err, characters) {
        if (err) {
            return res.send(500, err);
        }
        res.render('search');
    });
    res.render('search', {
        name: searchJobTitle,
        location: searchJobLocation
    });
};
