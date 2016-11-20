import React, { Component } from 'react'
import actions from '../../../redux/actions/actions'

class ReportListMenu extends Component {

    handleClick (reportName) {
        this.props.dispatch(actions.SetActiveReport(reportName))
    }

    render () {
        return (
            <ul className="report-list-menu">
                {this.props.state.reportings.map(function (report) {

                    return report.bActiveReport ? <li className="hidden"></li> : <li onClick={this.handleClick.bind(this, report.name)}>{report.name}</li>

                }, this)}
            </ul>
        )
    }
}

export default ReportListMenu
