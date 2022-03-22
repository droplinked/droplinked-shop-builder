import "./item.scss"
import tshirt from "../../assest/tshirt.jpg"


export default function Item(){


    return (
        <div className="basket-item ">
            <img src={tshirt} alt="" className="col-3 basket-item-image"/>
            <div className="item-detail col-9">
                <div className="item-basket-name">T-Shirt Summer</div>
                <div className="cost">$89.99</div>
                <div className="item-color">
                    <div style={{marginRight:'2px'}}>Color</div>
                    <div style={{width:"50%" , height:"25px" , border:'1px solid' , align:'center' , right:'0px' , borderRadius:'5px'}}>
                        <div style={{backgroundColor:"gray" , width:"90%" , height:"90%" , margin:"auto" , top:'1px' , borderRadius:'5px'}}></div>
                    </div>
                </div>
                <div className="item-size">
                    <div style={{color:"gray" , fontSize:"12px" , left:'2px'}}>Size</div>
                    <div style={{color:"black" , fontSize:"15px" , left:'2px'}}>XXL</div>
                </div>
            </div>
        </div>
    )
}