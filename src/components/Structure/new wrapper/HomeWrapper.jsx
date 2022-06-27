import "./HomeWrapper.scss"

import MainHeader from "../../features/header/MainHeader"
import Footer from "../../features/footer/Footer"

import { Outlet  } from "react-router-dom";

function HomeWrapper({ children }) {

    return (<>
        <MainHeader />
        <div className="main-wrapper">
            <Outlet />
        </div>
        <Footer />
    </>)
}

export default HomeWrapper