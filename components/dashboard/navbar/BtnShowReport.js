import React, { Component } from 'react'
import actions from '../../../redux/actions/actions'
import styles from '../../sass/btn/btn.sass'

class BtnShowReport extends Component {

    handleClickCreate () {
        this.props.dispatch(actions.showActiveReport())
    }

    handleClickClose () {
        this.props.dispatch(actions.closeActiveReport())
    }

    render () {
        return (
            <div>

                {this.props.state.fShowActiveReport !== true ?
                    <button className="btn btn-navbar btn-report btn-show-report" onClick={this.handleClickCreate.bind(this)}>Show Report</button> :
                    <button className="btn btn-navbar btn-report btn-show-report" onClick={this.handleClickClose.bind(this)}>Close Report</button>
                }

            </div>
        )
    }
}

export default BtnShowReport
