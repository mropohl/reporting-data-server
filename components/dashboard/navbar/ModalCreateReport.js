import React, { Component } from 'react'
import actions from '../../../redux/actions/actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import stylesModal from '../../sass/modals/alert.sass'
import stylesBtn from '../../sass/btn/btn.sass'

class ModalCreateReport extends Component {

    constructor (props) {
        super (props)
        this.state = {
            reportName: ""
        }
    }

    handleFinish() {
        this.props.dispatch(actions.CreateReport(this.state.reportName, this.props.state.user.id))
    }

    handleCancel() {
        this.props.dispatch(actions.CloseCreateReportModal())
    }

    handleChange(event) {
        this.setState({
            reportName: event.target.value
        })
    }

    render () {
        return (
            <div className="alert-wrapper-outside">

                <div className="alert-outside-click" onClick={this.handleCancel.bind(this)}></div>

                <div className="alert-wrapper">

                    <div className="alert">

                        {this.props.state.fReportAlreadyAdded ?
                            <div className="alert-text-wrapper">
                                <p>This Name is already in use.</p><p>Please choose another name for your report</p>
                            </div>
                        :
                            <div className="alert-text-wrapper">
                                <p>Please enter a name for your new report.</p>
                            </div>
                        }

                        <div className="alert-input-wrapper">

                            <input
                                type="text"
                                onChange={this.handleChange.bind(this)}
                                placeholder="Enter Report Name" value={this.state.reportName}
                                autoFocus
                            />
                            <button className="btn-add btn" onClick={this.handleCancel.bind(this)}>Cancel</button>
                            {   this.state.reportName.length !== 0 ?
                                <button className="btn-add btn" onClick={this.handleFinish.bind(this)}>Create Report</button>
                                :
                                <button className="btn-add btn-disabled btn">Create Report</button>

                            }

                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default ModalCreateReport
