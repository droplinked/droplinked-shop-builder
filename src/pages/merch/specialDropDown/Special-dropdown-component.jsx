


export default function SpcialDropDownComp({ option, change, index }) {


    return (
        <div className="basic-dropdown-component-wrapper">
            <label className="select-lbl">{option.name}</label>
            <select className="w-100"
                value={option.selected}
                onChange={(e) => { change(e, option.name, index) }} >
                {option.values.map((value, i) => {
                    return <option key={i} value={value}>{value}</option>
                })}
            </select>

        </div>
    )
}