import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


import SeachBox from "../../../../components/features/search box/Search-box-component"
import ProductSmallWrapper from "../../../../components/features/product components/product small wrapper/Product-Small-wrapper"
import ProducerProductComponent from "../../../../components/features/product components/producer product component/Producer-product-component"

export default function ShopifyImsPage() {

    const { search, setSearch } = useState("")


    const hardCose = [
        {
            image: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a3468d1313bdd6449891a374f58cecee6dc88b4057ddf147170b6e22f6f4b1c_st",
            title: "product",
        },
        {
            image: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a3468d1313bdd6449891a374f58cecee6dc88b4057ddf147170b6e22f6f4b1c_st",
            title: "product",
        },
        {
            image: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a3468d1313bdd6449891a374f58cecee6dc88b4057ddf147170b6e22f6f4b1c_st",
            title: "product",
        },
        {
            image: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a3468d1313bdd6449891a374f58cecee6dc88b4057ddf147170b6e22f6f4b1c_st",
            title: "product",
        },
        {
            image: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a3468d1313bdd6449891a374f58cecee6dc88b4057ddf147170b6e22f6f4b1c_st",
            title: "product",
        },
        {
            image: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a3468d1313bdd6449891a374f58cecee6dc88b4057ddf147170b6e22f6f4b1c_st",
            title: "product",
        },
        {
            image: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a3468d1313bdd6449891a374f58cecee6dc88b4057ddf147170b6e22f6f4b1c_st",
            title: "product",
        },
    ]

    return (<>
        <div className="IMS-page-wrapper">
            <div className="ims-title">Merchandise</div>
            <div className="number-of-merchs"> Listed</div>
            <div style={{ margin: "15px 0xp" }}>
                <SeachBox onch={setSearch} />
            </div>
            <ProductSmallWrapper>
                {hardCose.map((item, i) => {
                    return (
                        <div className="col-6 col-md-4 col-lg-3 p-1" key={item.id}>
                            <ProducerProductComponent title={item.title} image={item.image} id={i} />
                        </div>
                    )
                })}
            </ProductSmallWrapper>
        </div>
    </>)
}