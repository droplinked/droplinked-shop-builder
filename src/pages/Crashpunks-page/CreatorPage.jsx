import "./CreatorPage.scss"
import ProfileTopSection from "./crashpunks top section/ProfileTopSection"
import GalleryCarousel from "./gallery carousel/GalleryCarousel"

import axios from "axios"
import Collection from "../../components/features/collection/Collection"


function CreatorPage() {

    axios.get("https://gamma.io/api/v1/collections/SP3QSAJQ4EA8WXEDSRRKMZZ29NH91VZ6C5X88FGZQ.crashpunks-v2/4307")
        .then(e => console.log(e))

    return (<div className="">
        <ProfileTopSection />
        {/* gallery carusel */}
        <GalleryCarousel />
        {/* gallery carusel */}

        <div style={{ height: '30px' }}></div>

        <Collection />


    </div>)
}

export default CreatorPage