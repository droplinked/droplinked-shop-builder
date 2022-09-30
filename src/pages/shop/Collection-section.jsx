import Collection from "../../components/shared/Collection/collection-component";

const CollectionsSection = ({ collection ,shopname , type }) => {
  return (
    <>
      {collection.collections.map((coll, i) => {
        if (coll.products.length > 0)
          return <Collection key={i} collection={coll} shopname={shopname} type={type} />;
      })}
    </>
  );
};

export default CollectionsSection;
