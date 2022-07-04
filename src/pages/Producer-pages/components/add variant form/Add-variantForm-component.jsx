import { useState } from "react"
import { toast } from 'react-toastify';
import { useToasty } from "../../../../sevices/hooks/useToastify"

import BasicButton from "../../../../components/features/buttons components/basic button/BasicButton"

export default function AddVariantForm({ state, setState, toggle, optionsArray }) {

    const [options, setOptions] = useState([]);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState("");
    const [externalID, setExternalID] = useState("");

    const { successToast, errorToast } = useToasty();




    const CheckOptions = () => {
        if(state.length == 0 ) return false  
        if(state[0].options.length != options.length ){
            return true  
        }
        let cond = true ;  
        options.forEach((opt , i) => {            
            state[0].options.forEach((st ,i )=>{
                if(st.variantID == opt.variantID){cond = false}
            })   
        })
        if(cond)return true
        return false
    }


    const submitvariant = (e) => {
        e.preventDefault();
        if (price == "") {
            errorToast("price is required");
            return;
        }
        if (quantity == "") {
            errorToast("quantity is required");
            return;
        }
        if(CheckOptions()){
            errorToast("Merchs must have same options");
            return;  
        }

        if (options.length != optionsArray.length) {
            errorToast("variants value is required");
            return;
        }
        optionsArray.forEach(option => {
            options.map(item => {
                if ((item.variantID == option.optionID) && (item.value == "")) {
                    errorToast(`${option.optionName} is required`);
                    return;
                }
            })
        })
        const newVariant = {
            price: price,
            externalID: externalID,
            quantity: quantity,
            options: options
        }
        let varArr = [];
        for (const item of state) {
            varArr.push(item)
        }
        varArr.push(newVariant);
        setState(varArr);
        toggle();
    }

    // change options value
    const onChangeDropDown = (e) => {
        let optArray = options.map(opt => opt)

        if (optArray.filter(it => it.variantID == e.target.id).length > 0) {
            optArray.map((item, i) => {
                if (item.variantID == e.target.id) item.value = e.target.value
                if (item.value == "") optArray.splice(i, 1)
            })
        } else {
            optArray.push({ variantID: e.target.id, variantName:e.target.name , value: e.target.value })
        }
        setOptions(optArray)
    }



    const changePrice = (e) => {
        setPrice(e.target.value)
    }

    const changeQuantity = (e) => {
        setQuantity(e.target.value)
    }
    const changeexternal = (e) => {
        setExternalID(e.target.value)
    }

    return (<>
        <form className="add-new-variant-form">
            {
                optionsArray.map((opt, i) => {
                    return (
                        <div className="rw-rp" key={i}>
                            <label>{opt.optionName}</label>
                            <input type="text" placeholder={opt.optionName} name={opt.optionName} id={opt.optionID} onChange={onChangeDropDown} />
                        </div>
                    )
                })
            }
            <div className="rw-rp">
                <label>Price</label>
                <input type="number" placeholder="100 $" onChange={changePrice} />
            </div>
            <div className="rw-rp">
                <label>Quantity</label>
                <input type="number" placeholder="12" onChange={changeQuantity} />
            </div>
            <div className="rw-rp">
                <label>External ID</label>
                <input type="number" placeholder="1794012584" onChange={changeexternal} />
            </div>
            <div className="rw-rp">
                <BasicButton text={"Cancel"} click={toggle} style={{ width: "40%" }} />
                <BasicButton text={"Add"} click={submitvariant} style={{ width: "40%" }} />
            </div>
        </form>
    </>)

}