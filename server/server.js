var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('../models/user');
var Report = require('../models/report');
var ReportPost = require('../models/reportPost');
var SharedReport = require('../models/sharedReport');


var path = require('path');

var app = express();
var router = express.Router();

if (process.env.NODE_ENV !== 'production') {
    var config = require('../webpack.config.js');
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
    app.use(webpackHotMiddleware(compiler));
}


var port = process.env.PORT || 3000;

//db config
mongoose.connect('mongodb://mropohl:Hertha09@ds155747.mlab.com:55747/reporting-test');

app.use(express.static('./dist'));

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//now we can set the route path & initialize the API
router.get('/', function (req, res) {
    res.json({ message: 'API Initialized!'});
});

//adding the /comments route to our /api router
router.route('/user/:user_id')
    //retrieve all comments from the database
    .get(function (req, res) {
        //looks at our Comment Schema

        User.find({"fbID" : req.params.user_id}, function (err, users) {
            if (err) {
                res.send(err);
            }
            //responds with a json object of our database comments.
            res.json(users)
        });

    })

    //post new comment to the database
    .post(function (req, res) {

        User.update({"fbID" : req.params.user_id}, {
            "fbID" : req.body.fbID,
            "accessToken" : req.body.accessToken,
            "name" : req.body.name
        }, {upsert: true}, function (err, user) {
            if (err) {
                res.send(err)
            }
            res.json({message: 'User updated!'});

        })

    });

router.route('/user/:user_id/pages')

    //post new post to a report
    .post(function (req, res) {
        reportPost = new ReportPost()
        reportPost.id = req.body.id

        //User.find({"fbID" : req.body.userID, "reportings.id" : req.body.reportID}, function (err, report) {
        //        res.json(report)
        //})
        User.update({"fbID" : req.params.user_id},
        {$push : {"addedPages" : {"pageID" : req.body.pageID}}
        }, function (err) {
            if (err) {
                res.send(err);
            }
            //res.json({reportPost})
            res.json({message: 'Page successfully send to user!'});
        })
    })

router.route('/user/:user_id/:page_id')

    .delete(function (req, res) {
        User.update({ "fbID": req.params.user_id}, {
            $pull : {"addedPages" : {"pageID" : req.params.page_id}}
        }, function (err, comment) {
            if (err)
            res.send(err);
            res.json({ message: 'Page has been deleted' })
        })
    })

router.route('/shared/reportings/:report_id')

    .get(function (req, res) {
        //looks at our Comment Schema
        SharedReport.find({"sahredID" : req.params.report_id}, function (err, user) {
            if (err) {
                res.send(err);
            }
            //responds with a json object of our database comments.
            res.json(user)
        });
    })

router.route('/shared/reportings')

    .post(function (req, res) {
        let report = new SharedReport()
        report.name = req.body.name;
        report.sharedID = req.body.id,
        report.posts = req.body.posts

        report.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Shared Report successfully created!'});
        })
    });

router.route('/reportings')
    //retrieve all comments from the database
    .get(function (req, res) {
        //looks at our Comment Schema
        Report.find(function (err, user) {
            if (err) {
                res.send(err);
            }
            //responds with a json object of our database comments.
            res.json(user)
        });
    })

    //post new comment to the database
    .post(function (req, res) {
        report = new Report()
        report.name = req.body.name;
        report.id = req.body.id,
        report.userID = req.body.userID

        report.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Report successfully created!'});
        })
    });

router.route('/reportings/post')

    //post new post to a report
    .post(function (req, res) {
        reportPost = new ReportPost()
        reportPost.id = req.body.id

        //User.find({"fbID" : req.body.userID, "reportings.id" : req.body.reportID}, function (err, report) {
        //        res.json(report)
        //})
        Report.update({"id" : req.body.reportID},
        {$push : {"posts" : reportPost}
        }, function (err) {
            if (err) {
                res.send(err);
            }
            //res.json({reportPost})
            res.json({message: 'Post successfully send to report!'});
        })
    })

router.route('/reportings/:user_id')

    .get(function (req, res) {
        Report.find({ "userID": req.params.user_id}, function (err, reports) {
            if (err)
            res.send(err);
            res.json(reports)
        })
    })

router.route('/:report_id')

    .delete(function (req, res) {
        Report.remove({ "id": req.params.report_id}, function (err, comment) {
            if (err)
            res.send(err);
            res.json({ message: 'Report has been deleted!' })
        })
    })

router.route('/:report_id/:post_id')

    .delete(function (req, res) {
        Report.update({ "id": req.params.report_id}, {
            $pull : {"posts" : {"id" : req.params.post_id}}
        }, function (err, comment) {
            if (err)
            res.send(err);
            res.json({ message: 'Post has been deleted' })
        })
    })

app.use('/api', router);

app.use('/shared/report/:report_id', function (req, res) {
    res.sendFile(path.resolve('client/report.html'));
});

app.use('/', function (req, res) {
    res.sendFile(path.resolve('client/index.html'));
});

app.listen (port, function (error) {
    if (error) throw error;
    console.log("Express server listening on port", port);
});
