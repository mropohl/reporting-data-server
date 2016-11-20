import React, { Component } from 'react'
import actions from '../../../redux/actions/actions'

class PostItem extends Component {

    constructor (props) {
        super (props)
        this.state = {

        }
    }

    componentDidMount() {

        setTimeout(this.updateItem(), 2000)

        //console.log('/' + this.props.data.id + '/insights');
        //let id = this.props.data.id
        //let pageAccessToken
        //FB.api('/117286205003669_1223262784406000/shares', function (response) {
            //console.log(response);
            //pageAccessToken = response.data[1].access_token
            //console.log(pageAccessToken);

            //FB.api('/' + id + '/insights?access_token=' + pageAccessToken, function (response) {
            //    console.log(response);
            //})
        //})

    }

    updateItem() {

        if (
            this.props.data.likes === undefined || this.props.data.shares === undefined || this.props.data.comments === undefined ||
            this.props.data.message === undefined || this.props.data.created_at === undefined
        ) {
            this.props.dispatch(actions.loadReportPostData(this.props.data.id, this.props.reportID))
        }

        if (this.props.data.imgLink === undefined) {
            this.props.dispatch(actions.loadReportPostImage(this.props.data.id, this.props.reportID))
        }
    }

    handleClickDelete() {
        this.props.dispatch(actions.RemovePostFromReport(this.props.data.id, this.props.reportID))
    }

    render () {

        return (

            <div className="post-item-wrapper">

                <div className="post-item-toggle-wrapper">

                    <label htmlFor="deletePost">Remove post from active report.</label>
                    <button id="deletePost" onClick={this.handleClickDelete.bind(this)}>X</button>

                </div>

                <div className="post-item-content-wrapper">

                    {this.props.data.imgLink !== undefined && <img src={this.props.data.imgLink}></img>}

                    <div>
                        {this.props.data.created_time !== undefined && <p className="post-item-date">{this.props.data.created_time.slice(0, 10)}</p>}
                        {this.props.data.message !== undefined && <p dangerouslySetInnerHTML={{__html: this.props.data.message}}></p>}
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
