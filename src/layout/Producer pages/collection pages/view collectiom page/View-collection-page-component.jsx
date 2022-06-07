import "./View-collection-page-style.scss"
import ProductLarge from "../../../../components/features/product components/product component large/ProductLarge"
import productImg from "./productIms.png"

export default function ViewPageCollection() {

    return (<>
        <div className="view-collcetion-page-wrapper">
            <div className="title">Collection Name</div>
            <div className=" mt-5 d-flex flex-wrap">
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={0} />
                </div>
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={1} />
                </div>
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={2} />
                </div>
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={3} />
                </div>
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={0} />
                </div>
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={1} />
                </div>
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={2} />
                </div>
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={3} />
                </div>
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={0} />
                </div>
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={1} />
                </div>
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={2} />
                </div>
                <div className="col-6 col-md-3 p-1">
                    <ProductLarge title={"product"} price={"100$"} imageUrl={productImg} id={3} />
                </div>
            </div>
        </div>
    </>)
}