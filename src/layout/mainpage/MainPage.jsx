import ProfileTopSection from "../../components/features/top section/ProfileTopSection";
import Box from "../../components/creator-component/Box";
import Header from "../../components/features/old header/Header";
export default function MainPage() {
  return (
    <>
     
        <Header />
        <div id="profile-container">
          <ProfileTopSection />
          <Box />
        </div>
     
    </>
  );


}
