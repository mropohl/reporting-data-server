import React, { Component } from 'react'
import actions from '../../../redux/actions/actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import stylesModal from '../../sass/modals/alert.sass'
import stylesBtn from '../../sass/btn/btn.sass'
import ManagedPagesItem from './ManagedPagesItem'


class ModalManagedPages extends Component {

    constructor (props) {
        super (props)
        this.state = {
            bShowNextPage: false,
            bNoManagedPagesMessage: false
        }
    }

    componentDidMount() {
        this.props.dispatch(actions.GetManagedPages())
    }

    handleContinue() {
        this.setState({
            bShowNextPage: true
        })
    }

    handleAdd() {
        this.props.dispatch(actions.addSelectedPages())
    }

    disableNoManagedPagesMessage() {
        this.setState({
            bNoManagedPagesMessage: true
        })
    }

    render () {
        return (
            <div className="alert-wrapper">

                <div className="alert">

                    {this.state.bShowNextPage ?
                        <div className="modal-text-wrapper">
                            <ul>
                                { this.state.bNoManagedPagesMessage && <li>We couldn't find any pages you are admin of. Please add pages manually.</li>}
                                {

                                    this.props.state.addedPages.map(function (page) {
                                        if (page.bIsAdministeredPage === true) {
                                            this.disableNoManagedPagesMessage.bind(this)
                                        }
                                        return page.bIsAdministeredPage && <ManagedPagesItem key={page.id} name={page.name} id={page.id} bWillBeAdded={page.bWillBeAdded} />
                                    }, this)


                                }
                            </ul>
                        </div> :
                        <div className="modal-text-wrapper">
                            <p>Welcome {this.props.state.user.name} !</p>
                            <p>
                                Please choose the pages you are admin of and would like to include in your report.
                                Your can add pages your are not admin of later, but with less options for analysis.
                            </p>
                        </div>

                    }

                    <button className="btn-cancel" onClick={this.props.close}>Cancel</button>
                    {this.state.bShowNextPage ? <button className="btn-cancel" onClick={this.props.handleAdd}>Add Selected Pages</button>
                    : <button className="btn-cancel" onClick={this.handleContinue.bind(this)}>Continue</button>}


                </div>

            </div>
        )
    }
}

export default ModalManagedPages
