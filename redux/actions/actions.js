import uuid from 'node-uuid'
import axios from 'axios'

export function LoginAsync(id, accessToken) {
    console.log('Async Login successful...')
    return {
        type: 'USER_LOGIN',
        id: id,
        accessToken: accessToken
    }
}

export function LogoutAsync() {
    console.log('Async Logout successful...')
    return {
        type: 'USER_LOGOUT'
    }
}

export function SetUserName(name) {
    return {
        type: 'SET_USER_NAME',
        name: name
    }
}

export function AddManagedPage(id, accessToken, name) {
    return {
        type: 'ADD_MANAGED_PAGE',
        id: id,
        accessToken: accessToken,
        name: name
    }
}

export function AddPageAsync(id, name) {
    return {
        type: 'ADD_PAGE',
        id: id,
        name: name
    }
}

export function AddPage_InvalidURL(name) {
    return {
        type: 'ADD_PAGE_INVALID_URL'
    }
}

export function InvalidURLDismissAsync() {
    return {
        type: 'ADD_PAGE_INVALID_URL_DISMISS'
    }
}

export function AddPageSuccessAsync() {
    return {
        type: 'ADD_PAGE_SUCCESS'
    }
}

export function AddPageSuccessDismissAsync() {
    return {
        type: 'ADD_PAGE_SUCCESS_DISMISS'
    }
}

export function AddPageAlertDismissAsync() {
    return {
        type: 'ADD_PAGE_ALERT_DISMISS'
    }
}

export function LoadPageDataAsync(likes, pictureUrl, id) {
    return {
        type: 'LOAD_PAGE_DATA',
        likes: likes,
        pictureUrl: pictureUrl,
        id: id
    }
}

export function LoadPagePostsAsync(posts, id) {
    return {
        type: 'LOAD_PAGE_POSTS',
        posts: posts,
        id: id
    }
}

export function CreateReport(name, id) {
    return {
        type: 'CREATE_REPORT',
        name: name,
        id: id
    }
}

export function SetActiveReport(name) {
    return {
        type: 'SET_ACTIVE_REPORT',
        name: name
    }
}

export function setActivePageAsync(id) {
    return {
        type: 'SET_ACTIVE_PAGE',
        id: id
    }
}

export function UncheckPosts() {
    return {
        type: 'UNCHECK_POSTS'
    }
}

export function MarkPostInReports(id, message, created_time, pageID, reportName) {
    return {
        type: 'MARK_POST_IN_REPORTS',
        id: id,
        message: message,
        created_time: created_time,
        pageID: pageID,
        reportName: reportName
    }
}

export function addPostToReport(id, message, created_time, imgLink, likes, pageID, shares, comments) {
    return {
        type: 'ADD_POST_TO_REPORT',
        id: id,
        message: message,
        created_time: created_time,
        imgLink: imgLink,
        likes: likes,
        pageID: pageID,
        shares: shares,
        comments: comments

    }
}

export function loadPostDataAsync(id, pageID, likes, shares, comments) {
    return {
        type: 'LOAD_POST_DATA',
        id: id,
        pageID: pageID,
        likes: likes,
        shares: shares,
        comments: comments
    }
}

export function loadReportPostDataAsync(id, reportID, likes, shares, comments, message, created_time) {
    return {
        type: 'LOAD_REPORT_POST_DATA',
        id: id,
        reportID: reportID,
        likes: likes,
        shares: shares,
        comments: comments,
        message: message,
        created_time: created_time
    }
}

export function loadPostImageAsync(id, pageID, imgLink) {
    return {
        type: 'SET_POST_IMG',
        id: id,
        pageID: pageID,
        imgLink: imgLink
    }
}

export function loadReportPostImageAsync(id, reportID, imgLink) {
    return {
        type: 'SET_REPORT_POST_IMG',
        id: id,
        reportID: reportID,
        imgLink: imgLink
    }
}

export function PageLoadedTrue() {
    return {
        type: 'PAGE_LOADED_TRUE'
    }
}

export function deleteReportAsync() {
    return {
        type: 'DELETE_REPORT'
    }
}

export function deletePageAsync() {
    return {
        type: 'DELETE_PAGE'
    }
}

