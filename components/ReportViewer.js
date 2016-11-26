import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../redux/actions/actions'
import styles from './sass/app.sass'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import axios from 'axios';
import PrintedReport from './printedreport/PrintedReport'

class ReportViewer extends Component {

    componentDidMount() {

        let reportID = this.props.location.pathname.substring(16)

        axios.get('https://radiant-escarpment-73210.herokuapp.com/reportings/' + reportID)
        .then(res => {
            console.log('Got shared report info');
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>

            </div>
        )
    }

}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps) (ReportViewer)
