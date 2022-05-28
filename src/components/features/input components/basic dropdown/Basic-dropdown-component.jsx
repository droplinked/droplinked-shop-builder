import "./Basic-dropdown-style.scss"

export default function BasicDropDown() {
    return (
        <div className="basic-dropdown-component-wrapper">
            <select name="collection" required>
                <option  value="none" selected disabled hidden>Choose a collection</option>
                <option value="coffee">public merchs</option>
                <option value="tea">collection 1</option>
                <option value="milk">collection 2</option>
            </select>
        </div>
    )
}