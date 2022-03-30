import "./main.scss"
import logo from "../../../assest/shared/Flatlay-Logo.svg"
import { useState , useEffect } from "react"
import modalIcon from "../../../assest/modal/checked.png"

export default function Main(){
    const [modalState , setModalState] = useState(false);

    function toggleModal(){
        //setModalState((pre) => !pre);
    }
    return(<>
        <div  style={{backgroundColor:"#222"}}>
            <div className="header container-fluid">
                    {/* <img src={logo} alt="" className="headerImg  col-5 " /> */}
                    <h1 className="headerText  col-5 " >droplinked</h1>
                    <div  className="d-flex justify-content-between col-5 col-md-3 ">
                    <button className="sign-in btn col-4">Sign in</button>
                    <button className="sign-up btn  col-7">Sign up free</button>
                    </div>
            </div>

        <div className="main container-fluid row ">
        

                <div className="col-12 col-xxl-7 left-side mb-2  align-self-center ">

                            <div style={{padding:"10px"}}>
                                <div className="d-flex flex-column " >


                                <div className="d-flex justify-content-between p-1  col-12 col-md-10 align-self-center   mt-3">
                                     <div className="title ">
                                     Discover, create &amp; connect.
                                        </div>
                                  </div>

                                     <div className="d-flex justify-content-between p-1  col-12 col-md-10 align-self-center   mt-3">
                                         <div className="description">
                                             Distribute collections with your community <br/> to earn more cash &amp; crypto together .
                                          </div>
                                     </div>



                                    <div className="d-flex justify-content-between p-1  col-12 col-md-9 align-self-center  input-cover mt-4">
                                        <div className="col-10  " style={{height:"50px" , paddingTop:"5px"}}>
                                             <span  className="input-span">droplinked.com/ </span>
                                             <input type="text"  placeholder="username" aria-label="Username" aria-describedby="addon-wrapping"/>
                                        </div>
                                     </div>
                                     <div className="d-flex justify-content-between p-1  col-12 col-md-9 align-self-center   input-cover "
                                     style={{marginTop:"70px"}}>
                                        <div className="col-10  " style={{height:"50px" , paddingTop:"5px"}}>
                                             
                                             <input type="text"  placeholder="example@email.com" aria-label="Username" aria-describedby="addon-wrapping"/>
                                        </div>
                                     </div>
                                     <button className="col-11 col-md-9 align-self-center  form-button mt-4"
                                     style={{}}
                                        onClick={()=>{toggleModal()}}
                                     >sign up</button>
                                </div>
                            </div>
                </div>


                <div className="col-12 col-xxl-5 right-side d-flex justify-content-between">
                        <img src='https://www.bitski.com/marketing-images/creator-box.png' alt="" className='right-image' />
                </div>

        </div>
        
        </div>
        {modalState && <SeccessModal toggle={toggleModal}/>}
        </>
    )
}


function SeccessModal(props){

    useEffect(()=>{
        setTimeout(()=>{
            props.toggle();
        },2000)
    },)


    return(
    <div className="modal-main">
            <div className="modal-body">

                <div className="modal-head">
                        <img src={modalIcon} alt="" style={{maxWidth:"100%" , maxHeight:"90%"}}/>
                </div>
                <div className="modal-middle">
                    <h1 >Your account has been created successfully.</h1>
                </div>
            
            </div>
    </div>
    )
}