import "./Checkbox-style.scss"

// this component get id and children for show check Box
// in disable with (disabled) props


export default function CheckBox({ id, children, change, disabled }) {

    return (<>
        <label class="checkbox">
            <input type="checkbox" id={id} value={children} onChange={change} disabled={disabled} />
            <span disabled={disabled}>{children}</span>
        </label>
    </>)

}