import "./CollectionPage.scss"
import nft1 from "../../assest/image/nft/produc.jpg"

function CollectionPage() {

    return (<>
        <div className="w-100 row d-flex justify-content-center gr">
            <div className="col-12 col-md-6 d-flex justify-content-center ">
                <div className="products-wrap">
                    <div className="h-auto d-flex flex-column justify-content-center">
                        <div className="title">Holder merch</div>
                        <div className="product-counter">16 Products</div>
                    </div>
                    <div className="wrap">
                        <div className=" row">

                            <div className="col-6 col-sm-3 col-md-6 col-lg-3 d-flex justify-content-center">
                                {Product()}
                            </div>
                            <div className="col-6 col-sm-3 col-md-6 col-lg-3 d-flex justify-content-center">
                                {Product()}
                            </div>
                            <div className="col-6 col-sm-3 col-md-6 col-lg-3 d-flex justify-content-center">
                                {Product()}
                            </div>
                            <div className="col-6 col-sm-3 col-md-6 col-lg-3 d-flex justify-content-center">
                                {Product()}
                            </div>
                            <div className="col-6 col-sm-3 col-md-6 col-lg-3 d-flex justify-content-center">
                                {Product()}
                            </div>
                            <div className="col-6 col-sm-3 col-md-6 col-lg-3 d-flex justify-content-center">
                                {Product()}
                            </div>
                            <div className="col-6 col-sm-3 col-md-6 col-lg-3 d-flex justify-content-center">
                                {Product()}
                            </div>
                            <div className="col-6 col-sm-3 col-md-6 col-lg-3 d-flex justify-content-center">
                                {Product()}
                            </div>
                            <div className="col-6 col-sm-3 col-md-6 col-lg-3 d-flex justify-content-center">
                                {Product()}
                            </div>
                            <div className="col-6 col-sm-3 col-md-6 col-lg-3 d-flex justify-content-center">
                                {Product()}
                            </div>
                        </div>
                    </div>
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

export default CollectionPage