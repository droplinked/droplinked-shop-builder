import React, { Component } from "react";
import "./address.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import add from "./icons/add.png";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAddress } from "../../sevices/hooks/useAddress";

// function Address () {

// 	const[addAddress , setAddAddress]=useState(false);
// 	//const[address , setAddress]=useState([]);
// 	const { addressList } = useAddress();

// 	function cancelNewAddress(){
// 		setAddAddress(false);
// 	}

// 		return (
// 			<div className='bg-white rounded-2 shadow-sm p-3 p-lg-4'>
// 				<div className='d-flex flex-row align-items-center mb-4'>
// 					<h2 className='m-0 me-3'>
// 						<strong>my address</strong>
// 					</h2>
// 					<span className='text-muted'>select an address or add new one</span>
// 				</div>

// 				{addressList.length>0 &&
// 					addressList.map((item , i) =>{
// 						return <AddressItem address={item} key={i}/>
// 					})

// 				}

// 				{!addAddress ?
// 					<div className='text-center p-3'>
// 					<button className='btn'
// 						onClick={()=>{setAddAddress(true)}}
// 					>
// 						<img src={add} alt='add' width='18px' height='18px' />
// 						<span className='ms-2'>add new address</span>
// 					</button>
// 				</div>
// 				:
// 				<div className='text-center mt-5'></div>
// 				}

// 				{addAddress && <NewAddress cancel={cancelNewAddress}/>}

// 				<div className='text-center mt-4'>
// 					<Link to="/shipping">
// 					<button className='btn btn-dark px-4 rounded-pill' disabled>
// 						proceed to shipping
// 					</button>
// 					</Link>
// 				</div>
// 			</div>
// 		)

// }

function NewAddress(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { add, addressList } = useAddress();

  useEffect(() => {
    console.log(addressList);
  }, [addressList]); //

  function submitForm(data) {
    add(data);
    props.cancel();
  }

  return (
    <div className="address-card p-3 rounded-2">
      <p className="text-center">new address</p>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="row">
          <div className="header-text col-12">
            <p>My Address</p>
          </div>
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="first_name">first name</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  placeholder="First name"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="error">First name is required</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="last_name">last name</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="error">Last name is required</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="line1">address line 1</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="address line 1"
                  {...register("address1", {
                    required: "address line 1 is required",
                  })}
                />
                {errors.address1 && (
                  <p className="error">address line 1 is required</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="country">country</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="country"
                  {...register("country", {
                    required: "country is required",
                  })}
                />
                {errors.country && <p className="error">country is required</p>}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="city">city</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="city"
                  {...register("city", {
                    required: "city is required",
                  })}
                />
                {errors.city && <p className="error">city is required</p>}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="state">state</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="state"
                  {...register("state", {
                    required: "state is required",
                  })}
                />
                {errors.state && <p className="error">state is required</p>}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="zip">zip</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="zip"
                  {...register("zip", {
                    required: "zip is required",
                  })}
                />
                {errors.zip && <p className="error">zip is required</p>}
              </div>
            </div>
          </div>
          <div className="d-flex align-items end justify-content-between">
            <Link
              to="/payment"
              className="btn btn-light btn-sm rounded-pill px-4 col-5 col-md-4 "
              type="submit"
              style={{ fontSize: "15px", fontWeight: "600", color: "black" }}
              value="save"
            >
              save
            </Link>

            <button
              className="btn btn-sm ml=3 btn-light col-5 col-md-4"
              type="button"
              onClick={() => {
                props.cancel();
              }}
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// function AddressItem(props) {
//   //
//   return (
//     <div className="address-card p-3 selected" tabindex="0">
//       <div className="cursor-pointer">
//         <div className="d-flex flex-row align-items-center justify-content-between mb-2">
//           <h3>
//             <strong>
//               {props.address.country} - {props.address.city}
//             </strong>
//           </h3>
//           <span className="primary-badge">primary</span>
//         </div>
//         <p className="text-muted mb-1">{props.address.address1}</p>
//         <p className="text-muted mb-1">
//           {props.address.state} | {props.address.zip}
//         </p>
//         <div className="d-flex align-items-center justify-content-end actions-container">
//           <button className="btn btn-sm">edit</button>
//           <button className="btn btn-sm text-danger ml-2">remove</button>
//         </div>
//       </div>
//     </div>
//   );
// }

export default NewAddress;
