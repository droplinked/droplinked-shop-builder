import "./Collection-mainpage-style.scss"
import AutoWidthButton from "../../../../components/features/buttons components/autow basic button/B-button-component"
import CollectionWrapper from "../../../../components/features/collection wrapper/Collection-wrapper-component"
import { Link } from "react-router-dom"
export default function CollectionMainPage({ name }) {

    return (<>
        <div className="Collection-page-wrapper">
            <div className="ims-title">Collections</div>
            <div className="number-of-merchs">2 Collection</div>
            <div className="mt-5 col-12 col-md-3 ">
                <Link to="/producer/collection/addCollection">
                    <AutoWidthButton text={"Add Collection"} />
                </Link>
            </div>
            <div className="mt-5 col-lg-6 col-md-10 col-12 ">
                <CollectionWrapper name={"collection 1"} />
            </div>
            <div className="mt-5 col-lg-6 col-md-10 col-12 ">
                <CollectionWrapper name={"collection 2"} />
            </div>
        </div>
    </>)
}