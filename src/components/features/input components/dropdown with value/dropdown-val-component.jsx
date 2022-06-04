
import "./dropdown-val-style.scss"

export default function DropDownComp({ change ,valArray  }) {

    return (
        <div className="basic-dropdown-component-wrapper">
            <select name="collection" onChange={change}  >
                {valArray.map((item, i) => {
                    return <option key={i}  value={item} >{item}</option>
                })}
            </select>
        </div>
    )
}