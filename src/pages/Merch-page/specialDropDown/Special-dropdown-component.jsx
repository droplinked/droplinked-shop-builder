

import { useEffect , useState } from "react"

export default function SpcialDropDownComp({ variant , change }) {


    return (
        <div className="basic-dropdown-component-wrapper">
      
            <select  className="w-100" onChange={change} >
          
                {variant.map((item, i) => {
                    return <option key={i}  value={JSON.stringify(item)}>{item.option}</option>
               })}
            </select>
            
        </div>
    )
}