import React, { Component } from 'react'
import styles from '../../sass/welcomescreen/welcomescreen.sass'


class WelcomeScreen extends Component {

    render() {
        return (
            <div className="welcome-screen-wrapper">
                <div className="welcome-screen-wrapper-inner">
                    <h2> Welcome {this.props.userData.name}!</h2>
                    <div className="welcome-screen-container-wrapper">
                        <div className="welcome-screen-container">
                            <p>Currently you do not have any Facebook pages added. Please start by adding a
                         new Facebook page with the plus icon in the upper right hand corner.</p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default WelcomeScreen
