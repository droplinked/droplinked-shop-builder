import "./SideImage.scss"
import figmaImage1 from "../../../assest/feature/home page images/figmaImage4.png"
import figmaImage2 from "../../../assest/feature/home page images/figmaImage2.png"

function SideImage(){

    return(<>
    <div className="wrapper">
            <img src={figmaImage1} className="outer-image" alt="" />
            <img src={figmaImage2} className="inner-image" alt="" />
    </div>
    </>)
}

export default SideImage