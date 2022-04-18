import "./SideImage.scss"
import figmaImage1 from "../../../assest/feature/home page images/figmaImage1.png"

function SideImage(){

    return(<>
    <div className="wrapper">
            <img src={figmaImage1} className="outer-image" alt="" />
    </div>
    </>)
}

export default SideImage