import { useState, useEffect } from "react"
import { useToasty } from "../../../context/toastify/ToastContext"

import BasicButton from "../../../components/shared/BasicButton/BasicButton"

export default function AddVariantForm({ state, setState, toggle, optionsArray, defaultVariant }) {

    const [options, setOptions] = useState([]);
    const [price, setPrice] = useState((defaultVariant) && defaultVariant.price);
    const [quantity, setQuantity] = useState((defaultVariant) && defaultVariant.quantity);
    const [externalID, setExternalID] = useState((defaultVariant) && defaultVariant.externalID);

    const { errorToast } = useToasty();

    useEffect(() => {
        // initialize options
        if (defaultVariant) {
            setOptions(defaultVariant.options)
        } else {
            let optionsList = optionsArray.map(opt => {
                return {
                    variantID: opt.optionID,
                    variantName: opt.optionName,
                    value: ""
                }
            })
            setOptions(optionsList)
        }

    }, [optionsArray])

    // change options value
    const changeOptions = (e) => {

        let currentOptions = []
        for (var opt of options) currentOptions.push(opt)
        let findOption = currentOptions.find(opt => opt.variantID == e.target.id)
        // if exist this option
        if (findOption) {
            currentOptions = currentOptions.map(opt => {
                if (opt.variantID == e.target.id) {
                    return { ...opt, value: e.target.value }
                }
                else {
                    return { ...opt }
                }
            })
        } // if dosent exist this option
        else {
            currentOptions.push({
                value: e.target.value,
                variantID: e.target.id,
                variantName: e.target.name
            })
        }
        setOptions(currentOptions)
    }

    // check options be match with other variant
    const CheckOptions = () => {
        if (state.length == 0) return false
        if (state[0].options.length != options.length) {
            return true
        }
        let cond = true;
        options.forEach((opt, i) => {
            state[0].options.forEach((st, i) => {
                if (st.variantID == opt.variantID) { cond = false }
            })
        })
        if (cond) return true
        return false
    }

    // validate form 
    const validateForm = () => {
        if (price < 1) {
            errorToast("Price required");
            return true;
        }
        if (quantity < 1) {
            errorToast("Quantity required");
            return true
        }
        if (CheckOptions()) {
            errorToast("A variants options must match those associated with the item");
            return true
        }
        let optionCondition = false
        options.forEach(opt => {
            if (opt.value == "") {
                errorToast(`${opt.variantName} is required`);
                optionCondition = true;
            }
        })
        if (optionCondition) return true
        return false
    }




    const submitvariant = (e) => {
        e.preventDefault();
        // validation
        let validate = validateForm()
        if (validate) return

        const newVariant = {
            price: price,
            externalID: externalID||"",
            quantity: quantity,
            options: options
        }

        let currentVariants = [];
        for (const item of state) {
            currentVariants.push(item)
        }
        if (defaultVariant) {
            currentVariants = currentVariants.map((opt, i) => {
                if (i == defaultVariant.index){
                    return newVariant
                }
                else{
                   return opt
                }
            })
        } else {
            currentVariants.push(newVariant);
        }
        setState(currentVariants);
        toggle();
    }



    const changePrice = (e) => {
        setPrice(parseFloat(e.target.value))
    }

    const changeQuantity = (e) => {
        setQuantity(parseInt(e.target.value))
    }
    const changeexternal = (e) => {
        setExternalID(e.target.value)
    }

    return (<>
        <form className="add-new-variant-form">
            {(options.length > 0) &&
                options.map((option) => {
                    return (
                        <div className="rw-rp" key={option.variantID}>
                            <label>{option.variantName}</label>
                            <input
                                type="text"
                                value={option.value}
                                placeholder={option.variantName}
                                name={option.variantName}
                                id={option.variantID}
                                onChange={changeOptions}
                            />
                        </div>
                    )
                })
            }
            <div className="rw-rp">
                <label>Price</label>
                <input value={(price) && price} type="number" placeholder="100 $" onChange={changePrice} />
            </div>
            <div className="rw-rp">
                <label>Quantity</label>
                <input value={(quantity) && quantity} type="number" placeholder="12" onChange={changeQuantity} />
            </div>
            <div className="rw-rp">
                <label>External ID</label>
                <input value={(externalID) ? externalID : ""} type="text" placeholder="1794012584" onChange={changeexternal} />
            </div>
            <div className="rw-rp">
                <div style={{ width: "40%" }}>
                    <BasicButton click={toggle}>Cancel</BasicButton>
                </div>
                <div style={{ width: "40%" }}>
                    <BasicButton click={submitvariant}>Add</BasicButton>
                </div>
            </div>
        </form>
    </>)

}