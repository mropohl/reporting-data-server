import React, { Component } from 'react'
import actions from '../../../redux/actions/actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import stylesModal from '../../sass/modals/alert.sass'
import stylesBtn from '../../sass/btn/btn.sass'
import axios from 'axios'

class ModalSearchInput extends Component {

    constructor (props, context) {
        super(props, context)
        this.state = {
            pageURL: ""
        }
    }

    handleSubmit () {
        console.log('Btn Add Page triggered.');
        this.props.dispatch(actions.AddPage(this.state.pageURL))
        let userID = this.props.state.user.id
        FB.api('/' + this.state.pageURL, function (response) {
            if (response == "undefined" || response == null || !response || response.error) {

            } else {
                let body = {
                    "pageID" : response.id
                }
                axios.post('https://radiant-escarpment-73210.herokuapp.com/api/user/' + userID + '/pages', body)
                .then(res => {
                    console.log("New Page send");
                    console.log(body)
                })
                .catch(err => {
                    console.error(err);
                });
            }
        })
    }
    handleChange (event) {
        this.setState({
            pageURL: event.target.value
        })
    }

    render () {
        return (

            <div className="alert-wrapper-outside">

                <div className="alert-outside-click" onClick={this.props.close}></div>

                <div className="alert-wrapper">

                    <div className="alert">

                        { !this.props.state.flagPageAlreadyAdded && !this.props.state.fPageSuccess && !this.props.state.fPageURLNotValid &&
                            <div className="alert-text-wrapper"><p>Please enter the URL of a Facebook Page you would like to add.</p></div>
                        }
                        { this.props.state.flagPageAlreadyAdded && <div className="alert-text-wrapper"><p>This Page has already been added!</p></div>}
                        { this.props.state.fPageSuccess && <div className="alert-text-wrapper"><p>The page has been added!</p></div>}
                        { this.props.state.fPageURLNotValid && <div className="alert-text-wrapper"><div><p>This Page URL does not appear to be valid.</p><p>Please try again.</p></div></div>}

                        <div className="alert-input-wrapper">
                            <input
                                type="text"
                                onChange={this.handleChange.bind(this)}
                                placeholder="Enter Facebook Page URL"
                                value={this.state.pageURL}
                                autoFocus
                            />
                            <button className="btn-add btn" onClick={this.props.close}>Cancel</button>
                            {   this.state.pageURL.length !== 0 ?
                                <button className="btn-add btn" onClick={this.handleSubmit.bind(this)}>Add Page</button>
                                :
                                <button className="btn-add btn btn-disabled">Add Page</button>

                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ModalSearchInput
