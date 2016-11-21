import React, { Component } from 'react'
import Navbar from './navbar/Navbar'
import PageListBar from './pagelistbar/PageListBar'
import ActivePage from './dashboard/activePage/ActivePage'
import ActiveReport from './activereport/ActiveReport'
import WelcomeScreen from './welcomescreen/WelcomeScreen'


class Dashboard extends Component {

    constructor (props) {
        super (props)
        this.state = {
            bShowWelcomeScreen: true
        }
    }

    disableWelcomeScreen() {
        this.setState({
            bShowWelcomeScreen: false
        })
    }

    enableWelcomeScreen() {
        this.setState({
            bShowWelcomeScreen: true
        })
    }

    render() {
        return (
            <div>


                <Navbar state={this.props.state} dispatch={this.props.dispatch}/>

                {this.props.state.fShowActiveReport !== true && <PageListBar dispatch={this.props.dispatch} state={this.props.state}/>}

                {this.props.state.fShowActiveReport ?

                    this.props.state.reportings.map(function (report) {

                        if (report.bActiveReport) {
                            return <ActiveReport key={report.id} reportData={report} state={this.props.state} dispatch={this.props.dispatch} />
                        } else {
                            return
                        }

                    }, this)

                    : this.props.state.addedPages.map(function (page) {

                        if (page.bActivePage) {
                            return <ActivePage key={page.id} pageData={page} state={this.props.state} dispatch={this.props.dispatch} handleLoad={this.disableWelcomeScreen.bind(this)}/>
                        } else {
                            return this.enableWelcomeScreen.bind(this)
                        }

                    }, this)
                }



                {this.state.bShowWelcomeScreen && <WelcomeScreen dispatch={this.props.dispatch} userData={this.props.state.user}/>}

            </div>

        )
    }

}


export default Dashboard
