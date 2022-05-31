import "./Basic-dropdown-style.scss"
import { useRef } from "react"

export default function BasicDropDown({ vals, place , cnhg ,id }) {
    return (
        <div className="basic-dropdown-component-wrapper">
            <select name="collection" required  onChange={cnhg} id={id}>
                <option value="none" selected disabled hidden >{place}</option>
                {vals.map((item) => {
                    return <option value={item.name || item.title}>{item}</option>
                })}
            </select>
        </div>
    )
}