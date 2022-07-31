import { useState } from "react"

const Test = () => {
const [size, setSize] = useState(400)


    return (<>
    <input type="number" value={size} onChange={e =>setSize(e.target.value) } />
    <div
    style={{width:'100%' , height:'100%' , display:'flex' , justifyContent:'center' , alignItems:'center'}}
    >
        <div style={{width:`${size}px` , height:`${size}px` , border:'1px solid #666' , overflow:'hidden' }}>
            <iframe
            style={{width:'100%' , height:"100%"  , overflow:'hidden' }}
            scrolling="no"
                title='product'
                src='https://ngsf.flatlay.io/iframe'
                allowFullScreen
            />
        </div>
        </div>
    </>)
}


export default Test