//model/report.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.

var SharedReportSchema = new Schema({

    name: String,
    sharedID: String,
    posts: Array

});
//export our module to use in server.js
module.exports = mongoose.model('SharedReport', SharedReportSchema);
