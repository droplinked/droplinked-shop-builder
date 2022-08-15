import "./special-dropdown-style.scss"


export default function SpcialDropDownComp({ option, change, index }) {


    return (
        <div className="basic-dropdown-component-wrapper" >
            <label className="select-lbl">{option.name}</label>
            <select className="w-100"
                style={{ border: '1px solid #353536' }}
                value={option.selected}
                onChange={(e) => { change(e, option.name, index) }} >
                {option.values.map((value, i) => {
                    return <option key={i} value={value}>{value}</option>
                })}
            </select>

        </div>
    )
}