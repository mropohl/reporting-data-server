import React, { Component } from 'react'
import actions from '../../../redux/actions/actions'
import styles from '../../sass/modals/alert.sass'

class SearchWarning extends Component {

    handleOnClick () {
        console.log('btn geht');
        this.props.dispatch(actions.AddPageAlertDismiss())
    }

    render () {
        return (
            <div className="alert-wrapper" onClick={this.handleOnClick.bind(this)}>
                <div className="alert">

                    <p>The Page has been added already!</p>
                    <button className="btn" onClick={this.handleOnClick.bind(this)}>Okay</button>

                </div>
            </div>
        )
    }
}

export default SearchWarning
