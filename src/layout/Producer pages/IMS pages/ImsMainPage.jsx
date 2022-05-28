import "./ImsMainPage.scss"
import BasicButton from "../../../components/features/buttons components/basic button/BasicButton"
import SeachBox from "../../../components/features/search box/Search-box-component"
import ProductSmallWrapper from "../../../components/features/product components/product small wrapper/Product-Small-wrapper"


function ImsMainPage() {

    return (<>
        <div className="IMS-page-wrapper">
            <div className="ims-title">Merchs</div>
            <div className="number-of-merchs">12 Merchs</div>
            <div className="w-100 d-flex justify-content-center align-items-center mt-5">
            <BasicButton text={"Add merchs"} />
            </div>
            <div style={{ margin: "15px 0xp" }}>
                <SeachBox />
            </div>

            <ProductSmallWrapper></ProductSmallWrapper>

        </div>
    </>)
}

export default ImsMainPage