import "./Add-shopify-domain-style.scss"

import BasicInput from "../../../../../components/features/input components/basic input component/Basic-component"
import AutoWidthButton from "../../../../../components/features/buttons components/autow basic button/B-button-component"

export default function AddShopifyComponent() {

    return (<>
        <div className="add-shopify-domain-page">
            <div className="title">Please enter shopify shop domain</div>

            <div className="input-wraper">
                <BasicInput text="Domain" />
            </div>
            <div className="btn-wraper">
                <AutoWidthButton text="Submit" />
            </div>


        </div>
    </>)
}