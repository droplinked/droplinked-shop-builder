import shoeImg from "../assest/shoe/shoe.jpg"
import shoe1 from "../assest/shoe/shoe1.jpg"
import shoe2 from "../assest/shoe/shoe2.jpg"
import shoe3 from "../assest/shoe/shoe3.jpg"
import shoe4 from "../assest/shoe/shoe4.jpg"

export default function Buy(){
    return (<>
           <div className="container-fluid" style={{width:'100vw' , height:'100vh'}}>
               <div className="row">
                   <div className="col-1" style={{ height:"100vh"}}></div>
                   <div className="col-8 " style={{ height:"100vh"}}>
                       <div className="main-shop">
                           <img src={shoeImg} alt="" className="main-image" />
                           <div className="brand-name">Brand Name</div>
                           <div className="product-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione vero voluptatem provident hic numquam necessitatibus.</div>
                           <div className="product-price">$2000</div>
                           {/* options */}
                           <div className="options-main"> 
                                        {/* row1 */}
                                <div className="option-row option-row-1">
                                    <select className="option-item" style={{left: "138px" , order:'1'}} >
                                     <option value="volvo">option</option>
                                      <option value="saab">Saab</option>
                                         <option value="fiat">Fiat</option>
                                         <option value="audi">Audi</option>
                                     </select>
                                     <select className="option-item" style={{left: "0px" , order:'0'}} >
                                     <option value="volvo">option</option>
                                      <option value="saab">Saab</option>
                                         <option value="fiat">Fiat</option>
                                         <option value="audi">Audi</option>
                                     </select>
                                </div>
                                 {/* row1 */}

                              {/* row2 */}
                                <div className="option-row option-row-2">
                                  <select className="option-item" style={{left: "138px" , order:'1'}} >
                                       <option value="volvo">option</option>
                                        <option value="saab">Saab</option>
                                         <option value="fiat">Fiat</option>
                                         <option value="audi">Audi</option>
                                     </select>
                                     <select className="option-item" style={{left: "0px" , order:'0'}} >
                                        <option value="volvo">option</option>
                                        <option value="saab">Saab</option>
                                         <option value="fiat">Fiat</option>
                                         <option value="audi">Audi</option>
                                      </select>

                                </div>
                                 {/* row2 */}


                                <div className="option-row option-row-3">
                                <select className="option-item" style={{left: "138px" , order:'1'}} >
                                       <option value="volvo">option</option>
                                        <option value="saab">Saab</option>
                                         <option value="fiat">Fiat</option>
                                         <option value="audi">Audi</option>
                                     </select>
                                     <select className="option-item" style={{left: "0px" , order:'0'}} >
                                        <option value="volvo">option</option>
                                        <option value="saab">Saab</option>
                                         <option value="fiat">Fiat</option>
                                         <option value="audi">Audi</option>
                                      </select>
                                </div>
                           </div>
                           {/* options */}

                           {/* button group */}
                            <div className="btn-group">
                                    <div className="btn-group-block">+</div>
                                    <div className="group-text">1</div>
                                    <div className="btn-group-block">-</div>
                            </div>
                           {/* button group */}

                           <div className="add-to-basket">Add to basket</div>


                                    {/* image groupe */}
                             
                                        
                                                    
                                          <img src={shoe1} alt=""  className="image-item" style={{left: "278px"}}/>
                                          <img src={shoe2} alt=""  className="image-item" style={{left: "206px"}}/>
                                          <img src={shoe3} alt=""  className="image-item" style={{left: "134px"}}/>
                                          <img src={shoe4} alt=""  className="image-item" style={{left: "62px"}}/>
                       
           
                                        <button className="image-group-right">{`>`}</button>
                                        <button className="image-group-left">{`<`}</button>
                              
                            
                                    {/* image groupe */}

                                    <div className="describe-text">Describe</div>
                                    <div className="describtion-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quod qui quaerat? Doloremque ipsa animi aliquid voluptate similique, vitae expedita cum illum reprehenderit deleniti doloribus, harum voluptas velit recusandae asperiores dolor. Repellendus, beatae. Vitae accusamus mollitia vel consectetur sunt cum voluptatibus reprehenderit, laboriosam, sed voluptatem officia? Neque beatae libero natus!</div>


                       </div>
                   </div>
                   <div className="col-3" style={{backgroundColor:'white', height:"100vh"}}></div>
               </div>
           </div>
    </>)
}