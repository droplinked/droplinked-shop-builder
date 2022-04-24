import "./CollectionPage.scss"
import Product from "../../components/features/product/Product"


function CollectionPage() {

    return (<>
        <div className="w-100 row d-flex justify-content-center gr">
            <div className="col-12 col-md-6 d-flex justify-content-center ">
                <div className="products-wrap">
                    <div className="h-auto d-flex flex-column justify-content-center">
                        <div className="colection-title">Holder merch</div>
                        <div className="product-counter">16 Products</div>
                    </div>
                    <div className="wrap">
                        <div className=" row">
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}



export default CollectionPage