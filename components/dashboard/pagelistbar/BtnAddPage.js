import React, { Component } from 'react'
import styles from '../../sass/btn/btn.sass'

class BtnAddPage extends Component {

    render () {
        return (
            <div>

                <button className="btn" onClick={this.props.handleClick}>Add</button>

            </div>
        )
    }
}

export default BtnAddPage
