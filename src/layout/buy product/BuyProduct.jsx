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
        <div className="wrapper row">
            <div className="col-8 col-lg-7 col-12 who-wr">
                <div className="ratio ratio-1x1">
                    <div className="left ">
                        {/* up */}
                        <div className="up">

                            <div className="img-wraper">
                                <img className="img" src={mainImg} />
                                <div className="carusel-wrpaer d-flex justify-content-between">




                                    <div className="d-flex align-item-center float-left" style={{ border: "1px solid blue" }}>
                                        <div className="icon-btn">&lt;</div>
                                    </div>

                                    <img className="carusel-img ratio ratio-1x1 p-1" src={img1} alt="" />
                                    <img className="carusel-img ratio ratio-1x1 p-1" src={img2} alt="" />
                                    <img className="carusel-img ratio ratio-1x1 p-1" src={img3} alt="" />
                                    <img className="carusel-img ratio ratio-1x1 p-1" src={img4} alt="" />
                                    <div className="d-flex align-item-center" style={{ border: "1px solid blue" }}>
                                        <div className="icon-btn ">&gt;</div>
                                    </div>

                                </div>
                            </div>
                            <div className="form-wrap">
                                <div className="brandName">Brand name</div>
                                <div className="fullname">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima dolor atque rerum, at tempore, veniam deserunt facilis id aspernatur voluptatum ullam exercitationem natus, quo consequatur! Necessitatibus facilis ea consequatur voluptate.</div>
                                <div className="price">$ 2,000</div>
                                <div className="selectwraper">
                                    {selection()}
                                    {selection()}
                                    {selection()}
                                    {selection()}
                                    {selection()}
                                    {selection()}
                                </div>
                                <div className="counter-wrap">
                                    <div className=" cont-btn"><p>+</p></div>
                                    <div className="d-flex justify-content-center align-item-center count-num"><p>1</p></div>
                                    <div className=" cont-btn"><p>-</p></div>
                                </div>

                                <button className="buy-btn"><p>Add to basket</p></button>
                            </div>
                        </div>
                        {/* up */}

                        {/* down */}
                        <div style={{ border: "1px solid yellow", height: "25%" }}>
                            <div className="describe">Description</div>
                            <div className="detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, impedit ipsa nulla quo dolore similique delectus incidunt voluptate neque explicabo ipsum, in voluptas modi quam suscipit quidem repellendus eaque aspernatur? Magnam asperiores quod dolore obcaecati praesentium, tempore quia pariatur doloremque fugiat aut iure accusantium soluta labore. Magni corporis a impedit nesciunt, nam libero voluptatem deserunt est ipsam debitis ipsum doloribus, id voluptates harum alias cumque dolores. Provident dolore voluptatum optio quia aliquam facere facilis porro modi adipisci. Perferendis adipisci ratione, nemo accusamus blanditiis error deleniti debitis. Accusamus nostrum quisquam eum ad sapiente voluptatibus, repellat aliquid molestiae cum expedita cupiditate quibusdam.</div>
                            <div className="d-flex justify-content-center align-items-center w-100" style={{height:"20%"  , border:"1px solid green"}}>
                                <div className="read-more-wrap"><p>Read more</p></div>
                            </div>
                        </div>

                        {/* down  */}
                    </div>
                </div>
            </div>
            <div className="col-3 d-none d-md-inline">
                <div className="ratio ratio-1x1">
                    <div className="right">
                    {/* <div className="header-title">My Cart</div>
                    <div
                    className="d-flex"
                    style={{height: '90%' , width:"100%" , border:"1px solid red"}}>
                        <div className="body-wrap">
                            <div

                            style={{backgroundImage:`url(${vector})`, backgroundSize:"contain" , width:"30%" , height:"40%" , border:"1px solid white" }}
                            ></div>
                        </div>
                    </div> */}
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