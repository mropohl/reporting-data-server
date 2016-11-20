import React, { Component } from 'react'
import actions from '../../../redux/actions/actions'
import styles from '../../sass/btn/btn.sass'
class BtnLogout extends Component {

    handleLogout () {
        this.props.dispatch(actions.Logout())
    }

    render () {
        return (
            <div>

                <button className="btn btn-navbar" onClick={this.handleLogout.bind(this)}>Logout</button>

            </div>
        )
    }
}

export default BtnLogout
