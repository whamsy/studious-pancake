/**
 * Created by whamsy on 4/24/17.
 */

// var express = require('express');
// var app = express();
//
// const pug = require('pug');
//
// // set up the template engine
// app.set('views', __dirname+'/views');
// app.set('view engine', 'pug');
//
// // GET response for '/'
// app.get('/', function (req, res) {
//     // render the 'index' template, and pass in a few variables
//     // res.render('home', { title: 'Hey', message: 'Hello there!' });
//
//     res.render('');
//
// });
//
// // start up the server
// app.listen(3000, function () {
//     console.log('Listening on http://localhost:3000');
// });


var express = require('express');
var router = express.Router();

// GET /
router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
    return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
    return res.render('contact', { title: 'Contact' });
});

module.exports = router;

