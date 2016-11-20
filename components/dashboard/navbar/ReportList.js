import React, { Component } from 'react'
import ReportListMenu from './ReportListMenu'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import actions from '../../../redux/actions/actions'

class ReportList extends Component {

    handleClick() {
        if (!this.props.state.fShowReportMenu) {
            this.props.dispatch(actions.showReportMenu())
        } else {
            this.props.dispatch(actions.hideReportMenu())
        }
    }

    render () {
        return (
            <div className="report-list-wrapper">

                <p>Active Report: </p>

                {this.props.state.reportings.map(function (report) {
                    return report.bActiveReport && <button key={report.id} onClick={this.handleClick.bind(this)} className="report-list-button">
                    {report.name}
                    <span className={this.props.state.fShowReportMenu ? "icon-up" : "icon-down"}></span></button>
                }, this)}

                <ReactCSSTransitionGroup
                    transitionName="modal"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    { this.props.state.fShowReportMenu && <ReportListMenu state={this.props.state} dispatch={this.props.dispatch}/>}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default ReportList
