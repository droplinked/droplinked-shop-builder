
import "./dropdown-val-style.scss"

export default function DropDownComp({ change ,valArray , value  }) {

    return (
        <div className="basic-dropdown-component-wrapper">
            <select name="collection" onChange={change} value={value} >
                {valArray.map((item, i) => {
                    return <option key={i}  value={item} >{item}</option>
                })}
            </select>
        </div>
    )
}