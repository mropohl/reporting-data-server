import React, { Component } from 'react'
import SearchInput from './SearchInput'
import SearchWarning from './SearchWarning'
import TransitionGroup from 'react-addons-transition-group';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from '../../sass/modals/alert.sass'

class SearchBar extends Component {
    render () {
        return (
            <div>

                <SearchInput dispatch={this.props.dispatch}/>
                <ReactCSSTransitionGroup
                    transitionName="modal"
                >
                    { this.props.flagPageAlreadyAdded && <SearchWarning key={1} dispatch={this.props.dispatch}/>}
                </ReactCSSTransitionGroup>

            </div>
        )
    }
}

export default SearchBar
