var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");
var multer = require('multer');
var fs = require('file-system');

var character = require('../controllers/characters');
var jobrequest = require('../controllers/jobrequest');
var Character = require('../models/characters');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Hire Me - Find Your Future' });
});

/* GET index page. */
router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Hire Me - Find Your Future' });
});

/* GET search page. */
router.get('/search', function(req, res, next) {
    character.list(req,res);
});

/* GET job request list. */
router.get('/requestlist', function(req, res, next) {
    jobrequest.list(req, res);
});

/* GET job submit page. */
router.get('/submit', function(req, res, next) {
    res.render('submit', { title: 'Submit a Job Listing' });
});

/* POST job submit form. */
router.post('/submit', function(req, res) {
    character.create(req,res);
});

/* GET job request page. */
router.get('/jobrequest', function(req, res, next) {
    res.render('jobrequest', {title: 'Submit a Job Request'});
});

/* POST job request form. */
router.post('/jobrequest', function(req, res) {
    jobrequest.create(req,res)
});

var randomNumber = Math.random();
var roundedNumber = Math.round(randomNumber * 100) / 100;

var setImg = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads/')
    },
    filename: function (req, file, callback) {
        var imageName = req.params.id + roundedNumber +  "_" + file.originalname;
        var imageData = req.params.id;
        callback(null, imageName);
        Character.update({'company_name': imageData}, {'job_image': imageName}, function(err){
            if (err) {
                return res.send(500, err);
            }
        });
    }
});

var uploadFile = multer({storage: setImg});

/* GET job details page. */
router.get('/joblist/:id', character.jobListing);

/* GET company page. */
router.get('/company', function(req, res, next) {
    character.companyList(req, res);
});

/* POST company image upload. */
router.post('/company/:id', uploadFile.single('image'), function(req, res) {
    res.redirect('/company');
});

/* POST company rating form. */
router.post('/company/rating/:id', function(req, res) {
    var updatedRating = req.body.jobrating;
    var jobRating = req.params.id;
    Character.update({'job_rating': jobRating }, {'job_rating': updatedRating}, function(err){
        if (err) {
            return res.send(500, err);
        }
    });
    res.redirect('/company');
});

module.exports = router;
