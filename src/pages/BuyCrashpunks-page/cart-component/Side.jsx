import "./Side.scss";
import SideCardItem from "../../sideCard/SideCardItem"
import { useCart } from "../../../context/cart/CartContext"
import { Link } from "react-router-dom";

function Side() {
 const  {state ,increase}  = useCart();
 //console.log(state);

    return (
        <div className="product-bakset-wraper d-flex flex-column">
                {(state!= undefined) && state.map((item)=>{ 
                    return( <SideCardItem 
                         title={item.product.product} 
                         image={item.product.images[0].src}
                         cost={item.variant.price}
                         amount={item.amount}
                         detail={item.variant.title}
                         /> )
                })}
                <Link to="/cart"  className="side-basket-btn">
                <button>Check out</button>
                </Link>
        </div>)
}

export default Side