import "./Input-image-component.scss"
import img1 from "./testimg1.jpg"
import img2 from "./testimg2.jpg"
import { useRef } from "react"

export default function InputImageComponent() {

    const fileRef = useRef(null);

    return (
        <div className="input-images-component-wrapper d-flex">
            <div className="img-item">
                <img src={img1} />
            </div>
            <div className="img-item ">
                <img src={img2} />
            </div>
            <div className="img-item ">
                <img src={img1} />
            </div>
            <div className="img-item ">
                <img src={img2} />
            </div>
            <div className="img-item ">
                <img src={img1} />
            </div>
            <div className="img-item ">
                <div className="input-add-image" 
                onClick={()=>{fileRef.current.click()}}>
                    <p>+ add image</p>
                </div>
            </div>
            <input type="file" className="d-none" ref={fileRef}/>
        </div>
    )
}