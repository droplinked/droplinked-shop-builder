import "./PostPage.scss"
import ProfileTopSection from "../../components/features/top section/ProfileTopSection"
import Post from "./Post/Post"
import Collection from "../creator/collection/Collection"

function PostPage(){
    return(<div>
    <ProfileTopSection />
    <Post /> 
    <Collection />
    <Collection />
    </div>)
}

export default PostPage