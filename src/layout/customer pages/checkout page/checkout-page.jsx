import "./checkout-page.style.scss"

import plus from "../../../assest/feature/buy product/plusIcon.png"
import minus from "../../../assest/feature/buy product/minusIcon.png"
import closePng from "../../../assest/feature/home page images/Close.png"
import AutoWidthButton from "../../../components/features/buttons components/autow basic button/B-button-component"

import { useCart } from "../../../sevices/hooks/useCart"


export default function CheckoutPage() {

    const { addProduct, getTotalPrice, state } = useCart()
    console.log(state);
    return (
        <div className="checkuot-page-wrapper">
            <div className="top-nav d-flex">
                <div className="col-7 item justify-content-start">Product</div>
                <div className="col-2 item justify-content-start">Amount</div>
                <div className="col-2 item">Price</div>
                <div className="col-1 item"></div>
            </div>


            {
                (Object.keys(state).length === 0)
                    ?
                    <div className="w-100 mt-4 mb-4 d-flex justify-content-center align-items-center"
                    style={{height:"200px"}}>
                        <p  style={{fontSize:"24px" , color:"white"}}>Empty</p>
                    </div>
                    :
                    <>
                        {state.marchs.map((item, i) => {
                            return (
                                <div className="item-container d-flex">
                                    <div className="col-7 img-title justify-content-start">
                                        <img src={item.image} alt="product image" />
                                        <div className="detail">
                                            <p>{item.title}</p>
                                            <p>{`quantity: ${item.quantity}`}</p>
                                        </div>
                                    </div>
                                    <div className="col-2 item-counter-wrap justify-content-start">
                                        <img src={plus} alt="" />
                                        <p>{item.quantity}</p>
                                        <img src={minus} alt="" />
                                    </div>
                                    <div className="col-2 price">
                                        <p>{`$ ${item.price * item.quantity}`}</p>
                                    </div>
                                    <div className="col-1 d-flex justify-content-end align-items-center close-btn">
                                        <img src={closePng} alt="close" />
                                    </div>
                                </div>
                            )
                        })
                        }
                    </>
            }

            <div className="d-flex justify-content-end">
                <div className="total-price d-flex">
                    <p className="text">Total cost:</p>
                    <p className="price m-0">{`$  ${getTotalPrice()}`}</p>
                </div>
            </div>

            <div className="d-flex justify-content-end mt-5">
                <div className="col-12 col-md-4">
                    <AutoWidthButton text="Checkout" />
                </div>
            </div>
        </div>
    )
}