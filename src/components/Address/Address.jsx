import React, { Component } from 'react'

import add from './icon/add'

class Address extends Component {
	render() {
		return (
			<div className='bg-white rounded-2 shadow-sm p-3 p-lg-4'>
				<div className='d-flex flex-row align-items-center mb-4'>
					<h2 className='m-0 me-3'>
						<strong>my address</strong>
					</h2>
					<span className='text-muted'>select an address or add new one</span>
				</div>
				<div className='text-center p-3'>
					<button className='btn'>
						<img src={add} alt='' />
						<span className='ml-2'>add new address</span>
					</button>
				</div>
			</div>
		)
	}
}

export default Address
