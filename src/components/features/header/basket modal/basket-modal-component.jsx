import "./basket-modal-style.scss"

import AutoWidthButton from "../../buttons components/autow basic button/B-button-component";

import { useCart } from "../../../../sevices/hooks/useCart"

export default function BasketModal() {

    const { state } = useCart();
    console.log(state);

    return (<>
    <div className="basket-modal-wrapper">
        {(Object.keys(state).length === 0 )
        ?
        <div className="empty-text">Empty basket</div>
        :
        <>
        {state.marchs.map((item , i) => {
            return (
                <div className="basket-item">
                    <img src={item.image} alt="" />
                    <div className="right-side w-100">
                            <div className="title">{item.title}</div>
                            <div className="d-flex justify-content-between w-100">
                            <div className="quantity">{`quantity : ${item.quantity}`}</div>
                            <div className="quantity">{`price : ${item.price}`}</div>
                            </div>
                    </div>
                </div>
            )
        })}
        <AutoWidthButton text="Checkout" />
        </>
    }

    </div>
    </>)
}