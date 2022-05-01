import { Link } from "react-router-dom";
import "./shipping.scss"
import { useState, useEffect } from "react";
import axios from 'axios';
import { useProfile } from "../../sevices/hooks/useProfile"

export default function Shipping() {
    const [shipingRates, setShippingRates] = useState([])
    const { profile } = useProfile();
    const personId = profile.id;

    useEffect(() => {

        let shop = JSON.parse(localStorage.getItem('shopping_cart'))[0].shopName;
        let checkoutID = JSON.parse(localStorage.getItem('checkout-createdCheckout')).token;
        
        axios.post('https://dev.flatlay.io/checkout/getshippingrates',
            {
                checkoutId: checkoutID,
                shopName: shop
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: personId,
                }
            }).then((res) => {
                console.log(res.data.shipping_rates);
                setShippingRates(res.data.shipping_rates);
            });


    }, [])


    const proceeToPayment = () => {

        let shop = JSON.parse(localStorage.getItem('shopping_cart'))[0].shopName;
        let chID = JSON.parse(localStorage.getItem('checkout-createdCheckout')).token;
        let hand = JSON.parse(localStorage.getItem('checkout-selectedShipping')).handle;

        axios.post('https://dev.flatlay.io/checkout/update',
            {
                shopName: shop,
                checkoutId: chID,
                checkoutItem: {
                    checkout: {
                        token: chID,
                        shipping_line: {
                            handle: hand,
                        },
                    },
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: personId,
                }
            }).then((res) => {
                console.log(res.data);
                localStorage.setItem('checkout-createdCheckout', JSON.stringify(res.data.checkout));
            });

    }


    return (
        <div className="shipping-wrapper">

            <div className="head-text-wrapper d-flex justify-content-start">
                <p>Shipping</p>
            </div>
            <div className="option-wrapper d-flex flex-column" style={{ border: "1px solid white" }}>
                {(shipingRates != undefined) && shipingRates.map((shiping) => {
                    return (<ShippingItem shipingDetail={shiping} />)
                })}
            </div>
            <div className="d-flex justify-content-center">
                <Link to="/payment">
                    <button className="shiping-process-ahiping"
                        onClick={proceeToPayment}
                    >
                        Proceed to payment
                    </button>
                </Link>
            </div>
        </div>

    )
}

function ShippingItem({ shipingDetail }) {

    return (
        <div className="d-flex justify-content-center mt-3 selected  h-auto" style={{padding:"10px 0px"}} tabindex="0"
            onFocus={() => {
                localStorage.setItem('checkout-selectedShipping', JSON.stringify(shipingDetail));
            }}
        >
            <div className="rounded-2 p-3  col-md-6 col-12 shiping-item-wrap " tabindex="0" >
                <div className="cursor-pointer d-flex flex-row align-items-center justify-content-between selected">
                    <strong className="text-in-shiping">{shipingDetail.title}</strong>
                    <span className="text-in-shiping">$ ${shipingDetail.price}</span>
                </div>
            </div>
        </div>

    )
}