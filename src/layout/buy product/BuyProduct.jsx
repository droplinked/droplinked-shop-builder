import "./BuyProduct.scss"
import mainImg from "./assest/mainImg.jpg"
import img1 from "./assest/img1.jpg"
import img2 from "./assest/img2.jpg"
import img3 from "./assest/img3.png"
import img4 from "./assest/img4.jpg"
import left from "../../assest/feature/buy product/leftflask.png"
import right from "../../assest/feature/buy product/righIcon.png"
import plus from "../../assest/feature/buy product/plusIcon.png"
import minus from "../../assest/feature/buy product/minusIcon.png"
import basket from "../../assest/feature/buy product/basketIcon.png"
import readmoreIcon from "../../assest/feature/buy product/readmore.png"
import icon1 from "../../assest/feature/buy product/saveIcon.png"
import icon2 from "../../assest/feature/buy product/upIcon.png"
import icon3 from "../../assest/feature/buy product/bigIcon.png"
import icon4 from "../../assest/feature/buy product/big2Icon.png"
import { useState } from "react"

function BuyProduct() {

    const[readmore , setReadmore] = useState(false);
    const[number , setNumber] = useState(1)

    return (<>
    <div className="product-page-wrap">
        <div className="row">         
            <div className="d-flex justify-content-between "  >
                <div className="col-md-8 col-12 product-whole-border" >
                    
                    <div className="buy-product-wraper">

                        <div className="product-img-form-wr">
                            <div className="product-main-image" style={{ backgroundImage: `url(${mainImg})` }}>

                            <div className="position-absolute d-flex justify-content-between " style={{top:"12px" , right:"12px" , width:"130px"}}>
                                <div className="product-main-img-icon">
                                <img src={icon3} className="product-icon-img" alt="" />
                                </div>
                                <div className="product-main-img-icon">
                                    <img src={icon2} className="product-icon-img" alt="" />
                                </div>
                                <div className="product-main-img-icon">
                                <img src={icon1} className="product-icon-img" alt="" />
                                </div>
                            </div>

                                <div className="product-main-img-downicon">
                                    <img src={icon4} alt="" />
                                    <p>Official website</p>
                                </div>

                            </div>
                            {/* ff */}
                           <div className=" w-100 d-flex justify-content-between" style={{height:"80px" , paddingTop:"10px"}}>

                                <div className="product-carusel-btn">
                                    <img src={left} className="w-100 h-100" alt="" />
                                </div>
                                <img className="product-carosel-img" src={img1} alt="" />
                                <img className="product-carosel-img" src={img2} alt="" />
                                <img className="product-carosel-img" src={img3} alt="" />
                                <img className="product-carosel-img" src={img4} alt="" />
                                <div className="product-carusel-btn">
                                    <img src={right} className="w-100 h-100" alt="" />
                                </div>
                            </div>
                        </div>

                        <div className="product-img-form-wr product-left-side" >
                            <div className="product-brand-name">Brand name</div>
                            <div className="product-text-brand">Product name lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo, venenatis pellentesque tellus integer quisque purus pulvinar.</div>
                            <div className="product-price">$ 2,000</div>

                            <div className="w-100 d-flex justify-content-between flex-wrap">
                                {selection()}
                                {selection()}
                                {selection()}
                                {selection()}
                                {selection()}
                                {selection()}
                            </div>

                            <div className="d-flex">
                                <div className="product-counter-btn"
                                onClick={()=>{setNumber(p => p+1)}}
                                >
                                    <img src={plus} alt="" />
                                </div>
                                <div className="product-counter-btn" style={{margin:"0px 10px" , backgroundColor:"transparent"}}><p>{number}</p></div>
                                <div className="product-counter-btn"
                                onClick={()=>{setNumber(p => p-1)}}
                                >
                                    <img src={minus} alt="" />
                                </div>
                            </div>

                            <button className="product-addbasket-btn">
                                <div className="d-flex justify-content-center align-items-center" style={{height:"18px"}}>
                                    <img src={basket} className="h-100" alt="" />
                                    <p className="product-add-basket-text">Add to basket</p>
                                </div>
                            </button>
                        </div>
                      
                    </div>
                    <div className="product-down-wrp">
                        <div className="product-describe-text">Description</div>
                        <div className={`product-detail-text ${readmore?"":"showReadMore"}`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel sapiente est non qui aut minus, quia blanditiis assumenda harum alias accusantium voluptatum vitae error asperiores dicta veniam maiores quidem. Unde vero est quibusdam, ipsum voluptate hic impedit? Unde consequuntur odit rem nisi delectus aperiam quis ipsum reiciendis magni recusandae. Laborum facilis iusto quis harum expedita? Quam perspiciatis cum ab at aperiam iste doloribus! Vero non corporis ad suscipit sunt ipsam quam dolores nulla? Cumque laboriosam id animi nulla at pariatur exercitationem aperiam dolor nihil corrupti explicabo deserunt, ducimus dicta assumenda modi, nemo ullam, quis perferendis quae eveniet! Reiciendis eaque possimus incidunt molestias. Et sit labore odio vel eum iste! Nihil modi doloremque fugiat molestiae quod enim nulla nisi deserunt accusantium voluptatibus aut eveniet maiores optio pariatur nesciunt, nostrum corrupti debitis sint hic, inventore rem tenetur voluptatem. Cum, eum ratione error quam earum suscipit aliquam molestias iusto voluptatibus magnam dolor animi!</div>
                        <button className="product-readmore-btn"
                        onClick={()=>{setReadmore(p=>!p)}}
                        >
                            <img src={readmoreIcon}  alt="" />
                            <p>Read more</p>
                        </button>
                    </div>
                    
                    
                
                </div>
                <div className="col-4 d-none d-md-inline">
                    <div className="product-bakset-wraper">

                    </div>

                </div>
            </div>

            </div>


        </div>
    </>)
}



function selection() {

    return (<>
        <div className="product-select-wrap">
            <select className="product-select-text" name="size" id="cars">
                <option value="volvo">small</option>
                <option value="saab">medium</option>
                <option value="opel">large</option>
                <option value="audi">x large</option>
            </select>
        </div>
    </>)
}

export default BuyProduct