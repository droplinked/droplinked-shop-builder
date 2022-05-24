import "./CreatorPage.scss"
import ProfileTopSection from "../../components/features/top section/ProfileTopSection"
import GalleryCarousel from "./gallery carousel/GalleryCarousel"
import Collection from "./collection/Collection"
import axios from "axios"


function CreatorPage() {

    axios.get("https://gamma.io/api/v1/collections/SP3QSAJQ4EA8WXEDSRRKMZZ29NH91VZ6C5X88FGZQ.crashpunks-v2/4307")
    .then(e => console.log(e))

    return (<div className="">
        <ProfileTopSection />
        {/* gallery carusel */}
        <GalleryCarousel />

        {/* gallery carusel */}

        {/* collection  */}
        {/* <Collection name="Public merch" data={false}/> */}
        {/* collection  */}
<div style={{height: '30px'}}></div>
        {/* collection  */}
        <Collection  name="Holder merch"  data={true}/>
        {/* collection  */}

    </div>)
}

export default CreatorPage