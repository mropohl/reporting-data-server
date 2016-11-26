import React from 'react'
import { render } from 'react-dom'
import App from '../components/App'
import ReportViewer from '../components/ReportViewer'
import configureStore from '../redux/store/storeconfig'
import { Provider } from 'react-redux'
import { Router, Route, Link, browserHistory } from 'react-router'

//import styles from '../components/app.sass'

// configure and create Store

let initialState = {
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
    fShowLoadingScreen: true,
    bShowModalManagedPages: false,
    bCreateNewReport: false,
    bUncheckPosts: false,
    fShowActiveReport: false,
    fShowPrintedReport: false,
    fShowReportMenu: false

}

let store = configureStore(initialState)

render (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}/>
            <Route path="/shared/report/:reportid" component={ReportViewer} />
        </Router>
    </Provider>,
    document.getElementById('app')
)
