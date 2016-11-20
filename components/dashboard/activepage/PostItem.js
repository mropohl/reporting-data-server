import React, { Component } from 'react'
import actions from '../../../redux/actions/actions'

class PostItem extends Component {

    constructor (props) {
        super (props)
        this.state = {
            likes: 0,
            imgURL: '',
            isChecked: false
        }
    }

    componentWillReceiveProps(nextProps) {
        let postInReport = false
        nextProps.reportings.map((report) => {
            return report.bActiveReport === true ? report.posts.map((post) => {
                post.id === this.props.data.id ? postInReport = true : post
            }) : report
        }, this)

        if (postInReport === true) {
            this.setState({
                isChecked: true
            })
            //this.props.dispatch(actions.CheckPost(this.props.data.id))
        } else {
            this.setState({
                isChecked: false
            })
            //this.props.dispatch(actions.UncheckPost(this.props.data.id))
        }
    }

    componentDidMount() {

        setTimeout(this.updateItem(), 2000)

    }

    updateItem() {
        //let postInReport = false

        //this.props.reportings.map((report) => {
        //    return report.bActiveReport === true ? report.posts.map((post) => {
        //        post.id === this.props.data.id ? postInReport = true : post
        //    }) : report
        //}, this)

        if (this.props.data.bInReport === true) {
            this.setState({
                isChecked: true
            })
            //this.props.dispatch(actions.CheckPost(this.props.data.id, this.props.pageID))
        } else {
            //this.props.dispatch(actions.UncheckPost(this.props.data.id, this.props.pageID))
            this.setState({
                isChecked: false
            })
        }

        if (this.props.data.likes === undefined || this.props.data.shares === undefined || this.props.data.comments === undefined) {
            this.props.dispatch(actions.loadPostData(this.props.data.id, this.props.pageID))
        }

        if (this.props.data.imgLink === undefined) {
            this.props.dispatch(actions.loadPostImage(this.props.data.id, this.props.pageID))
        }

    }

    sendPostsToReport() {

        let reportID

        this.props.reportings.map(function (report) {
            if (report.bActiveReport === true) {
                return reportID = report.id
            }
        })

        if (this.state.isChecked === true) {
            this.setState({
                isChecked: false
            })
            this.props.dispatch(actions.RemovePostFromReport(this.props.data.id, reportID))
            this.props.dispatch(actions.UncheckPost(this.props.data.id, this.props.pageID))

        } else {
            this.setState({
                isChecked: true
            })
            this.props.dispatch(actions.addPostToReport(
                this.props.data.id, this.props.data.message,
                this.props.data.created_time, this.props.data.imgLink, this.props.data.likes,
                this.props.pageID, this.props.data.shares, this.props.data.comments, reportID, this.props.userID
            ))
            this.props.dispatch(actions.CheckPost(this.props.data.id, this.props.pageID))
        }
    }

    handleChange() {

        this.props.reportings.map(function (report) {
            if (report.bActiveReport === true) {
                this.sendPostsToReport()
                return
            } else {
                console.log("There is no Report!");
                return
            }
        }, this)

    }

    render () {

        return (

            <div className="post-item-wrapper">
                <div className="post-item-toggle-wrapper">
                    {this.state.isChecked ? <label for="markPost">Post added to active report.</label> : <label for="markPost">Add Post to active Report.</label>}
                    <input
                        type="checkbox"
                        id="markPost"
                        checked={this.state.isChecked}
                        onChange={this.handleChange.bind(this)}
                    />
                </div>
                <div className="post-item-content-wrapper">

                    {this.props.data.imgLink !== undefined && <img src={this.props.data.imgLink}></img>}

                    <div>
                        <p className="post-item-date">{this.props.data.created_time.slice(0,10)}</p>
                        <p dangerouslySetInnerHTML={{__html: this.props.data.message}}></p>
                        {this.props.data.likes !== undefined ? <div className="post-item-likes-wrapper">Likes:<p className="post-item-likes">{this.props.data.likes}</p></div> :  <p className="post-item-likes">0 Likes</p>}
                        {this.props.data.comments !== undefined ? <div className="post-item-likes-wrapper">Comments:<p className="post-item-likes">{this.props.data.comments}</p></div> :  <p className="post-item-likes">0 Likes</p>}
                        {this.props.data.shares !== undefined ? <div className="post-item-likes-wrapper">Shares:<p className="post-item-likes">{this.props.data.shares}</p></div> :  <p className="post-item-likes">0 Likes</p>}

                    </div>

                </div>
            </div>
        )
    }
}

export default PostItem
