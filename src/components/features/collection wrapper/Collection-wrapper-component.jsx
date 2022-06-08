import "./Collection-wrapper-style.scss"

import ProductLarge from "../product components/product component large/ProductLarge"
import editIcon from '../../../assest/icon/icons8-edit.svg'
import deleteIcon from '../../../assest/icon/icons8-delete.svg'

import { Link } from "react-router-dom"

export default function CollectionWrapper({ id, name, productsArray , editClick , deleteClick  }) {


    return (
        <div className="Collection-wrapper-component">
            <div className="d-flex justify-content-between align-items-center h-auto">
                <div className="name">{name}</div>
                <Link to={`/collection/${id}`}>
                    <button className="collection-btn">View Collection</button>
                </Link>
            </div>
            {(productsArray.length == 0)
                ?
                <div className="d-flex">
                    <p className="text-align-center">No Product</p>
                </div>
                :
                <div className=" mt-4 d-flex flex-wrap">
                    {productsArray.filter((product, i) => {
                        if (i < 4) { return product }
                    }).map((product, i) => {
                        return (<div key={i} className="col-6 col-md-3 p-1">
                            <ProductLarge title={product.title} imageUrl={product.media[0].url} id={product._id} />
                        </div>)
                    })
                    }
                </div>
            }

            <div className="d-flex justify-content-between align-items-center h-auto">
                <img src={editIcon} onClick={editClick} alt="icon" style={{ width: "28px", height: "28px", cursor: "pointer" }} />
                <img src={deleteIcon} onClick={deleteClick} alt="icon" style={{ width: "32px", height: "32px", cursor: "pointer" }} />
            </div>

        </div>
    )
}