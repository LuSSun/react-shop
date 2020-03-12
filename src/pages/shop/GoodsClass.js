import React, { Component } from 'react'
import toLogin from '../../libs/login'
import { Redirect } from 'react-router-dom';

export default class User extends Component {
	clickHandle=()=>{
		console.log(666)
		// window.location.href ='/login'
		// return
		// return <Redirect to="/login" />;
		toLogin()
	}
    render() {
        return (
            <div>
                Category123
				<br/>
				<button onClick={this.clickHandle}>点击跳转</button>
            </div>
        )
    }
}
