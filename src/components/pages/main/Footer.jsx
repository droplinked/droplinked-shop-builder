import whitelogo from "../../../assest/image/footer/FlatlayLogo.svg"
import "./footer.scss"


export default function Footer(){

    return(<>
    <div className="d-flex justify-content-between"
            style={{ width: "100%", height: "80px", borderTop: "2px solid black" }}
                 >       
                <div className="d-flex row align-items-start justify-content-end"
                 style={{width:"88%" , height:"100%" ,  margin:"auto auto" , border: "1px solid red" }}>
                     <div className="col-12 col-md-4 footer-text d-flex justify-content-between" style={{border: "1px solid blue" }}>
                     <p>droplinked by  <a href="https://flatlay.io/" style={{color:"inherit" , textDecoration:"none" , border: "1px solid green"}}><img src={whitelogo} className="footer-icon" /> </a></p>
                     </div>
    
                 </div>
            
        </div>
    </>)
}