import React, { Component } from 'react'
import BtnLogout from './BtnLogout'
import ReportList from './ReportList'
import BtnCreateReport from './BtnCreateReport'
import BtnShowReport from './BtnShowReport'
import ModalCreateReport from './ModalCreateReport'
import NavbarStatus from './NavbarStatus'
import styles from '../../sass/navbar/navbar.sass'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Navbar extends Component {
    render () {
        return (
            <div className="navbar-wrapper">
            
                <ReportList dispatch={this.props.dispatch} state={this.props.state}/>

                <BtnShowReport state={this.props.state} dispatch={this.props.dispatch}/>

                <BtnCreateReport dispatch={this.props.dispatch}/>

                <NavbarStatus userData={this.props.state.user}/>

                <BtnLogout dispatch={this.props.dispatch} userData={this.props.state.user}/>

                <ReactCSSTransitionGroup
                    transitionName="modal"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                {
                    this.props.state.bCreateNewReport && <ModalCreateReport dispatch={this.props.dispatch} state={this.props.state} />
                }
                </ReactCSSTransitionGroup>

            </div>
        )
    }
}

export default Navbar
