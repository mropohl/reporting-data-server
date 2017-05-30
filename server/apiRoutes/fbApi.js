const FbChannel = require("../../models/fbChannel")
const FbChannelPost = require("../../models/fbChannelPost")
const axios = require("axios");

function getPosts(accessToken, id) {

    return new Promise ((resolve, reject) => {
        let postsArr = [];
        function recursiveAPICall(fbUrl) {
            axios.get(
                fbUrl + "&access_token=" + accessToken
            )
            .then(response => {
                if (response && response.data.data) {
                    console.log(response.data.data);
                    postsArr = postsArr.concat(response.data.data);
                    if (response.data.paging && response.data.paging.next) {
                        recursiveAPICall(response.data.paging.next);
                    } else {
                        resolve(postsArr);
                    }
                } else {
                    reject("ERROR: Error occured when getting posts from Facebook API");
                }
            })
            .catch(err => {
                console.log(err);
                reject("ERROR: Error occured when getting posts from Facebook API");
            })
        }
        recursiveAPICall('https://graph.facebook.com/' + id + '/posts?limit=100&fields=id,likes.summary(true).limit(1),reactions.summary(true).limit(1),comments.summary(true).limit(1),created_time,link,message,message_tags,object_id,shares');
    })
}

function getLikers(accessToken, id) {

    return new Promise ((resolve, reject) => {
        let likerArr = [];
        function recursiveAPICall(fbUrl) {
            axios.get(fbUrl + "&access_token=" + accessToken, {'timeout': 10000000})
            .then(response => {
                if (response && response.data && response.data.likes && response.data.likes.data) {
                    likerArr = likerArr.concat(response.data.likes.data);
                    if (response.data.likes.paging && response.data.likes.paging.next) {
                        recursiveAPICall(response.data.likes.paging.next);
                    } else {
                        resolve(likerArr);
                    }
                } else if (response && response.data.data) {
                    likerArr = likerArr.concat(response.data.data);
                    if (response.data.paging && response.data.paging.next) {
                        recursiveAPICall(response.data.paging.next);
                    } else {
                        resolve(likerArr);
                    }
                } else {
                    resolve(likerArr);
                    //reject("ERROR: Error occured when getting likers from Facebook API");
                }
            })
            .catch(err => {
                //console.log(err.error);
                //reject("ERROR: Error occured when getting likers from Facebook API");
                resolve(likerArr);
            })
        }
        recursiveAPICall('https://graph.facebook.com/' + id + '?fields=likes');
    })
}

function getFollowerData(posts, accessToken) {

    return new Promise ((resolve, reject) => {

        let followerData = [];
       
        let promises = posts.map((post) => {
            const postId = post.id;
            return getLikers(accessToken, postId)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log(err);
            })
        });

        Promise.all(promises)
            .then((result) => {
                const concatResult = [].concat.apply([], result);
                const noDoubles = removeDoubles(concatResult)
                console.log("no doubles:")
                console.log(noDoubles);
                let promises = noDoubles.map((user) => {
                    const userId = user.id;
                    axios.get("https://graph.facebook.com/" + userId + "?fields=name&access_token=" + accessToken)
                    .then(res => {
                        console.log("UserData");
                        console.log(res.data);
                        axios.get("https://graph.facebook.com/" + userId + "/picture?redirect=false&height=1000&width=1000&access_token=" + accessToken)
                        .then(res => {
                            console.log("UserData")
                            console.log(res.data)
                        })
                        .catch(err=>{
                            console.log(err.response);
                        })
                    })
                    .catch(err=>{
                        console.log(err.response);
                    })
                });
                resolve(noDoubles);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            })
        
    });
}

function removeDoubles (arr) {
    const results = {};
    arr.map(item => {
        if(item.id in results) {

        } else {
            results[item.id] = {name: item.name}
        }
    })
    const resultsArr = [];
    for(item in results) {
        let newItem = {}
        newItem.id = item;
        resultsArr.push(newItem)
    }
    return resultsArr;
}

function getHashTags(string) {
    var hashTags, i, len, word, words;
    words = string.split(/[\s\r\n]+/);
    hashTags = [];
    for (i = 0, len = words.length; i < len; i++) {
        word = words[i];
        if (word.indexOf('#') === 0) {
        hashTags.push(word);
        }
    }
    return hashTags;
}

function calculatePostNumbers (posts, pageReach, accessToken) {
    
    const hashtags = {};

    newPosts = posts.map((post) => {
        post.comments ? post.comments = post.comments.summary.total_count : post.comments = 0;
        post.reactions ? post.reactions = post.reactions.summary.total_count : post.reactions = 0;
        post.shares ? post.shares = post.shares.count : post.shares = 0;
        post.engagement = (post.comments + post.reactions + post.shares) / pageReach;
        if (post.message) {
            getHashTags(post.message).map((hashtag) => {
                if (hashtag in hashtags) {
                    let temp = hashtags[hashtag];
                    temp.number = temp.number + 1;
                    temp.posts.push(post.id);
                    temp.engRate.push(post.engagement);
                    hashtags[hashtag] = temp;
                } else {
                    hashtags[hashtag] = {posts: [post.id], number: 1, engRate: [post.engagement]};
                }
            })
        }
        return post;
    })

    for (var hashtag in hashtags) {

        let i = 0;
        let engRates = 0;
        hashtags[hashtag].engRate.map((rate) => {
            engRates = engRates + rate;
            i++;
        })
        hashtags[hashtag].engRate = engRates / i;
    }
    return [newPosts, hashtags];
}

module.exports = {
    getChannelData: function (id, accessToken) {
        return new Promise ((resolve, reject) => {
            axios
                .get( "https://graph.facebook.com/" + id + "?fields=name,fan_count,picture,likes&access_token=" + accessToken)
                .then(response => {
                    const channelData = {};
                    channelData.name = response.data.name;
                    channelData.likes = response.data.fan_count;
                    channelData.pictureUrl = response.data.picture.data.url;
                    channelData.id = id;
                   
                    getPosts(accessToken, id)
                        .then(posts => {
                            calculatedData = calculatePostNumbers(posts, channelData.likes, accessToken);
                            channelData.posts = calculatedData[0];
                            channelData.hashtags = calculatedData[1];
                            /*
                            getFollowerData(posts, accessToken)
                            .then(followerData => {
                                channelData.followerData = followerData;
                                console.log("got all data from FB Api")
                                resolve(channelData);
                            })
                            .catch(err => {
                                reject(err);
                            })*/
                            resolve(channelData);
                        })
                        .catch( err => {
                            reject(err);
                        })
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}
