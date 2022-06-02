import "./CheckBox-component.scss"
import { useRef } from "react"

export default function CheckBoxBasic({ val ,  children , onch}) {

    return (<>
            <label class="checkbox">
                <input type="checkbox" value={val} onChange={onch}/>
                <span>{children}</span>
            </label> 
    </>)
}