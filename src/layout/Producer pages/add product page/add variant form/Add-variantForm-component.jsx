import { useState } from "react"
import BasicButton from "../../../../components/features/buttons components/basic button/BasicButton"
import { toast } from 'react-toastify';

export default function AddVariantForm({ state, setState, toggle, optionsArray }) {

    const [options, setOptions] = useState([]);
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [externalID, setExternalID] = useState("");

    const submitvariant = (e) => {
        e.preventDefault();
        if (price == "") {
            toast.error("price is required");
            return;
        }
        if (quantity == "") {
            toast.error("quantity is required");
            return;
        }
        if (externalID == "") {
            toast.error("externalID is required");
            return;
        }
        if (options.length != optionsArray.length) {
            toast.error("variants value is required");
            return;
        }
        optionsArray.forEach(option => {
            let opname = (option == "628df708028da49d3f6a73eb") ? "size" : "color";
            options.map(item => {
                if ((item.variantID == option) && (item.value == "")) {
                    toast.error(`${opname} is required`);
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


    const onChangeDropDown = (e) => {
        let optArray = []
        for (const opt of options) {
            optArray.push(opt)
        }
        if (optArray.filter(it => it.variantID == e.target.id).length > 0) {
            optArray.map((item, i) => {
                if (item.variantID == e.target.id) { item.value = e.target.value }
                if (item.value == "") optArray.splice(i, 1)
            })
        } else {
            optArray.push({
                variantID: e.target.id,
                value: e.target.value
            })
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
                    let name = (opt == "628df708028da49d3f6a73eb") ? "size" : "color";
                    return (
                        <div className="rw-rp" id={i}>
                            <label>{name}</label>
                            <input type="text" placeholder={name} id={opt} onChange={onChangeDropDown} />
                        </div>
                    )
                })
            }
            <div className="rw-rp">
                <label>price</label>
                <input type="number" placeholder="100 $" onChange={changePrice} />
            </div>
            <div className="rw-rp">
                <label>quantity</label>
                <input type="number" placeholder="12" onChange={changeQuantity} />
            </div>
            <div className="rw-rp">
                <label>external ID</label>
                <input type="number" placeholder="1794012584" onChange={changeexternal} />
            </div>
            <div className="rw-rp">
                <BasicButton text={"add"} click={submitvariant} style={{ width: "40%" }} />
                <BasicButton text={"cancel"} click={toggle} style={{ width: "40%" }} />
            </div>
        </form>
    </>)

}