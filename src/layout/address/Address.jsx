import React, { Component } from "react";
import "./address.scss";
import { Link, useNavigate } from "react-router-dom";
import add from "./icons/add.png";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAddress } from "../../sevices/hooks/useAddress";
import { useProfile } from "../../sevices/hooks/useProfile"
import axios from 'axios';


function Address() {
  let navigate = useNavigate();

  const [addAddress, setAddAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const { profile } = useProfile();
  const personId = profile.id;

  useEffect(() => {
    axios.get(`https://dev.flatlay.io/user/address`, {
      headers: {
        "Content-Type": "application/json",
        authorization: personId,
      }
    }).then((res) => {
      console.log(res.data);
      setAddressList(res.data.address)
    })


  }, [])

  const updateAddress = () => {
    axios.get(`https://dev.flatlay.io/user/address`, {
      headers: {
        "Content-Type": "application/json",
        authorization: personId,
      }
    }).then((res) => {
      console.log(res.data);
      setAddressList(res.data.address)
    })

  }

  function cancelNewAddress() {
    setAddAddress(false);
  }

  function proccess() {
    let x = JSON.parse(localStorage.getItem('shopping_cart'));

    let shop = x[0].shopName;
    console.log(shop);
    let variantArr = x.map((item) => {
      return {
        quantity: item.amount,
        variant_id: item.variant.id
      }
    })
    let adr = JSON.parse(localStorage.getItem('checkout-selectedAddress')).address;
    let selectedAddress = {
      address1: adr.line1,
      address2: adr.line1 || "",
      city: adr.city,
      country: adr.country,
      first_name: adr.first_name,
      last_name: adr.last_name,
      phone: "",
      province: adr.state,
      zip: adr.zip

    }

    axios.post('https://dev.flatlay.io/checkout',
      {
        checkoutItem: {
          checkout: {
            billing_address: selectedAddress,
            email: profile.email,
            line_items: variantArr,
            shipping_address: selectedAddress
          }
        },
        shopName: shop,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: personId,
        }
      }).then((res) => {
        console.log(res.data);
        localStorage.setItem('checkout-createdCheckout', JSON.stringify(res.data.checkout));
        navigate("../shipping", { replace: true });


      });


  }

  return (
    <div className='w-100 address-rs-p'>
      <div className='d-flex justify-content-center align-items-center mb-4'>

        <strong className="myaddress-style">my address</strong>

        {/* <span className='text-muted txm-add'>select an address or add new one</span> */}
      </div>
      <div style={{ width: "auto", padding: "0px 5px", height: "auto", border: "1px solid #B3B3B3", borderRadius: "16px" }}>
        {(addressList != undefined) &&
          addressList.map((item, i) => {
            return <AddressItem address={item} key={i} />
          })

        }
      </div>

      {!addAddress ?
        <div className='text-center h-auto'>
          <button className='add-address-btn'
            onClick={() => { setAddAddress(true) }}
          >
            {/* <img className="" src={add} alt='add' width='18px' height='18px' /> */}
            <span className='' style={{ color: "white" }}>add new address</span>
          </button>
        </div>
        :
        <div className='text-center mt-5'></div>
      }

      {addAddress && <NewAddress cancel={cancelNewAddress} update={updateAddress} />}

      <div className='text-center mt-4'>
        {/* <Link to="/shipping"> */}
        <button className='add-address-btn'
          onClick={() => {
            proccess()
          }}
        >
          proceed to shipping
        </button>
        {/* </Link> */}
      </div>
    </div>
  )

}

function NewAddress({ cancel, update }) {
  const { profile } = useProfile();
  const personId = profile.id;

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
    let address = data

    axios.post('https://dev.flatlay.io/user/address',
      address,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: personId,
        }
      }).then((res) => {
        console.log(res.data);
      });
    update();
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
                  {...register("first_name", {
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
                  {...register("last_name", {
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
                  {...register("line1", {
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
            <button
              //to="/shipping"
              className="col-5 col-md-4 add-address-btn"
              type="submit"
              value="save"
            >
              save
            </button>

            <button
              className="col-5 col-md-4 add-address-btn"
              type="button"
              onClick={cancel}
            >
              cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function AddressItem({ address }) {
  //
  return (
    <div className="address-card p-3 selected" tabindex="0"
      onFocus={() => {
        localStorage.setItem('checkout-selectedAddress', JSON.stringify(address));
      }}
    >
      <div className="cursor-pointer">
        <div className="d-flex flex-row align-items-center justify-content-between mb-2">
          <h3>
            <strong className="addres-contry-city">
              {address.address.country} - {address.address.city}
            </strong>
          </h3>
          <span className="color-white">primary</span>
        </div>
        <p className="address-txt mb-1 d-flex justify-content-start">{address.address.line1}</p>
        <p className="address-txt mb-1 d-flex justify-content-start" >
          {address.address.state} | {address.address.zip}
        </p>
        <div className="d-flex align-items-center justify-content-end actions-container" >
          <button className="btn btn-sm">edit</button>
          <button className="btn btn-sm text-danger ml-2">remove</button>
        </div>
      </div>
    </div>
  );
}

export default Address;
