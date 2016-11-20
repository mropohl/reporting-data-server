import React, { Component } from 'react'
import actions from '../../../redux/actions/actions'
import styles from '../../sass/btn/btn.sass'

class BtnCreateReport extends Component {

    handleClick () {
        this.props.dispatch(actions.StartCreateReportDialog())
    }

    render () {
        return (
            <div>

                <button className="btn btn-navbar btn-report" onClick={this.handleClick.bind(this)}>New Report</button>

            </div>
        )
    }
}

export default BtnCreateReport
