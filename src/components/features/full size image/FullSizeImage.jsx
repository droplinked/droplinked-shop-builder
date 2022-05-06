import "./FullSizeImage.scss"
import closePng from "../../../assest/feature/home page images/Close.png"


export default function FullSizeImage({ image ,close}) {

    return (<>
        <div className="full-size-img-wraper">
            <img className="icon" src={closePng} alt="" onClick={close} />
            <div className="main-img" style={{ backgroundImage: `url(${image})` }}>
            </div>
        </div>
    </>)
}