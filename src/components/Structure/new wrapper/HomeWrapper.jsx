import "./HomeWrapper.scss"

import MainHeader from "../../features/header/MainHeader"
import Footer from "../../features/footer/Footer"

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
        <MainHeader />
        <div className="main-wrapper">
            <Outlet />
        </div>
        <Footer />
    </>)
}

export default HomeWrapper