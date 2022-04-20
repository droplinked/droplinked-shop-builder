import "./Collection.scss"
import nft1 from "../../../assest/image/nft/produc.jpg"
function Collection() {

    return (<>
        <div className="row d-flex justify-content-center gr">
            <div className="collection-wrapper col-12 col-md-8 ">
                <div className="collection-child" >
                    <div className="header">
                        <p className="title ">Holder merch</p>
                        <button className="see-more d-none d-md-flex"><p>See more</p></button>
                    </div>

                    {/* <div className="container-fluid d-flex justify-content-center" style={{ border: "1px solid green" , padding:"0px" }}> */}
                    <div className="products-wrapper row">
                        <div className="col-6 col-md-3 col-lg-3 d-flex justify-content-center">{Product()}</div>
                        <div className="col-6 col-md-3 col-lg-3 d-flex justify-content-center">{Product()}</div>
                        <div className="col-6 col-md-3 col-lg-3 d-flex justify-content-center">{Product()}</div>
                        <div className="col-6 col-md-3 col-lg-3 d-flex justify-content-center">{Product()}</div>

                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    </>)
}

function Product() {
    return (<>
        <div className="product-wrap">
            <div className="product-image-wrap">
                <img className="ratio ratio-1x1" src={nft1} />
            </div>
            <div className="brand-name">Brand Name</div>
            <div className="price">$ 75</div>
        </div>
    </>)
}

export default Collection