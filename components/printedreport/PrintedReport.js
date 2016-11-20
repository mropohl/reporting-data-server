import React, { Component } from 'react'
import actions from '../../redux/actions/actions'
import PostItem from './PostItem'
import styles from '../sass/printedreport/printedReport.sass'

class PrintedReport extends Component {

    constructor (props) {
        super (props)
        this.state = {

        }
    }

    handleClick() {
        this.props.dispatch(actions.hidePrintedReport())
    }

    render() {

        return (
            <div className="page-wrapper printed-page-wrapper">

                <button className="btn" onClick={this.handleClick.bind(this)}>Close</button>

                <header className="printed-report-header">
                    <h1>
                    {
                        this.props.state.reportings.map(function (report) {
                            if (report.bActiveReport === true) {
                                return report.name
                            }
                        })
                    }
                    </h1>
                </header>

                <div className="page-posts-wrapper">

                    {
                        this.props.state.reportings.map(function (report) {
                            if (report.bActiveReport === true) {
                                let name = report.name
                                return report.posts.map(function (post) {
                                    console.log("mapping report posts");
                                    return <PostItem data={post} name={name} user={this.props.state.user.name} key={post.id} dispatch={this.props.dispatch}/>
                                }, this)
                            }
                        }, this)

                    }

                </div>

            </div>
        )
    }

}

export default PrintedReport
