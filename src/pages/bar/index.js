import React, { Component } from 'react'

export default class User extends Component {
    render() {
        console.log('history', this.props)
        return (
            <div>
                Bar
                <p onClick={this.clickHandle}>点击啊</p>
            </div>
        )
    }

    clickHandle=()=>{
        console.log(66)
        this.props.history.push('/')
    }
}
