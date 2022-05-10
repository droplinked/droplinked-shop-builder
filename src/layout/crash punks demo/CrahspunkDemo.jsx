
import ProfileTopSection from "../../components/features/top section/ProfileTopSection"
import GalleryCarousel from "../creator/gallery carousel/GalleryCarousel"
import CollectionDemo from "./Demo collection/CollectionDemo"


function CrashpunkDemo() {

    return (<div className="">
        <ProfileTopSection />
        {/* gallery carusel */}
        <GalleryCarousel />
        {/* gallery carusel */}

        {/* collection  */}
        <CollectionDemo name="Holder merch" data={true} />
        {/* collection  */}
        s

    </div>)
}

export default CrashpunkDemo