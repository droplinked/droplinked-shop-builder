

export default function ShopifyCard(props){

    

    return(
        <div className="content-wrap d-flex flex-column">
            <div className="img-wrap mr-3">
                <img src={props.product.images[0].src} alt="" />
            </div>
            <div className="info">
               <p className="mt-1 mb-3 title">
                    {props.product.title}   
                </p> 
                <p className="mb-5 price">
                   { props.product.variants[0].formatted_price  }
                </p>
                <div className="row">
                    <div className="col-6">
                        <a className="view-btn">
                            <span>View</span>
                        </a>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-add-collection">
                            Add To Collection
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}