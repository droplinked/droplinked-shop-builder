import "./CheckBox-component.scss"
import { useRef } from "react"

// value and id checkbox
export default function CheckBoxBasic({ val ,  children , onch}) {

    return (<>
            <label class="checkbox">
                <input type="checkbox" value={val} onChange={(e)=>{onch(e , val , children)}}/>
                <span>{children}</span>
            </label> 
    </>)
}