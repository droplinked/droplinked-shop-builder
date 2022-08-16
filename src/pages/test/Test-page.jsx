import { useState } from "react"

const Test = () => {

    const [width, setWidth] = useState(400)
    const [height, setHeight] = useState(400)


    return (<>
        <input type="number" value={width} onChange={e => setWidth(e.target.value)} />
        <input type="number" value={height} onChange={e => setHeight(e.target.value)} />
        <div
            style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <div style={{ width: `${width}px`, height: `${height}px`, border: '1px solid #666', display: 'flex', justifyContent: 'center' }}>

                <div style={{ aspectRatio: "1/1", maxWidth: "100%", maxHeight: "100%", border: '1px solid red' }}>
                    <iframe
                        style={{ width: '100%', height: "100%", overflow: 'hidden' }}
                        scrolling="no"
                        title='product'
                        src='http://localhost:3000/collection-iframe/mamrez/62a5ed9c6e3cca39a1e79ba2'
                        allowFullScreeng
                    />
                </div>


            </div>
        </div>
    </>)
}


export default Test