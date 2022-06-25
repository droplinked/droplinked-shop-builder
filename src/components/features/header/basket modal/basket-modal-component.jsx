import "./basket-modal-style.scss"

import AutoWidthButton from "../../buttons components/autow basic button/B-button-component";

import { useCart } from "../../../../sevices/hooks/useCart"
import { useNavigate  } from "react-router-dom";


export default function BasketModal({ close }) {

    const { cart } = useCart();
    let navigate = useNavigate();

    const ClickCheckuot = () => {
        navigate("/checkout")
        close();
    }

    return (<>
        <div className="basket-modal-wrapper">
            {(cart.items.length === 0)
                ?
                <div className="empty-text">Empty basket</div>
                :
                <>
                    {cart.items.map((item, i) => {
                        return (
                            <div className="basket-item">
                                <p style={{color:"white"}}>{item.skuID}</p>
                                {/* <img src={item.image} alt="" />
                                <div className="right-side w-100">
                                    <div className="title">{item.title}</div>
                                    <div className="d-flex justify-content-between w-100">
                                        <div className="quantity">{`quantity : ${item.quantity}`}</div>
                                        <div className="quantity">{`price : ${item.price}`}</div>
                                    </div>
                                </div> */}
                            </div>
                        )
                    })}
                    <AutoWidthButton text="Checkout" click={ClickCheckuot} />
                </>
            }

        </div>
    </>)
}