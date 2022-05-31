import "./CheckBox-component.scss"
import { useRef } from "react"

export default function CheckBoxBasic({ vari , id , children , onch}) {

    return (<>
            <label class="checkbox">
                <input type="checkbox" value={ vari._id } onChange={onch}/>
                <span>{children}</span>
            </label> 
    </>)
}