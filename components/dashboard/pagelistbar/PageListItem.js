import React, { Component } from 'react'
import actions from '../../../redux/actions/actions'

class PageListItem extends Component {

    handleClick () {
        this.props.dispatch(actions.SetActivePage(this.props.id))
    }

    render () {

        var liClass
        if (this.props.bActivePage === true && this.props.bIsAdministeredPage === false) {
            liClass = "list-item-active"
        }
        else if (this.props.bActivePage === true && this.props.bIsAdministeredPage === true) {
            liClass = "list-item-active list-item-admin"
        }
        else if (this.props.bActivePage === false && this.props.bIsAdministeredPage === true) {
            liClass = "list-item-admin"
        }
        else {
            liClass = ""
        }
        return (
            <li onClick={this.handleClick.bind(this)} className={liClass}> {this.props.name} { this.props.bIsAdministeredPage && <span className="list-item-admin-ic">A</span>}</li>
        )
    }
}

export default PageListItem
