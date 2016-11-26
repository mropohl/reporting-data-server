import React, { Component } from 'react'
import actions from '../../redux/actions/actions'

class PostItem extends Component {

    constructor (props) {
        super (props)
        this.state = {

        }
    }

    render () {

        return (

            <div className="printed-post-item-wrapper">

                <div className="printed-post-item-content-wrapper">

                    {this.props.data.imgLink !== undefined && <img src={this.props.data.imgLink}></img>}

                    <div>
                        <p className="printed-post-item-date">{this.props.data.created_time.slice(0, 10)}</p>
                        <p dangerouslySetInnerHTML={{__html: this.props.data.message}}></p>

                    </div>
                    <div className="post-item-data-section">
                        {this.props.data.likes !== undefined ? <div className="post-item-likes-wrapper">Likes:<p className="post-item-likes">{this.props.data.likes}</p></div> :  <p className="post-item-likes">0 Likes</p>}
                        {this.props.data.comments !== undefined ? <div className="post-item-likes-wrapper">Comments:<p className="post-item-likes">{this.props.data.comments}</p></div> :  <p className="post-item-likes">0 Likes</p>}
                        {this.props.data.shares !== undefined ? <div className="post-item-likes-wrapper">Shares:<p className="post-item-likes">{this.props.data.shares}</p></div> :  <p className="post-item-likes">0 Likes</p>}
                    </div>
                    <p className="post-item-author">Report: {this.props.name}, by: {this.props.user}</p>

                </div>
            </div>
        )
    }
}

export default PostItem
