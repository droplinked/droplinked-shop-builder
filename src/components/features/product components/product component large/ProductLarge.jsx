// import "./ProductLarge.scss"
// import savebtn from "../../../../assest/feature/product/savebtn.png"
// import { Link } from "react-router-dom";
// import { useState } from "react"
// import { useProfile } from "../../../../context/profile/ProfileContext"
// import { UseWalletInfo } from "../../../../context/wallet/WalletContext"

// function ProductLarge({  title, imageUrl, id }) {

//     const [viewBtn, setViewBtn] = useState(false)
//     const { userData, authenticate } = UseWalletInfo();
//     const { profile } = useProfile();

//     return (
//         <></>
//         // <div className="Lproduct-component-wrapper">
//         //     <Link to={`/merch/${id}`}>
//         //         <div className="product-image-st"
//         //             onMouseLeave={() => setViewBtn(false)}
//         //             onMouseEnter={() => setViewBtn(true)}>
//         //             {/* <img className="product-sve-btn" style={{width:"50px" , height:"50px"}} src={savebtn} alt="" /> */}
//         //             <div className="ratio ratio-1x1">
//         //                 <img className={` main-image ${(viewBtn) ? "product-img-opacity" : ""}`} src={imageUrl} />
//         //             </div>
//         //             {viewBtn && <div className="product-view-button"><p>View</p></div>}
//         //         </div>
//         //     </Link>

//         //     <div className="brand-name">{title}</div>
//         //     {/* <div className="priceS" dangerouslySetInnerHTML={{ __html: price }}></div> */}
//         // </div>
//     )
// }

// export default ProductLarge