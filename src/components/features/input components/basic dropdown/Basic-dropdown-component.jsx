import "./Basic-dropdown-style.scss"
import { useRef } from "react"

export default function BasicDropDown({ valArray, place, cnhg }) {
    return (
        <div className="basic-dropdown-component-wrapper">
            <select name="collection" required onChange={cnhg} >
                <option value="none" selected disabled hidden >{place}</option>
                {valArray.map((item) => {
                    return <option id={item._id} value={item._id}>{item.title}</option>
                })}
            </select>
        </div>
    )
}