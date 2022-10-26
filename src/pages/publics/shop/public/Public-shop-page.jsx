import {EmptyCollectionText ,EmptyCollectionBox} from "../Shop-page-style";


import CollectionsSection from "../Collection-section";

const PublicShopPage = ({shopData , shopName , collections}) => {

      // check if doesnt exist any product in all collections dont show any collection
  const collectionHasProduct = () => {
    if (collections == null) return false;

    let flag = false;
    collections.collections.forEach((collection) => {
      if (collection.products.length > 0) flag = true;
    });
    return flag;
  };


  return (
    <>
      {/* {shopName == "crashpunks" ? (
        // specific design for crahspunk shop and (TopSection) component for another shops
        <>
          <ProfileTopSection />
          <GalleryCarousel />
        </>
      ) : (
        <TopSection
          pic={shopData.logo}
          shopname={shopData.description}
          instagram={shopData.instagramUrl ? shopData.instagramUrl : ""}
          twitter={shopData.twitterUrl ? shopData.twitterUrl : ""}
          discord={shopData.discordUrl ? shopData.discordUrl : ""}
          web={shopData.webUrl ? shopData.webUrl : ""}
        />
      )} */}

      <EmptyCollectionBox>
        {collectionHasProduct() ? (
          //  if doesnt exist any product in all collections show (No collections listed yet!) message
          <>
            <CollectionsSection
              collection={collections}
              shopname={shopName}
              type={shopData.imsType}
            />
          </>
        ) : (
          <EmptyCollectionText>No collections listed yet!</EmptyCollectionText>
        )}
      </EmptyCollectionBox>
    </>
  );
};


export default PublicShopPage