import "./Shop-page-style.scss"
import axios from "axios"
import { useParams } from "react-router-dom";
import { useProfile } from "../../../../sevices/hooks/useProfile"
import ProducerTopSection from "../../../../components/producer component/producer top section/Producer-top-section"

export default function ShopPage() {
    const { profile } = useProfile();
    let { shopname } = useParams();

    return (<>
        <ProducerTopSection
            pic={profile.avatar}
            shopname={profile.shopName}
            insta={profile.instagram}
            twitter={profile.twitter}
            discord={profile.discord}
            web={profile.web} />
    </>)
}