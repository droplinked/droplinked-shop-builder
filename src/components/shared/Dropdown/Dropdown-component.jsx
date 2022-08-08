import "./Dropdown-style.scss"

// this component get array like this = [ {id:"" , value:""} , {id:"" , value:""} ] 
//  pair id and value in objects

export default function Dropdown({ change ,pairArray , value , placeholder   }) {

    return (
        <div className="basic-dropdown-component-wrapper">
            <select name="collection" className="w-100" onChange={change}   >
            <option value={value} selected disabled hidden >{placeholder}</option>
                {pairArray.map((item, i) => {
                    return <option key={i} value={item.id} >{item.value}</option>
                })}
            </select>
        </div>
    )
}