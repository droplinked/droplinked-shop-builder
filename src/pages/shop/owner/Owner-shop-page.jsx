import GalleryCarousel from "../../Crashpunks-page/gallery carousel/GalleryCarousel";
import EditableTopSection from "./editable-profile-section/Editable-profile-section"


const OwnerShopPage = ({shopData , shopName ,update, collections}) => {
  return (
    <>
      <EditableTopSection shopData={shopData} shopName={shopName} update={update}/>
    </>
  );
};

export default OwnerShopPage;
