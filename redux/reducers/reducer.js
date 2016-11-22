
let reducer = function (state, action) {
    switch (action.type) {

        case 'USER_LOGIN':
            return Object.assign({}, state, {
                user: {
                    id: action.id,
                    accessToken: action.accessToken,
                    loggedIn: true
                }
            });

        case 'USER_LOGOUT':
            return Object.assign({}, state, {
                user: {
                    id: '',
                    accessToken: '',
                    loggedIn: false,
                    name: ''
                },
                addedPages: [],
                reportings: [],
                flagPageAlreadyAdded: false,
                fPageURLNotValid: false,
                fPageSuccess: false,
                fShowLoadingScreen: false,
                bShowModalManagedPages: false,
                bCreateNewReport: false,
                bUncheckPosts: false,
                fShowActiveReport: false,
                fShowPrintedReport: false,
                fShowReportMenu: false
            });

        case 'SET_USER_NAME':
            return Object.assign({}, state, {

                user: { ...state.user,
                    name: action.name
                },
                fShowLoadingScreen: false


            })

        case 'LOAD_REPORT':

            return Object.assign({}, state, {
                reportings: [...state.reportings,
                    {
                        name: action.name,
                        id: action.id,
                        posts: action.posts,
                        bActiveReport: false
                    }
                ]
            })

        case 'LOAD_STORED_USER_DATA':
            return Object.assign({}, state, {
                addedPages: action.addedPages,
                bShowModalManagedPages: false
            })

        case 'ADD_PAGE_ALERT_DISMISS':
            return Object.assign({}, state, {
                flagPageAlreadyAdded: false
            })

        case 'PAGE_LOADED_TRUE':
            return Object.assign({}, state, {
                fPageLoaded: true
            })

        case 'ADD_PAGE_SUCCESS':
            return Object.assign({}, state, {
                fPageSuccess: true
            })

        case 'ADD_PAGE_SUCCESS_DISMISS':
            return Object.assign({}, state, {
                fPageSuccess: false
            })

        case 'ADD_PAGE_INVALID_URL':
            return Object.assign({}, state, {
                fPageURLNotValid: true,
                fPageSuccess: false,
                flagPageAlreadyAdded: false

            })

        case 'ADD_PAGE_INVALID_URL_DISMISS':
            return Object.assign({}, state, {
                fPageURLNotValid: false
            })

        case 'ADD_MANAGED_PAGE':

            return Object.assign({}, state, {
                addedPages: [...state.addedPages,
                {
                    id: action.id,
                    accessToken: action.accessToken,
                    name: action.name,
                    bWillBeAdded: false,
                    bIsAdministeredPage: true,
                    bActivePage: false
                }]
            })

        case 'SET_PAGE_WILL_BE_ADDED':

            return Object.assign({}, state, {
                addedPages: state.addedPages.map((page) => {
                    return page.id === action.id ? Object.assign({}, page, {bWillBeAdded: !page.bWillBeAdded}) :
                    page
                })
            })

        case 'ADD_SELECTED_PAGES':

            return Object.assign({}, state, {
                addedPages: state.addedPages.filter((page) => {
                    if (page.bIsAdministeredPage && page.bWillBeAdded !== true) {
                        return false
                    } else {
                        return true
                    }
                })
            })

        case 'ADD_PAGE':

            if (state.addedPages.map((page) => {
                    return page.id
                }).indexOf(action.id) === -1) {

                return Object.assign({}, state, {
                    addedPages: [...state.addedPages, {
                        id: action.id,
                        name: action.name,
                        bIsAdministeredPage: false,
                        bActivePage: false,
                        posts: []
                    }]
                })

            } else {
                return Object.assign({}, state, {
                    flagPageAlreadyAdded: true,
                    fPageSuccess: false
                })
            }

        case 'DELETE_PAGE':

            return Object.assign({}, state, {
                addedPages: state.addedPages.filter((page) => {
                    if (page.bActivePage) {
                        return false
                    } else {
                        return true
                    }
                })
            })

        case 'HIDE_LOADING_SCREEN':
            return Object.assign({}, state, {
                fShowLoadingScreen: false
            })

        case 'SET_ACTIVE_PAGE':

            if (action.id === undefined) {

                let flagSet = false
                return Object.assign({}, state, {
                    addedPages: state.addedPages.map((page) => {
                        if (flagSet !== true) {
                            flagSet = true
                            return Object.assign({}, page, {
                                bActivePage: true
                            })
                        } else {
                            return page
                        }
                    })
                })

            } else {
                return Object.assign({}, state, {
                    addedPages: state.addedPages.map((page) => {
                        return page.id === action.id ? Object.assign({}, page, {
                            bActivePage: true
                        }) : Object.assign({}, page, {
                            bActivePage: false
                        })
                    })
                })
            }

        case 'LOAD_PAGE_DATA':
            return Object.assign({}, state, {
                addedPages: state.addedPages.map((page) => {
                    return page.id === action.id ? Object.assign({}, page, {
                        likes: action.likes,
                        pictureUrl: action.pictureUrl
                    }) : page
                })
            })

        case 'LOAD_PAGE_POSTS':
            return Object.assign({}, state, {
                addedPages: state.addedPages.map((page) => {
                    return page.id === action.id ? Object.assign({}, page, {
                        posts: action.posts
                    }) : page
                })
            })

        case 'DELETE_REPORT':

            return Object.assign({}, state, {
                reportings: state.reportings.filter((report) => {
                    if (report.bActiveReport) {
                        return false
                    } else {
                        return true
                    }
                }),
                fShowActiveReport: false
            })

        case 'CREATE_REPORT':

            if (state.reportings.map((report) => {
                return report.name
            }).indexOf(action.name) === -1) {
                return Object.assign({}, state, {
                    reportings: [...state.reportings, {
                        name: action.name,
                        posts: [],
                        id: action.id,
                        bActiveReport: false
                    }],
                    bCreateNewReport: false,
                    fReportAlreadyAdded: false
                })
            } else {
                return Object.assign({}, state, {
                    fReportAlreadyAdded: true
                })
            }

        case 'SET_ACTIVE_REPORT':
            if (action.name === undefined) {
                let flagSet = false
                return Object.assign({}, state, {
                    reportings: state.reportings.map((report) => {
                        if (flagSet !== true) {
                            flagSet = true
                            return Object.assign({}, report, {
                                bActiveReport: true
                            })
                        } else {
                            return report
                        }
                    })
                })
            } else {
                return Object.assign({}, state, {
                    reportings: state.reportings.map((report) => {
                        return report.name === action.name ? Object.assign({}, report, {
                            bActiveReport: true
                        }) : Object.assign({}, report, {
                            bActiveReport: false
                        })
                    })
                })
            }

        case 'ADD_POST_TO_REPORT':

            return Object.assign({}, state, {
                reportings: state.reportings.map((report) => {
                    return report.bActiveReport ? Object.assign({}, report, {
                        posts: [...report.posts, {
                            id: action.id,
                            message: action.message,
                            created_time: action.created_time,
                            imgLink: action.imgLink,
                            likes: action.likes,
                            pageID: action.pageID,
                            shares: action.shares,
                            comments: action.comments
                        }]
                    }) : report
                })
            })

        case 'REMOVE_POST_FROM_REPORT':

            return Object.assign({}, state, {
                reportings: state.reportings.map((report) => {
                    return report.bActiveReport ? Object.assign({}, report, {
                        posts: report.posts.filter((post) => {
                            if (post.id === action.id) {
                                return false
                            } else {
                                return true
                            }

                        })
                    }) : report
                })
            })

        case 'START_DIALOG_CREATE_REPORT':
            return Object.assign({}, state, {
                bCreateNewReport: true,
                fReportAlreadyAdded: false
            })

        case 'CLOSE_DIALOG_CREATE_REPORT':
            return Object.assign({}, state, {
                bCreateNewReport: false,
                fReportAlreadyAdded: false
            })

        case 'CHECK_POST':
            return Object.assign({}, state, {
                addedPages: state.addedPages.map((page) => {
                    return page.bActivePage ? Object.assign({}, page, {
                        posts: page.posts.map((post) => {
                            if (post.id === action.id) {
                                return Object.assign({}, post, {
                                    bInReport: true,
                                    pageID: action.pageID
                                })
                            } else {
                                return post
                            }
                        })
                    }) : page
                })
            })

        case 'UNCHECK_POST':
            return Object.assign({}, state, {
                addedPages: state.addedPages.map((page) => {
                    return page.bActivePage ? Object.assign({}, page, {
                        posts: page.posts.map((post) => {
                            if (post.id === action.id) {
                                return Object.assign({}, post, {
                                    bInReport: false,
                                    pageID: ''
                                })
                            } else {
                                return post
                            }
                        })
                    }) : page
                })
            })

        case 'UNCHECK_POSTS':
            return Object.assign({}, state, {
                bUncheckPosts: true
            })
        case 'UNCHECK_POSTS_RESET':
            return Object.assign({}, state, {
                bUncheckPosts: false
            })

        case 'LOAD_POST_DATA':
            return Object.assign({}, state, {
                addedPages: state.addedPages.map((page) => {
                    return page.id === action.pageID ? Object.assign({}, page, {
                        posts: page.posts.map((post) => {
                            if (post.id === action.id) {
                                return Object.assign({}, post, {
                                    likes: action.likes,
                                    shares: action.shares,
                                    comments: action.comments
                                })
                            } else {
                                return post
                            }
                        })
                    }) : page
                })
            })

        case 'LOAD_REPORT_POST_DATA':
            return Object.assign({}, state, {
                reportings: state.reportings.map((report) => {
                    return report.id === action.reportID ? Object.assign({}, report, {
                        posts: report.posts.map((post) => {
                            if (post.id === action.id) {
                                return Object.assign({}, post, {
                                    likes: action.likes,
                                    shares: action.shares,
                                    comments: action.comments,
                                    message: action.message,
                                    created_time: action.created_time
                                })
                            } else {
                                return post
                            }
                        })
                    }) : report
                })
            })

        case 'SET_POST_IMG':
            return Object.assign({}, state, {
                addedPages: state.addedPages.map((page) => {
                    return page.id === action.pageID ? Object.assign({}, page, {
                        posts: page.posts.map((post) => {
                            if (post.id === action.id) {
                                return Object.assign({}, post, {
                                    imgLink: action.imgLink
                                })
                            } else {
                                return post
                            }
                        })
                    }) : page
                })
            })

        case 'SET_REPORT_POST_IMG':
            return Object.assign({}, state, {
                reportings: state.reportings.map((report) => {
                    return report.id === action.reportID ? Object.assign({}, report, {
                        posts: report.posts.map((post) => {
                            if (post.id === action.id) {
                                return Object.assign({}, post, {
                                    imgLink: action.imgLink
                                })
                            } else {
                                return post
                            }
                        })
                    }) : report
                })
            })

        /* --- UI STATE --- */

        case 'SHOW_ACTIVE_REPORT':
            return Object.assign({}, state, {
                fShowActiveReport: true
            })

        case 'SHOW_PRINTED_REPORT':
            return Object.assign({}, state, {
                fShowPrintedReport: true
            })

        case 'HIDE_PRINTED_REPORT':
            return Object.assign({}, state, {
                fShowPrintedReport: false
            })

        case 'SHOW_REPORT_MENU':
            return Object.assign({}, state, {
                fShowReportMenu: true
            })

        case 'HIDE_REPORT_MENU':
            return Object.assign({}, state, {
                fShowReportMenu: false
            })

        case 'CLOSE_ACTIVE_REPORT':
            return Object.assign({}, state, {
                fShowActiveReport: false
            })

            break;


        default:
            return state;
    }
}

export default reducer
