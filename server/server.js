var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');

var path = require("path");
var app = express();
var socket = require("./apiRoutes/routeFB");
var socketioJwt = require("socketio-jwt");

var port = process.env.PORT || 4000;

const authCheck = jwt({
    secret: new Buffer('IcpQ1Rrh3P69-NqW-xHHIDCw1Gnx--IrSiI8TeS0XF8bDPwz4zso0SclZPe12Tzf', 'base64'),
    audience: 'VkvmxfqltnJcBmjzAYpVkOsoRiC6NJnj'
});

//db config
let options = {
    server: {},
    replset: {}
}

options.server.socketOptions = options.replset.socketOptions = { keepAlive: 120 };
mongoose.connect('mongodb://mropohl:Hertha09@ds155747.mlab.com:55747/reporting-test', options);

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
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
    //remove caching
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var io = require("socket.io").listen(port);
io.on("connection", socketioJwt.authorize({
    secret: new Buffer('IcpQ1Rrh3P69-NqW-xHHIDCw1Gnx--IrSiI8TeS0XF8bDPwz4zso0SclZPe12Tzf', 'base64'),
    timeout: 15000 // 15 seconds to send the authentication message
})).on('authenticated', socket); 

