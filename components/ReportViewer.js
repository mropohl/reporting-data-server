import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../redux/actions/actions'
import styles from './sass/app.sass'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import axios from 'axios';
import PrintedReport from './printedreport/PrintedReport'

class ReportViewer extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            name: "",
            posts: []
        }
    }

    componentDidMount() {

        let reportID = this.props.location.pathname.substring(15)

        axios.get('https://radiant-escarpment-73210.herokuapp.com/api/shared/reportings/' + reportID)
        .then(res => {
            console.log('Got shared report info');
            console.log(res);
            let name = res.data[0].name
            this.setState({
                name: name,
                posts: res.data[0].posts
            })

        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <PrintedReport shared={true} posts={this.state.posts} name={this.state.name}/>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps) (ReportViewer)
