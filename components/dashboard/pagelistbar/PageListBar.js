import React, { Component } from 'react'
import PageListItem from './PageListItem'
import ModalSearchInput from './ModalSearchInput'
import ModalManagedPages from './ModalManagedPages'
import SearchWarning from './SearchWarning'
import BtnAddPage from './BtnAddPage'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import stylesModal from '../../sass/modals/alert.sass'
import stylesPageList from '../../sass/pagelist/pagelist.sass'
import actions from '../../../redux/actions/actions'

class PageListBar extends Component {

    constructor (props, context) {
        super (props, context)
        this.state = {
            bShowInput: false        }
    }

    handleClick () {
        this.setState({
            bShowInput: true
        })
    }

    handleCloseModalManagedPages () {
        this.setState({
            bShowModalManagedPages: false
        })
    }

    handleAdd () {
        this.setState({
            bShowModalManagedPages: false
        })
        this.props.dispatch(actions.AddSelectedPages())

    }

    handleClose () {
        this.setState({
            bShowInput: false
        })

        this.props.dispatch(actions.AddPageAlertDismiss())
        this.props.dispatch(actions.InvalidURLDismiss())
        this.props.dispatch(actions.AddPageSuccessDismiss())


    }

    render () {
        return (
            <div className="pagelist-wrapper">
                <ul>
                    {this.props.state.addedPages.map(function (page, index) {

                        if (page.bWillBeAdded != false) {
                            return <PageListItem key={page.id} id={page.id} name={page.name} bIsAdministeredPage={page.bIsAdministeredPage} dispatch={this.props.dispatch} bActivePage={page.bActivePage}/>
                        }
                        else if (page.bWillBeAdded != true) {
                            return
                        }
                        else {
                            return <PageListItem key={page.id} id={page.id} name={page.name} bIsAdministeredPage={page.bIsAdministeredPage} dispatch={this.props.dispatch} bActivePage={page.bActivePage}/>
                        }

                    }, this)}
                </ul>

                <button className="btn-addModal btn" onClick={this.handleClick.bind(this)}>+</button>

                <ReactCSSTransitionGroup
                    transitionName="modal"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                {this.state.bShowInput && <ModalSearchInput key={1} close={this.handleClose.bind(this)} state={this.props.state} dispatch={this.props.dispatch}/>}
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup
                    transitionName="modal"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                { this.props.state.user.loggedIn && this.props.state.bShowModalManagedPages ?
                    <ModalManagedPages key={1} handleAdd={this.handleAdd.bind(this)} close={this.handleCloseModalManagedPages.bind(this)} state={this.props.state} dispatch={this.props.dispatch}/>
                    : <div></div>
                }
                </ReactCSSTransitionGroup>

            </div>
        )
    }
}

export default PageListBar
