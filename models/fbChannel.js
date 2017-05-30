'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.

var FbChannelSchema = new Schema({

    id: String,
    name: String,
    likes: Number,
    pictureUrl: String,
    posts: Array,
    engagementRate: Number,
    lastUpdate: Number,
    hashtags: Array

});
//export our module to use in server.js
module.exports = mongoose.model('FbChannel', FbChannelSchema);
