import "./Add-collection-style.scss"
import { useState } from "react"
import BasicInput from "../../../../components/features/input components/basic input component/Basic-component"
import InputImageComponent from "../../../../components/features/input components/input image component/Input-image-component"
import DropDownComp from "../../../../components/features/input components/dropdown with value/dropdown-val-component"
import AutoWidthButton from "../../../../components/features/buttons components/autow basic button/B-button-component"

export default function AddCollectionPage({toggle}) {

    const [Images, setImages] = useState([]);

    const Rules = ["Rule 1", "Rule 2", "Rule 3", "Rule 4"]

    return (
        <div className="add-collection-page-wrapper">
            <div className="title">New Collection</div>
            <div className="mt-5">
                <BasicInput text="Collection Name" />
            </div>
            {/* <div className="mt-5">
                <InputImageComponent state={Images} setState={setImages} />
            </div> */}
            <div className="mt-5">
                <DropDownComp valArray={Rules} />
            </div>
            <div className="d-flex justify-content-between mt-5">
                <div className="col-5">
                    <AutoWidthButton text={"Cansel"} click={toggle}/>
                </div>
                <div className="col-5">
                    <AutoWidthButton text={"Submit"} />
                </div>
            </div>
        </div>
    )
}