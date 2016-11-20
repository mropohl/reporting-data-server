import React, { Component } from 'react'
import Styles from '../sass/loadingscreen/spinner.sass'

class Spinner extends Component {

    render() {
        return (
            <div className="spinner-wrapper">
                <div className="spinner-wrapper-inner">
                    <div className="spinner"></div>
                    <div className="spinner"></div>
                    <div className="spinner"></div>

                </div>
            </div>
        )
    }

}


export default Spinner
