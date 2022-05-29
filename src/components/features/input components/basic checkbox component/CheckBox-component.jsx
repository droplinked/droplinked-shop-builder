import "./CheckBox-component.scss"

export default function CheckBoxBasic({ children }) {

    return (<>
        
            <label class="checkbox">
                <input type="checkbox" />
                <span>{children}</span>
            </label>
       
    </>)
}