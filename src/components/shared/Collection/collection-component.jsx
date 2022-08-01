
import { Link } from "react-router-dom";
import { useToasty } from "../../../context/toastify/ToastContext"
import Product from "../Product/Product"

export default function Collection({ collection, shopname }) {

    const { successToast } = useToasty()

   let text = `<iframe
            style={{width:'100%' , height:"100%"  , overflow:'hidden' }}
            scrolling="no"
                title='product'
                src='https://ngsf.flatlay.io/iframe'
                allowFullScreen
            />`

    const embed = () => {
        navigator.clipboard.writeText(text).then(function () {
            successToast('Copying to clipboard was successful!');
        }, function (err) {
        });
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="collection-component-wrapper">
                    {/* head */}
                    <div className="d-flex justify-content-between h-auto" >
                        <p className="title">{collection.title}</p>
                        <button
                            className="seemore-btn"
                            onClick={embed}
                        >embed</button>
                        <Link to={`collection/${collection._id}`}>
                            <button className="seemore-btn">see more</button>
                        </Link>
                    </div>
                    {/* head */}
                    {/* content */}
                    <div className="mt-4 d-flex flex-wrap">
                        {collection.products.map((product, i) => {
                            if (i < 4) {
                                return (
                                    <div className="col-6 col-md-3 p-1" key={i}>
                                        <Product
                                            title={product.title}
                                            imageUrl={product.media[0].url}
                                            id={product._id}
                                            shopname={shopname}
                                        />
                                    </div>
                                )
                            }
                        })}
                    </div>
                    {/* content */}
                </div>
            </div>
        </>
    )
}