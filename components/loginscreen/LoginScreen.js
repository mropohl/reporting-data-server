import React, { Component } from 'react'
import BtnLogin from './BtnLogin'
import styles from '../sass/loginscreen/loginscreen.sass'

class LoginScreen extends Component {

    render() {
        return (
            <div className="loginscreen-wrapper">
                <div className="loginscreen-wrapper-inner">
                    <div className="loginscreen-headline">
                        <h1>influencer.io</h1>
                        <p>the influencer-marketing reporting tool</p>
                    </div>
                    <div className="loginscreen-login">
                        <p>To get started, please log in with your Facebook account.</p>
                        <BtnLogin dispatch={this.props.dispatch}/>
                    </div>
                </div>
            </div>
        )
    }

}


export default LoginScreen
