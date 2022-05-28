import "./Add-product.page.scss"
import BasicInput from "../../../components/features/input components/basic component/Basic-component"
import BasicDropDown from "../../../components/features/input components/basic dropdown/Basic-dropdown-component"
import InputImageComponent from "../../../components/features/input components/input image component/Input-image-component"

function AddProductPage() {
    return (
        <div className="add-product-page-wrapper">
            <div className="ims-title">Add new merch</div>
            <BasicInput />
            <BasicInput type={"textarea"} />
            <BasicDropDown />
            <div className="mt-5">
                <InputImageComponent />
            </div>
        </div>
    )
}

export default AddProductPage