import "./Checkbox-style.scss"

export default function CheckBox({ value ,  children , change , disabled}){
    return (<>
        <label class="checkbox">
            <input type="checkbox" value={value} onChange={(e)=>{change(e , value , children)}} disabled={disabled} />
            <span disabled={disabled}>{children}</span>
        </label> 
</>)
}