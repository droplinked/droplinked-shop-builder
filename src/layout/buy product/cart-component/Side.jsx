import "./Side.scss";
import SideCardItem from "../../sideCard/SideCardItem"
import { useCart } from "../../../sevices/hooks/useCart"

function Side() {
 const  {state ,increase}  = useCart();
 console.log(state);

    return (
        <div className="product-bakset-wraper">
                {(state!= undefined) && state.map((item)=>{ 
                    return( <SideCardItem 
                         title={item.product.product} 
                         image={item.product.images[0].src}
                         cost={item.variant.price}
                         amount={item.amount}
                         detail={item.variant.title}
                         /> )
                })}
        </div>)
}

export default Side