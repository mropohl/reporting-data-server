import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../../redux/actions/actions'

class ManagedPagesItem extends Component {

    handleChange() {
        this.props.dispatch(actions.SetPageWillBeAdded(this.props.id))
    }

    render () {
        return (
            <li>{this.props.name} <input type="Checkbox" checked={this.props.bWillBeAdded} onChange={this.handleChange.bind(this)}/></li>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps) (ManagedPagesItem)
