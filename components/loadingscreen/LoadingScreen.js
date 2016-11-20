import React, { Component } from 'react'
//import SearchBar from './searchbar/SearchBar'
import Spinner from './Spinner'
import Styles from '../sass/loadingscreen/spinner.sass'


class LoadingScreen extends Component {

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


export default LoadingScreen
