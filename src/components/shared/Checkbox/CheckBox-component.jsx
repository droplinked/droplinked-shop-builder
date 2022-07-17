import "./Checkbox-style.scss"

export default function CheckBox({ val ,  children , onch}){
    return (<>
        <label class="checkbox">
            <input type="checkbox" value={val} onChange={(e)=>{onch(e , val , children)}}/>
            <span>{children}</span>
        </label> 
</>)
}