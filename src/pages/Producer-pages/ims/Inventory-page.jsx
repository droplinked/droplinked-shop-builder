import "./Inventory-page-style.scss"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../../api/Producer-apis/Product-api"
import { getShop } from "../../../api/BaseUser-apis/Profile-api"


import Loading from "../../../components/shared/loading/Loading"
import DroplinkedImsPage from "./droplinked ims page/droplink-ims-page"


function InventoryPage() {

    const [products, setProdcuts] = useState(null)
    const [shop, setShop] = useState(null)

    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        if (token == null) { navigate("/") }

        const getData = async () => {
            let pro = await getProducts()
            let sh = await getShop()
            setProdcuts(pro)
            setShop(sh)
        }

        getData()
    }, [])

    return (<>
        <div className="IMS-page-wrapper">
            <div className="ims-title">Merchandise</div>
            <div className="number-of-merchs">{(products != undefined) ? products.length : '0'} Listed</div>

            {(products) ?
                <>
                    {shop &&
                        (shop.imsType == "DROPLINKED")
                        ?
                        < DroplinkedImsPage products={products} />
                        :
                        <></>
                    }
                </>
                :
                <Loading />
            }

        </div>
    </>)
}

export default InventoryPage