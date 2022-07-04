import "./Inventory-page-style.scss"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { BasicURL } from "../../../sevices/functoinal-service/CallApiService"

import axios from "axios"
import Loading from "../../../components/shared/loading/Loading"
import DroplinkedImsPage from "./droplinked ims page/droplink-ims-page"


function InventoryPage() {

    const [products, setProdcuts] = useState(null)
    const [shop, setShop] = useState(null)

    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        if (token == null) { navigate("/") }

        let url1 = BasicURL + "/producer/product"
        let url2 = BasicURL + "/profile"

        const requestOne = axios.get(url1, { headers: { Authorization: 'Bearer ' + token } });
        const requestTwo = axios.get(url2, { headers: { Authorization: 'Bearer ' + token } });

        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]
            setProdcuts(responseOne.data.data.products);
            setShop(responseTwo.data.data.shop);
        })).catch(errors => {
            console.log(errors.response.data.reason);
        })

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