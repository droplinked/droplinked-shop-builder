import { useState } from "react"
import { useToasty } from "../../../context/toastify/ToastContext"
import { addSkuToProduct } from "../../../api/producer/Product-api"
import BasicButton from "../../../components/shared/BasicButton/BasicButton"

export default function AddVariantForm({ productId, optionTypes, toggle ,updateMerch }) {

    const [options, setOptions] = useState([]);
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [externalID, setExternalID] = useState("");
    const [loading, setLoading] = useState(false);
    const { errorToast } = useToasty();


    //check all options input
    const CheckOptions = () => {
        options.forEach(opt => {
            if (opt.value == "") { return true }
        })
        return false
    }

    const submitvariant = async (e) => {
        e.preventDefault();
        //validate form
        if (price == "") {
            errorToast("price is required");
            return;
        }
        if (quantity == "") {
            errorToast("quantity is required");
            return;
        }
        if (CheckOptions()) {
            errorToast("Option value is required");
            return;
        }

        let optionsArray = options.map(op => { return { value: op.value, variantID: op.variantID } })
        const newVariant = [{
            price: price,
            externalID: externalID,
            quantity: quantity,
            options: optionsArray
        }]

        setLoading(true)
        let result = await addSkuToProduct(productId, newVariant)
        if(result == true){
            toggle()
            updateMerch()
        }else{
            errorToast(result)
        }
        setLoading(false)
    }

    // change options array
    const chnageOption = (e) => {
        let optionArray = options.map(opt => opt)
        let findOption = optionArray.find(opt => opt.variantID == e.target.id)
        if (findOption) {
            optionArray = optionArray.map(opt => opt.variantID == e.target.id ? { ...opt, value: e.target.value } : opt)
        } else {
            optionArray.push({ variantID: e.target.id, variantName: e.target.name, value: e.target.value })
        }
        setOptions(optionArray)
    }



    const changePrice = (e) => {
        setPrice(e.target.value)
    }

    const changeQuantity = (e) => {
        setQuantity(e.target.value)
    }
    const changeExternal = (e) => {
        setExternalID(e.target.value)
    }

    return (<>
        <form className="add-new-variant-form">
            {
                optionTypes.map((type, i) => {
                    return (
                        <div className="rw-rp" key={i}>
                            <label>{type.variantName}</label>
                            <input type="text"
                                placeholder={type.variantName}
                                name={type.variantName}
                                id={type.variantID}
                                onChange={chnageOption}
                            />
                        </div>
                    )
                })}

            <div className="rw-rp">
                <label>Price</label>
                <input type="number" placeholder="100 $" value={price} onChange={changePrice} />
            </div>
            <div className="rw-rp">
                <label>Quantity</label>
                <input type="number" placeholder="12" value={quantity} onChange={changeQuantity} />
            </div>
            <div className="rw-rp">
                <label>External ID</label>
                <input type="text" placeholder="1794012584" value={externalID} onChange={changeExternal} />
            </div>
            <div className="rw-rp">
                <div style={{ width: "40%" }}>
                    <BasicButton loading={loading} click={toggle}>Cancel</BasicButton>
                </div>
                <div style={{ width: "40%" }}>
                    <BasicButton loading={loading} click={submitvariant}>Add</BasicButton>
                </div>
            </div>
        </form>
    </>)

}