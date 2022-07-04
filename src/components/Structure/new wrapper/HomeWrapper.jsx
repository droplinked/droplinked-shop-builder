import "./HomeWrapper.scss"


import { Outlet  } from "react-router-dom";
import { useCart } from "../../../sevices/hooks/useCart"
import { useEffect } from "react"

function HomeWrapper({ children }) {
    
    const { updateCart } = useCart();

    let token = JSON.parse(localStorage.getItem("token"));	

    useEffect(() => {
        if(token != null || token != undefined) {
            updateCart();
        }
    },[])

    return (<>
     
        <div className="main-wrapper">
            <Outlet />
        </div>
      
    </>)
}

export default HomeWrapper