import React, { Component } from 'react'
import actions from '../../../redux/actions/actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import stylesModal from '../../sass/modals/alert.sass'
import stylesBtn from '../../sass/btn/btn.sass'

class ModalDeletePage extends Component {

    handleFinish() {
        this.props.dispatch(actions.deletePage(this.props.userID, this.props.pageID))
    }

    render () {
        return (
            <div className="alert-wrapper-outside">

                <div className="alert-outside-click" onClick={this.props.close}></div>

                <div className="alert-wrapper">

                    <div className="alert alert-noinput">


                        <p>Do you really want to delete this page?</p>
                        <p>Deleting it cant be undone.</p>

                        <div className="alert-input-wrapper">

                            <button className="btn-add btn" onClick={this.props.close}>Cancel</button>
                            <button className="btn-delete btn" onClick={this.handleFinish.bind(this)}>Delete Page</button>

                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default ModalDeletePage
