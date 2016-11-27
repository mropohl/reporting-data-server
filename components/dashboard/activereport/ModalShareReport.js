import React, { Component } from 'react'
import actions from '../../../redux/actions/actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import stylesModal from '../../sass/modals/alert.sass'
import stylesBtn from '../../sass/btn/btn.sass'

class ModalShareReport extends Component {

    render () {
        return (
            <div className="alert-wrapper-outside">

                <div className="alert-outside-click" onClick={this.props.close}></div>

                <div className="alert-wrapper">

                    <div className="alert alert-noinput">

                        <p>This is the URL to your shared Report:</p>
                        <p>{this.props.url}</p>

                        <div className="alert-input-wrapper">

                            <button className="btn-add btn" onClick={this.props.close}>Close</button>
                            <button className="btn-add btn">Copy Link</button>

                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default ModalShareReport
