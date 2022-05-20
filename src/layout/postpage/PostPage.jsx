import "./PostPage.scss"
import ProfileTopSection from "../../components/features/top section/ProfileTopSection"
import Post from "./Post/Post"
import Collection from "../creator/collection/Collection"

function PostPage(){
    return(<div>
    <ProfileTopSection />
    <Post /> 
    <Collection name="Holder merch" data={true}/>
    <Collection  name="Public merch"/>
    </div>)
}

export default PostPage