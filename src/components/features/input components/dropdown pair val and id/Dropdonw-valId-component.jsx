
// this component get array like this = [ {id:"" , value:""} , {id:"" , value:""} ] 
//   pair id and value in objects
// and show value and set array 
import "./Dropdonw-valId-style.scss"
export default function DropDownPairValId({ change ,pairArray , value , placeholder   }) {


    return (
        <div className="basic-dropdown-component-wrapper">
            <select name="collection" className="w-100" onChange={change}   >
            <option value="none" selected disabled hidden >{placeholder}</option>
                {pairArray.map((item, i) => {
                    return <option key={i} value={item.id} >{item.value}</option>
                })}
            </select>
        </div>
    )
}