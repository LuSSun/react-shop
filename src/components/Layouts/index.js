import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import Tab from '../Tab/index'
class Layouts extends Component {
	// static propTypes = {
	//     prop: PropTypes
	// }
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render() {
		return (
			<div>
				{this.props.children}
				{/* <Tab></Tab> */}
			</div>
		)
	}
}
export default Layouts
