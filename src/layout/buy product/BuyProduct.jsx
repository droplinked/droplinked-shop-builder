import "./BuyProduct.scss"
import mainImg from "./assest/mainImg.jpg"
import img1 from "./assest/img1.jpg"
import img2 from "./assest/img2.jpg"
import img3 from "./assest/img3.png"
import img4 from "./assest/img4.jpg"
import caruselbtnRight from "../../assest/feature/buy product/rightbtn.png"
import caruselbtnLeft from "../../assest/feature/buy product/leftbtn.png"
import vector from "../../assest/feature/buy product/Vector.png"
function BuyProduct() {

    return (<>
        <div className="row">
            <div className="d-flex justify-content-center ">
            <div className="col-md-8 col-12">
                <div className="buy-product-wraper">
                            <div className="buy-up">
                                <div className="image-carusel-wrap">
                                    <div className="product-main-img"></div>
                                </div>
                                <div className="buy-product-form-wrap"></div>
                            </div>
                </div>

            </div>
            <div className="col-3 d-none d-md-inline">
                <div className="product-bakset-wraper">

                </div>

            </div>
            </div>
        </div>
    </>)
}

function selection() {

    return (<>
        <div className="select-wr">
            <select className="select-tag" name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
            </select>
        </div>
    </>)
}

export default BuyProduct