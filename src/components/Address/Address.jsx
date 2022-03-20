import React, { Component } from 'react'
import './address.scss'

import add from './icons/add.png'

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
				{<AddressItem />}
				<div className='text-center p-3'>
					<button className='btn'>
						<img src={add} alt='add' width='18px' height='18px' />
						<span className='ms-2'>add new address</span>
					</button>
				</div>
				{<NewAddress />}
				<div className='text-center mt-4'>
					<button className='btn btn-dark px-4 rounded-pill' disabled>
						proceed to shipping
					</button>
				</div>
			</div>
		)
	}
}

class NewAddress extends Component {
	render() {
		return (
			<div className='address-card p-3 rounded-2'>
				<p className='text-center'>new address</p>
				<form name='address_form'>
					<div className='row'>
						<div className='col-12 col-lg-6'>
							<div className='form-group'>
								<label htmlFor='first_name'>first name</label>
								<div>
									<input
										type='text'
										className='form-control'
										id='first_name'
										placeholder='First name'
										required
									/>
								</div>
							</div>
						</div>
						<div className='col-12 col-lg-6'>
							<div className='form-group'>
								<label htmlFor='last_name'>last name</label>
								<div>
									<input
										type='text'
										className='form-control'
										id='last_name'
										placeholder='Last name'
										required
									/>
								</div>
							</div>
						</div>
						<div className='col-12'>
							<div className='form-group'>
								<label htmlFor='line1'>address line 1</label>
								<div>
									<input
										type='text'
										className='form-control'
										id='line1'
										placeholder='address line 1'
										required
									/>
								</div>
							</div>
						</div>
						<div className='col-12'>
							<div className='form-group'>
								<label htmlFor='line2'>address line 2 (building or unit #)</label>
								<div>
									<input
										type='text'
										className='form-control'
										id='line2'
										placeholder='address line 2 (building or unit #)'
										required
									/>
								</div>
							</div>
						</div>
						<div className='col-12 col-lg-6'>
							<div className='form-group'>
								<label htmlFor='country'>country</label>
								<div>
									<input
										type='text'
										className='form-control'
										id='country'
										placeholder='country'
										required
									/>
								</div>
							</div>
						</div>
						<div className='col-12 col-lg-6'>
							<div className='form-group'>
								<label htmlFor='city'>city</label>
								<div>
									<input
										type='text'
										className='form-control'
										id='city'
										placeholder='city'
										required
									/>
								</div>
							</div>
						</div>
						<div className='col-12 col-lg-6'>
							<div className='form-group'>
								<label htmlFor='state'>state</label>
								<div>
									<input
										type='text'
										className='form-control'
										id='state'
										placeholder='state'
										required
									/>
								</div>
							</div>
						</div>
						<div className='col-12 col-lg-6'>
							<div className='form-group'>
								<label htmlFor='zip'>zip</label>
								<div>
									<input
										type='text'
										className='form-control'
										id='zip'
										placeholder='zip'
										required
									/>
								</div>
							</div>
						</div>
						<div className='d-flex align-items end justify-content-end'>
							<button className='btn btn-dark btn-sm rounded-pill px-4' type='submit'>
								save
							</button>
							<button className='btn btn-sm ml=3' type='button'>
								cancel
							</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

class AddressItem extends Component {
	render() {
		return (
			<div className='address-card p-3 selected'>
				<div className='cursor-pointer'>
					<div className='d-flex flex-row align-items-center justify-content-between mb-2'>
						<h3>
							<strong>USA - Wymanmouth</strong>
						</h3>
						<span className='primary-badge'>primary</span>
					</div>
					<p className='text-muted mb-1'>6825 Von Viaduct Apt. 908</p>
					<p className='text-muted mb-1'>Bilzen 54577 | Lewis Dickens</p>
					<div className='d-flex align-items-center justify-content-end actions-container'>
						<button className='btn btn-sm'>edit</button>
						<button className='btn btn-sm text-danger ml-2'>remove</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Address
