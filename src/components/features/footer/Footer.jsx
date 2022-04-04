import whitelogo from "../../../assest/image/footer/FlatlayLogo.svg"
import "./footer.scss"


export default function Footer(){

    return(<>
    <div className="d-flex justify-content-between"
            style={{ width: "100%", height: "80px", borderTop: "1px solid white" }}
                 >       
                <div className="d-flex row align-items-start justify-content-end"
                 style={{width:"88%" , height:"100%" ,  margin:"auto auto"  }}>
                     <div className="col-12 col-md-4 footer-text d-flex justify-content-between" >
                     <p>droplinked by  <a href="https://flatlay.io/" style={{color:"inherit" , textDecoration:"none" }}><img src={whitelogo} className="footer-icon" /> </a></p>
                     </div>
    
                 </div>
            
        </div>
    </>)
}