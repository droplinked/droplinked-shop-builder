import { useState, useRef } from "react"
import BasicButton from "../../../../components/features/buttons components/basic button/BasicButton"
import BasicDropDown from "../../../../components/features/input components/basic dropdown/Basic-dropdown-component"
export default function AddVariantForm({ state, setState, toggle,  optionsArray }) {

    const [options, setOptions] = useState([]);
    const colorVar = useRef("");
    const sizeVar = useRef("");
    const price = useRef(null);
    const quantity = useRef(null);
    const externalID = useRef(null);


    const submitvariant = (e) => {

        const newVariant = {
            price: price.current.value,
            externalID: externalID.current.value,
            quantity: quantity.current.value,
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
            optArray.map(item => {
                if (item.variantID == e.target.id) { item.value = e.target.value }
            })
        } else {
            optArray.push({
                variantID: e.target.id,
                value: e.target.value
            })
        }
        setOptions(optArray)
    }

    return (<> <form className="add-new-variant-form">

        {
            optionsArray.map((opt) => {
                let name = (opt.variantID == "628df708028da49d3f6a73eb") ? "size" : "color";
                return (<div className="rw-rp">
                    <label>{name}</label>
                    <div style={{ width: '40%' }}>
                        <BasicDropDown vals={opt.valus} id={opt.variantID} place={name} cnhg={onChangeDropDown} />
                    </div>
                </div>)
            })
        }
        <div className="rw-rp">
            <label>price</label>
            <input type="number" placeholder="100 $" ref={price} />
        </div>
        <div className="rw-rp">
            <label>quantity</label>
            <input type="number" placeholder="12" ref={quantity} />
        </div>
        <div className="rw-rp">
            <label>external ID</label>
            <input type="number" placeholder="1794012584" ref={externalID} />
        </div>
        <div className="rw-rp">
            <BasicButton text={"add"} click={submitvariant} style={{ width: "40%" }} />
            <BasicButton text={"cancel"} click={toggle} style={{ width: "40%" }} />
        </div>
    </form>
    </>)

}