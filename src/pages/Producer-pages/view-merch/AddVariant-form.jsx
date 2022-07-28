import { useState, useEffect } from "react"
import { useToasty } from "../../../context/toastify/ToastContext"
import { addSkuToProduct, updateSku } from "../../../api/producer/Product-api"
import BasicButton from "../../../components/shared/BasicButton/BasicButton"

export default function AddVariantForm({ productId, optionTypes, toggle, defaultSku, updateMerch }) {

    const [options, setOptions] = useState([]);
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [externalID, setExternalID] = useState("");
    const [loading, setLoading] = useState(false);

    const { errorToast } = useToasty();

    useEffect(() => {
        if (defaultSku) {
            setPrice(defaultSku.price)
            setQuantity(defaultSku.quantity)
            setExternalID(defaultSku.externalID)
            setOptions(defaultSku.options)
        } else {
            let optionList = optionTypes.map(opt => { return { ...opt, value: "" } })
            setOptions(optionList)
        }
    }, [])

    console.log(defaultSku);



    const changePrice = (e) => {
        setPrice(e.target.value)
    }

    const changeQuantity = (e) => {
        setQuantity(parseInt(e.target.value))
    }
    const changeExternal = (e) => {
        setExternalID(e.target.value)
    }

    //check all options input
    const CheckOptions = () => {
        options.forEach(opt => {
            if (opt.value == "") { return true }
        })
        return false
    }


    //validation form
    const validationForm = () => {
        if (price == "") {
            errorToast("Price required");
            return true
        }
        if (quantity == "") {
            errorToast("Quantity required");
            return true
        }
        if (CheckOptions()) {
            errorToast("A variant value is required");
            return true
        }
        return false
    }

    const submitvariant = async (e) => {
        e.preventDefault();

        if (validationForm()) return

        let optionsArray = options.map(op => { return { value: op.value, variantID: op.variantID } })
        const newVariant = [{
            price: price,
            externalID: externalID,
            quantity: quantity,
            options: optionsArray
        }]

        setLoading(true)
        let result
        if (defaultSku) {
            result = await updateSku(defaultSku._id , newVariant[0])
        } else {
             result = await addSkuToProduct(productId, newVariant)
        }
        if (result == true) {
            toggle()
            updateMerch()
        } else {
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



    return (<>
        <form className="add-new-variant-form">
            {
                options.map((option, i) => {
                    return (
                        <div className="rw-rp" key={i}>
                            <label>{option.variantName}</label>
                            <input type="text"
                                value={option.value}
                                placeholder={option.variantName}
                                name={option.variantName}
                                id={option.variantID}
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