import logo from "../../assest/shared/Flatlay-Logo.svg"


export default function Header(props){

       
    return(
        <div className="px-xl-5 border-bottom border-grey bg-white">
            <div className="container-fluid px-3 py-3">
                <div className="d-flex flex-row align-items-center justify-content-between">
                    <a className="d-inline-block mr-3">
                        <img src={logo} alt="" />
                    </a>
                    <div className="d-flex flex-row align-items-center ">    
                        <button
                          className="btn btn-outline-secondary text-flatlay-black link2 text-nowrap"
                          onClick={props.action}>
                           {`${props.login ? `signOut` : `login`}`}
                        </button>
                        <button className="btn btn-outline-secondary text-flatlay-black link2 text-nowrap">
                            test
                        </button>
                    </div>
                </div>
            </div>
        </div>
    
   )
}