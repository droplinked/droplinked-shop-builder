import "./Collection.scss"
import nft1 from "../../../assest/image/nft/produc.jpg"
import Product from "../../../components/features/product/Product"

function Collection(props) {

    return (<>
        <div className="row  d-flex justify-content-center" style={{padding:"0px 10px"}}>
            <div className="d-flex justify-content-center gr">
            <div className="col-12 col-sm-8 d-flex justify-content-center">
                <div className="collection-wrapper ">
                    <div className="collection-child" >
                        <div className="header">
                            <div className="titleS"><p>{props.name}</p></div>
                            <button className="see-more d-flex "><p>See more</p></button>
                        </div>

                        {/* <div className="container-fluid d-flex justify-content-center" style={{ border: "1px solid green" , padding:"0px" }}> */}
                        <div className="products-wrapper row">
                            <Product />
                            <Product />
                            <Product />
                            <Product />

                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
            </div>
        </div>
    </>)
}

// function Product() {
//     return (<>
//         <div className="product-wrap">
//             <div className="product-image-wrap">
//                 <img className="ratio ratio-1x1" src={nft1} />
//             </div>
//             <div className="brand-name">Brand Name</div>
//             <div className="price">$ 75</div>
//         </div>
//     </>)
// }

export default Collection