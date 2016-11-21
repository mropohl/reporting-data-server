import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../redux/actions/actions'
import LoadingScreen from './loadingscreen/LoadingScreen'
import LoginScreen from './loginscreen/LoginScreen'
import Dashboard from './dashboard/Dashboard'
import PrintedReport from './printedreport/PrintedReport'
import styles from './sass/app.sass'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import axios from 'axios';


class App extends Component {

    componentDidMount () {

        window.fbAsyncInit = function () {
            FB.init({
                appId      : '257356887982054',
                cookie     : true,
                xfbml      : true,
                version    : 'v2.7'
            });
            FB.getLoginStatus(function (response) {
                this.statusChangeCallback(response);
            }.bind(this));

        }.bind(this);

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return
            };
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

    }

    testAPI () {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function (response) {
            console.log('Successful login for: ' + response.name);
            //document.getElementById('status').innerHTML =
            //'Thanks for logging in, ' + response.name + '!';
        });
    }

    statusChangeCallback (response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            // Now check if user data is present in local Storage

            const loadState = () => {
                try {
                    const serializedState = localStorage.getItem('state')
                    if (serializedState === null) {
                        return undefined
                    }
                    return JSON.parse(serializedState)
                }
                catch (err) {
                    return undefined
                }

            }

            const loadedState = loadState()

            console.log(loadedState);
            this.props.dispatch(actions.loadReportings(response.authResponse.userID))
            axios.get('https://radiant-escarpment-73210.herokuapp.com//api/user/' + response.authResponse.userID)
            .then(res => {
                console.log('Got user info');
                console.log(res.data[0].addedPages);
                res.data[0].addedPages.map((page) => {
                    this.props.dispatch(actions.AddPage(page.pageID))
                })
                //dispatch(SetActiveReport(undefined))
            })
            .catch(err => {
                console.log(err);
            })
            if (loadedState === undefined || loadedState.user.id !== response.authResponse.userID) {
                this.props.dispatch(actions.RegisterUser(response.authResponse.userID, response.authResponse.accessToken))
                //this.props.dispatch(actions.loadReportings(response.authResponse.userID))
            } else if (loadedState.user.id === response.authResponse.userID) {
                this.props.dispatch(actions.RegisterUser(response.authResponse.userID, response.authResponse.accessToken))
                //this.props.dispatch(actions.LoadStoredUserData(loadedState.addedPages))
            }

        } else if (response.status === 'not_authorized') {
            // The app wasnt authorized
            this.props.dispatch(actions.HideLoadingScreen())

        } else {
            // User not logged in, or somethng went wrong
            this.props.dispatch(actions.HideLoadingScreen())
        }
    }

    handleClick() {
        if (this.props.fShowReportMenu) {
            this.props.dispatch(actions.hideReportMenu())
        }
    }

    render() {
        return (
            <div onClick={this.handleClick.bind(this)}>
                <ReactCSSTransitionGroup
                    transitionName="loadingscreen"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={10000}
                >
                    {this.props.fShowLoadingScreen && <LoadingScreen key={1}/>}
                </ReactCSSTransitionGroup>

                {!this.props.user.loggedIn && <LoginScreen dispatch={this.props.dispatch}/>}
                {this.props.user.loggedIn && !this.props.fShowPrintedReport ?
                    <Dashboard state={this.props} dispatch={this.props.dispatch}/>
                    : <div></div>
                }

                {this.props.fShowPrintedReport && <PrintedReport state={this.props} dispatch={this.props.dispatch}/>}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps) (App)
