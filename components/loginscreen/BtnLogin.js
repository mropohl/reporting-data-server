import React, { Component } from 'react'
import actions from '../../redux/actions/actions'
import styles from '../sass/btn/btn.sass'
class BtnLogin extends Component {

    handleLogin () {
        console.log('log 1');
        this.props.dispatch(actions.Login())
    }

    render () {
        return (
            <div>

                <button className="btn" onClick={this.handleLogin.bind(this)}>Login</button>

            </div>
        )
    }
}

export default BtnLogin
