import "./Input-image-component.scss"
import img1 from "./testimg1.jpg"
import img2 from "./testimg2.jpg"

export default function InputImageComponent() {

    return (
        <div className="input-images-component-wrapper">
            <div className="img-item col-6 col-md-4">
                <img src={img1} />
            </div>
            <div className="img-item col-6 col-md-4">
                <img src={img2} />
            </div>
            <div className="img-item col-6 col-md-4">
                <img src={img1} />
            </div>
            <div className="img-item col-6 col-md-4">
                <img src={img2} />
            </div>
            <div className="img-item col-6 col-md-4">
                <img src={img1} />
            </div>
            <div className="img-item col-6 col-md-4" style={{border:"1px solid white"}}>
                <p>+ add image</p>
            </div>

        </div>
    )
}