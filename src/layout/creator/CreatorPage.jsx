import "./CreatorPage.scss"
import ProfileTopSection from "../../components/features/top section/ProfileTopSection"
import GalleryCarousel from "./gallery carousel/GalleryCarousel"
import Collection from "./collection/Collection"


function CreatorPage() {

    return (<div className="">
        <ProfileTopSection />
        {/* gallery carusel */}
        <GalleryCarousel />

        {/* gallery carusel */}

        {/* collection  */}
        <Collection name="Holder merch" />
        {/* collection  */}

        {/* collection  */}
        <Collection  name="Public merch"/>
        {/* collection  */}
s

    </div>)
}

export default CreatorPage