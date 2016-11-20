import React, { Component } from 'react'
import actions from '../../../redux/actions/actions'
import PostItem from './PostItem'
import styles from '../../sass/activePage/activepage.sass'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ModalDeleteReport from './ModalDeleteReport'

class ActiveReport extends Component {

    constructor (props) {
        super (props)
        this.state = {
            showModalDelete: false
        }
    }

    handleClickPrint() {
        this.props.dispatch(actions.showPrintedReport())
    }

    handleClickDelete() {
        this.setState({
            showModalDelete: true
        })
    }

    handleClickClose() {
        this.setState({
            showModalDelete: false
        })
    }

    render() {

        return (
            <div className="page-wrapper">

                <h2>{this.props.reportData.name}</h2>
                <div className="page-info-wrapper">

                    <button onClick={this.handleClickDelete.bind(this)}>Delete Report</button>

                    <button onClick={this.handleClickPrint.bind(this)}>Print Report</button>

                </div>

                <div className="page-posts-wrapper">

                    {this.props.reportData.posts !== undefined ?

                        this.state.bShowSearchResults ?

                            this.state.finalSearchResult.map(function (post) {
                                if (post !== null && post !== undefined) {
                                    return <PostItem data={post} reportID={this.props.reportData.id} key={post.id} dispatch={this.props.dispatch}/>
                                }
                            }, this)

                            :

                            this.props.reportData.posts.map(function (post) {
                                return <PostItem data={post} reportID={this.props.reportData.id} key={post.id} dispatch={this.props.dispatch}/>
                            }, this)

                    : <div>Loading Posts</div> }

                    <ReactCSSTransitionGroup
                        transitionName="modal"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                    >
                        {this.state.showModalDelete &&
                            <ModalDeleteReport
                                key={1}
                                close={this.handleClickClose.bind(this)}
                                state={this.props.state}
                                dispatch={this.props.dispatch}
                                reportID={this.props.reportData.id}
                            />
                        }
                    </ReactCSSTransitionGroup>

                </div>

            </div>
        )
    }

}

export default ActiveReport
