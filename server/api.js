var express = require("express");
var User = require('../models/user');
var FbChannel = require("../models/fbChannel")
var SharedReport = require('../models/sharedReport');
var RouteUser = require("./apiRoutes/routeUser")
var RouteFB = require("./apiRoutes/routeFB")


var router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: 'Data API Initialized!'});
});

RouteUser(router);
RouteFB(router);

module.exports = router;
