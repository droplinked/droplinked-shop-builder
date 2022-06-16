

import { useEffect , useState } from "react"

export default function SpcialDropDownComp({ change ,valArray , value , place }) {

    const [ren , setRen ]=useState(false)

    useEffect(()=>{
        setRen( p => !p)
        let e ={target:{value:valArray[0]}}
        change(e)
    },[valArray])

    return (
        <div className="basic-dropdown-component-wrapper">
            <select name="collection" className="w-100" onChange={change} value={value} >
            <option value="none" selected disabled hidden >{place}</option>
                {valArray.map((item, i) => {
                    return <option key={i}  value={item}>{item}</option>
                })}
            </select>
        </div>
    )
}