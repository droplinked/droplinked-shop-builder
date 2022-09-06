import Collection from "../../components/shared/Collection/collection-component";

const DroplinkedCollectin = ({ collection ,shopname }) => {
  return (
    <>
      {collection.collections.map((coll, i) => {
        if (coll.products.length > 0)
          return <Collection key={i} collection={coll} shopname={shopname} type={"DROPLINED"} />;
      })}
    </>
  );
};

export default DroplinkedCollectin;

