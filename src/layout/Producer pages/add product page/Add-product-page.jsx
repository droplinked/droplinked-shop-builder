import "./Add-product.page.scss"
import { useState } from "react"
import BasicInput from "../../../components/features/input components/basic input component/Basic-component"
import BasicDropDown from "../../../components/features/input components/basic dropdown/Basic-dropdown-component"
import InputImageComponent from "../../../components/features/input components/input image component/Input-image-component"
import CheckBoxBasic from "../../../components/features/input components/basic checkbox component/CheckBox-component"
import VariantItem from "./variant item component/Variant-item-component"
import BasicButton from "../../../components/features/buttons components/basic button/BasicButton"
import InputRow from "../../../components/features/input components/row input component/Input-row-component"

function AddProductPage() {
    const [addvariant, setAddvariant] = useState(false)
    const colors = ["red", "blue", "green", "black"];
    const sizes = ["small", "medium", "xl", "xxl"];
    const collections = ["public merchs", "collecion 1", "collecion 2", "collecion 3"];

    const toggleAddVariant = () => {
        setAddvariant(p => !p)
    }

    return (
        <div className="add-product-page-wrapper">
            <div className="ims-title mb-5">Add new merch</div>
            <BasicInput />
            <BasicInput type={"textarea"} />
            <dir className="drop-wrape">
                <BasicDropDown vals={collections} />
            </dir>
            <div className="mt-5 mb-3 w-100 d-flex justify-content-center align-items-center">
                <InputImageComponent />
            </div>
            <div className="select-variant-wrap mt-4">
                <CheckBoxBasic>color</CheckBoxBasic>
                <CheckBoxBasic>size</CheckBoxBasic>
            </div>
            <div className="mt-5 w-100">
                <VariantItem />
                <VariantItem />
                <VariantItem />
            </div>

            <div className="mt-5 w-100 d-flex justify-content-center align-items-center">
                {(addvariant == false)
                    ?

                    <BasicButton text={"Add variant"} click={toggleAddVariant} />
                    :

                    <form className="add-new-variant-form">
                        <div className="rw-rp">
                            <label>color</label>
                            <div style={{ width: '40%' }}>
                                <BasicDropDown vals={colors} />
                            </div>
                        </div>

                        <div className="rw-rp">
                            <label>size</label>
                            <div style={{ width: '40%' }}>
                                <BasicDropDown vals={sizes} />
                            </div>

                        </div>
                        <div className="rw-rp">
                            <label>size</label>
                            <input type="number" placeholder="100 $" />
                        </div>
                        <div className="rw-rp">
                            <label>quantity</label>
                            <input type="number" placeholder="quantity" />
                        </div>
                        <div className="rw-rp">
                            <label>external ID</label>
                            <input type="number" placeholder="ID" />
                        </div>
                        <div className="rw-rp">
                            <BasicButton text={"add"} click={toggleAddVariant} />
                            <BasicButton text={"cancel"} click={toggleAddVariant} />
                        </div>
                    </form>
                }
            </div>

            <div className="d-flex justify-content-between align-items-center"
            style={{marginTop:"80px" , width:"100%"}}>
                <BasicButton text={"submit"} />
                <BasicButton text={"cancel"} />
            </div>
        </div>
    )
}

export default AddProductPage