export function removePostFromReport(id) {
    return {
        type: 'REMOVE_POST_FROM_REPORT',
        id: id
    }
}

export function loadReportings(id, name, posts) {
    return {
        type: 'LOAD_REPORT',
        id: id,
        name: name,
        posts: posts
    }
}

let actions = {

    sendUserData: function () {

    },

    showActiveReport: function () {
        return {
            type: 'SHOW_ACTIVE_REPORT'
        }
    },

    closeActiveReport: function () {
        return {
            type: 'CLOSE_ACTIVE_REPORT'
        }
    },

    HideLoadingScreen: function () {
        return {
            type: 'HIDE_LOADING_SCREEN'
        }
    },

    deleteReport: function (reportID) {

        return function (dispatch) {
            dispatch(deleteReportAsync())
            dispatch(SetActiveReport(undefined))

            axios.delete('https://radiant-escarpment-73210.herokuapp.com//api/' + reportID)
            .then(res => {
                console.log(res);
                console.log("Report deleted!");
            })
            .catch(err => {
                console.error(err);
            });
        }
    },

    CreateReport: function (name, userID) {
        return function (dispatch) {
            let repID = uuid.v4()
            dispatch(CreateReport(name, repID))
            dispatch(SetActiveReport(name))
            dispatch(UncheckPosts())
            let body = {
                "name" : name,
                "id" : repID,
                "userID": userID
            }

            axios.post('https://radiant-escarpment-73210.herokuapp.com//api/reportings', body)
            .then(res => {
                console.log(body);
                console.log("Report Send");
            })
            .catch(err => {
                console.error(err);
            });

        }
    },

    addPostToReport: function (id, message, created_time, imgLink, likes, pageID, shares, comments, reportID, userID) {

        return function (dispatch) {
            dispatch(addPostToReport(id, message, created_time, imgLink, likes, pageID, shares, comments))

            let body = {
                "id" : id,
                reportID: reportID,
                userID: userID
            }

            axios.post('https://radiant-escarpment-73210.herokuapp.com//api/reportings/post', body)
            .then(res => {
                console.log(body);
                console.log("Post send to report");
            })
            .catch(err => {
                console.error(err);
            });
        }
    },

    RemovePostFromReport: function (id, reportID) {
        return function (dispatch) {

            dispatch(removePostFromReport(id))

            axios.delete('https://radiant-escarpment-73210.herokuapp.com//api/' + reportID + '/' + id)
            .then(res => {
                console.log(res);
                console.log("Post deleted from Report");
            })
            .catch(err => {
                console.error(err);
            });
        }

    },

    SetActiveReport: function (name) {
        return {
            type: 'SET_ACTIVE_REPORT',
            name: name
        }
    },

    CloseCreateReportModal: function () {
        return {
            type: 'CLOSE_DIALOG_CREATE_REPORT'
        }
    },

    StartCreateReportDialog: function () {
        return {
            type: 'START_DIALOG_CREATE_REPORT'
        }
    },

    UncheckPostsReset: function () {
        return {
            type: 'UNCHECK_POSTS_RESET'
        }
    },

    CheckPost: function (id, pageID) {
        return {
            type: 'CHECK_POST',
            id: id,
            pageID: pageID
        }
    },

    UncheckPost: function (id, pageID) {
        return {
            type: 'UNCHECK_POST',
            id: id,
            pageID: pageID
        }
    },

    RegisterUser: function (id, accessToken) {
        return function (dispatch) {


            dispatch(LoginAsync(id, accessToken))
            FB.api('/me', function (response) {
                dispatch(SetUserName(response.name))
                let body = {
                    "accessToken" : accessToken,
                    "fbID" : id,
                    "name": response.name
                }
                axios.post('https://radiant-escarpment-73210.herokuapp.com//api/user/' + id, body)
                .then(res => {
                    console.log("New User send");
                    console.log(body)
                })
                .catch(err => {
                    console.error(err);
                });
            })
        }
    },

    Login: function () {

        return function (dispatch) {

            let accessToken
            let userID
            let name

            FB.login (function (response) {
                console.log('Logging in...')
                accessToken = response.authResponse.userID
                userID = response.authResponse.userID
                dispatch(LoginAsync(response.authResponse.userID, response.authResponse.accessToken))
                FB.api('/me', function (response) {
                    name = response.name
                    let body = {
                        "accessToken" : accessToken,
                        "fbID" : userID,
                        "name": name
                    }
                    dispatch(SetUserName(response.name))
                    axios.post('https://radiant-escarpment-73210.herokuapp.com//api/user' + userID, body)
                    .then(res => {
                        console.log("New User send");
                        console.log(body)
                    })
                    .catch(err => {
                        console.error(err);
                    })
                    axios.get('https://radiant-escarpment-73210.herokuapp.com//api/reportings/' + userID)
                    .then(res => {
                        console.log(res.data);
                        res.data.map((report) => {
                            dispatch(loadReportings(report.id, report.name, report.posts))
                        })
                        dispatch(SetActiveReport(undefined))
                    })
                    axios.get('https://radiant-escarpment-73210.herokuapp.com//api/user/' + userID)
                    .then(res => {
                        console.log('Got user info');
                        console.log(res.data[0].addedPages);
                        res.data[0].addedPages.map((page) => {
                            FB.api('/' + page.pageID, function (response) {
                                if (response == "undefined" || response == null || !response || response.error) {
                                    console.log('Error');
                                    dispatch(AddPage_InvalidURL())
                                } else {
                                    dispatch(AddPageAsync(response.id, response.name))
                                }
                            })
                        })
                        //dispatch(SetActiveReport(undefined))
                    })
                    .catch(err => {
                        console.log(err);
                    })

                })
            }, {scope: 'public_profile, email, manage_pages, '})
        }

    },

    Logout: function () {

        return function (dispatch) {
            FB.logout (function () {
                dispatch(LogoutAsync())
            })
        }

    },

    LoadStoredUserData: function (addedPages) {
        return {
            type: 'LOAD_STORED_USER_DATA',
            addedPages: addedPages        }
    },

    loadReportings: function (userID) {

        return function (dispatch) {
            axios.get('https://radiant-escarpment-73210.herokuapp.com//api/reportings/' + userID)
            .then(res => {
                console.log(res.data);
                res.data.map((report) => {
                    return dispatch(loadReportings(report.id, report.name, report.posts))
                })
                dispatch(SetActiveReport(undefined))
            })
            .catch(err => {
                console.log(err);
            })
        }
    },

    GetManagedPages: function () {
        return function (dispatch) {
            FB.api('/me/accounts', function (response) {
                if (response == "undefined" || response == null || !response || response.error) {
                    console.log('Error while getting Managed Pages');
                } else {
                    response.data.map(function (page) {
                        if (page.perms.indexOf("ADMINISTER") != -1) {
                            dispatch(AddManagedPage(page.id, page.access_token, page.name))
                        }
                    })
                }
            })
        }
    },

    AddPage: function (pageURL) {
        return function (dispatch) {
            FB.api('/' + pageURL, function (response) {
                if (response == "undefined" || response == null || !response || response.error) {
                    console.log('Error');
                    dispatch(AddPage_InvalidURL())
                } else {
                    dispatch(InvalidURLDismissAsync())
                    dispatch(AddPageSuccessAsync())
                    dispatch(AddPageAlertDismissAsync())
                    dispatch(InvalidURLDismissAsync())
                    dispatch(AddPageAsync(response.id, response.name))
                }
            })
        }
    },

    deletePage: function (userID, pageID) {

        return function (dispatch) {
            dispatch(deletePageAsync())
            dispatch(setActivePageAsync(undefined))
            axios.delete('https://radiant-escarpment-73210.herokuapp.com//api/user/' + userID + '/' + pageID)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }
    },

    LoadPageData: function (id) {
        return function (dispatch) {
            FB.api('/' + id + '?fields=fan_count,picture,posts&limit=100', function (response) {
                    dispatch(LoadPageDataAsync(response.fan_count, response.picture.data.url, response.id))
                })
        }
    },

    loadPostData: function (id, pageID) {
        return function (dispatch) {

            let likes, shares, comments

            FB.api('/' + id + '/likes?summary=true', response => {
                likes = response.summary.total_count

                FB.api('/' + id + '?fields=shares', response => {

                    if (response.shares === undefined) {
                        shares = 0
                    } else {
                        shares = response.shares.count
                    }

                    FB.api('/' + id + '/comments?summary=true', response => {

                        comments = response.summary.total_count

                        dispatch(loadPostDataAsync(id, pageID, likes, shares, comments))
                    })

                })
            })
        }
    },

    loadReportPostData: function (id, reportID) {
        return function (dispatch) {

            let likes, shares, comments, message, created_time

            FB.api('/' + id, response => {

                message = response.message
                created_time = response.created_time

                FB.api('/' + id + '/likes?summary=true', response => {
                    likes = response.summary.total_count

                    FB.api('/' + id + '?fields=shares', response => {

                        if (response.shares === undefined) {
                            shares = 0
                        } else {
                            shares = response.shares.count
                        }

                        FB.api('/' + id + '/comments?summary=true', response => {

                            comments = response.summary.total_count

                            dispatch(loadReportPostDataAsync(id, reportID, likes, shares, comments, message, created_time))
                        })

                    })
                })
            })
        }
    },


    loadPostImage: function (id, pageID) {
        return function (dispatch) {
            FB.api('/' + id + '/attachments', response => {

                if (response.data[0] === undefined) {
                    return
                } else if (response.data[0].media === undefined) {
                    return
                }

                if (response.data[0].media.image !== undefined) {
                    dispatch(loadPostImageAsync(id, pageID, response.data[0].media.image.src))
                }
            })
        }
    },

    loadReportPostImage: function (id, reportID) {
        return function (dispatch) {
            FB.api('/' + id + '/attachments', response => {

                if (response.data[0] === undefined) {
                    return
                } else if (response.data[0].media === undefined) {
                    return
                }

                if (response.data[0].media.image !== undefined) {
                    dispatch(loadReportPostImageAsync(id, reportID, response.data[0].media.image.src))
                }
            })
        }
    },

    LoadPagePosts: function (id) {
        return function (dispatch) {

            function getPosts() {

                return new Promise ((resolve, reject) => {

                    let postsArr = []
                    function recursiveAPICall(apiURL) {
                        FB.api(apiURL, response => {
                            //console.log(response);

                            if (response && response.data) {
                                postsArr = postsArr.concat(response.data)
                                //console.log('recursive!');
                                if (response.paging && response.paging.next) {
                                    recursiveAPICall(response.paging.next)
                                } else {
                                    resolve(postsArr)
                                }
                            } else {
                                reject()
                            }

                        })
                    }
                    recursiveAPICall('/' + id + '/posts?limit=100')
                })
            }

            getPosts().then(response => {
                //console.log(response)
                dispatch(LoadPagePostsAsync(response, id))
                dispatch(PageLoadedTrue())
            }).catch(e => {
                console.log(e)
            })


        }
    },

    SetPageWillBeAdded: function (id) {
        return {
            type: 'SET_PAGE_WILL_BE_ADDED',
            id: id
        }
    },

    AddSelectedPages: function () {
        return {
            type: 'ADD_SELECTED_PAGES'
        }
    },

    SetActivePage: function (id) {
        return function (dispatch) {
            dispatch(setActivePageAsync(id))
        }
    },

    /* --- UI STATE --- */

    AddPageAlertDismiss: function () {
        return function (dispatch) {
            dispatch(AddPageAlertDismissAsync())
        }
    },

    InvalidURLDismiss: function () {
        return function (dispatch) {
            dispatch(InvalidURLDismissAsync())
        }
    },

    AddPageSuccessDismiss: function () {
        return function (dispatch) {
            dispatch(AddPageSuccessDismissAsync())
        }
    },

    showPrintedReport: function () {
        return {
            type: 'SHOW_PRINTED_REPORT'
        }
    },

    hidePrintedReport: function () {
        return {
            type: 'HIDE_PRINTED_REPORT'
        }
    },

    hideReportMenu: function () {
        return {
            type: 'HIDE_REPORT_MENU'
        }
    },

    showReportMenu: function () {
        return {
            type: 'SHOW_REPORT_MENU'
        }
    }




}


export default actions
