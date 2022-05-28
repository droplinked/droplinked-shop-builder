import "./ImsMainPage.scss"
import BasicButton from "../../../components/features/buttons components/basic button/BasicButton"
import SeachBox from "../../../components/features/search box/Search-box-component"

function ImsMainPage() {

    return (<>
        <div className="IMS-page-wrapper">
            <div className="ims-title">Merchs</div>
            <div className="number-of-merchs">12 Merchs</div>
            <div className="mt-5">
                <BasicButton text={"Add merchs"} />
                <SeachBox />
            </div>
        </div>
    </>)
}

export default ImsMainPage