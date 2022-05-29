import "./Basic-dropdown-style.scss"

export default function BasicDropDown({ vals }) {
    return (
        <div className="basic-dropdown-component-wrapper">
            <select name="collection" required>
                <option value="none" selected disabled hidden>Choose</option>
                {vals.map((item, i) => {
                    return <option value="coffee" id={i}>{item}</option>
                })}
            </select>
        </div>
    )
}