import React, { Component } from 'react'


class NavbarStatus extends Component {
    render () {
        return (
            <div>

                <h1 className="navbar-logo">influencer.io</h1>
                <span className="navbar-status">You are logged in as: <span className="navbar-status-name">{this.props.userData.name}</span></span>
                
            </div>
        )
    }
}

export default NavbarStatus
