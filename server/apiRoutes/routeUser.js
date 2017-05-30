
var User = require('../../models/user');

module.exports = function (router) {

    //adding the /user route to our /api router
    router.route('/user/:jwt_id')
        //retrieve wanted user from the database
        .get(function (req, res) {
            User.find({"jwtId" : req.params.jwt_id}, function (err, user) {
                if (err) {
                    res.send(err);
                }
                //responds with a json object of our requestet user
                res.json(user)
            });

        })
        //post new user to the database
        .post(function (req, res) {

            const user = new User();
            user.jwtId = req.params.jwt_id;

            user.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({message: "User added to DB!"})
            })
        });

    router.route('/user/:jwt_id/fbtoken')
        //post new long lasting fb acess token to the user, so it stored for future use
        .post(function (req, res) {
            User.update({"jwtId" : req.params.jwt_id}, {
                "fbAccessToken" : req.body.fbAccessToken
            }, function (err, user) {
                if (err) {
                    res.send(err);
                }
                res.json({message: 'fb token updated/added!'});
            })

        });

    router.route("/user/:jwt_id/fbchannels/:channel_id")
        //post new fb channel to the user
        .post(function (req, res) {
            User.update({"jwtId" : req.params.jwt_id}, {
                $push : {"fbAddedChannels" : {"id": req.params.channel_id}}
            }, function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({message: 'FB Channel send to user!'});
            })
        })
        //delete fb channel from User
        .delete(function (req, res) {
            User.update({ "jwtId": req.params.jwt_id}, {
                $pull : {"fbAddedChannels" : {"id" : req.params.channel_id}}
            }, function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'FB Channel has been deleted' })
            })
        });
}
