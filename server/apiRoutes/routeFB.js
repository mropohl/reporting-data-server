
var FbChannel = require("../../models/fbChannel")
var fbApi = require("./fbApi");

function saveModel(model) {
    model.save(function (err) {
        if (err) {
            return err;
        }
    });
}

module.exports = function (client) {

    client.on("disconnect", function () {
        client.disconnect();
    });
    
    console.log("new client connected...");

    client.on("getFbChannelData", function (data) {
       
        console.log("Channel Data requested!");

        FbChannel.find({"id" : data.id}, function (err, channel) {

            const date = new Date();
            const currentTime = date.getTime();
            const foundChannel = channel[0];
            
            // we can only get new Data, when accessToken is provided
            if (data.token) {
                if (foundChannel ? currentTime - foundChannel.lastUpdate <= 3 : false) {
                    // channel exist and lastUpdate was only an hour ago - 3600000
                    client.emit("sendFbChannelData", channel[0]);
                } else if (!foundChannel) {
                    // channel doesnt exists, we are creating a new one and send it to the user
                    fbApi.getChannelData(data.id, data.token)
                        .then(res => {
                            const newChannel = new FbChannel();
                            newChannel.posts = res.posts
                            newChannel.name = res.name;
                            newChannel.id = res.id;
                            newChannel.lastUpdate = currentTime;
                            newChannel.pictureUrl = res.pictureUrl;
                            newChannel.likes = res.likes;
                            newChannel.hashtags = res.hashtags;
                            saveModel(newChannel);
                            client.emit("sendFbChannelData", newChannel);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } else {
                    // channel exists, but stored data is too old. We send the old one to the user first.
                    // Then we update the channel, and send the updated channel to the user when update has finished
                    client.emit("sendFbChannelData", foundChannel);
                    fbApi
                        .getChannelData(data.id, data.token)
                        .then(res => {
                            foundChannel.posts = res.posts;
                            foundChannel.name = res.name;
                            foundChannel.lastUpdate = currentTime;
                            foundChannel.pictureUrl = res.pictureUrl;
                            foundChannel.likes = res.likes;
                            foundChannel.hashtags = res.hashtags;
                            saveModel(foundChannel);
                            client.emit("sendFbChannelData", foundChannel);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            } else {
                // no accessToken provided so we send our old saved data
                client.emit("sendFbChannelData", foundChannel);
            }
        });
    })
}
