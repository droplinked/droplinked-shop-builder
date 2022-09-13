import "./Collection-page-style.scss";

import ModalContainer from "../../../components/Modal/modal-container/modal-container";
import AddCollectionPage from "./add-collection-page/Add-collection-component";
import Loading from "../../../components/shared/loading/Loading";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import ProducerCollection from "../../../components/shared/ProducerCollection/Producre-collection";

import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import { getCollections } from "../../../api/producer/Collection-api";

export default function CollectionMainPage() {
  const [Modal, setModal] = useState(false);
  const [collectins, setCollections] = useState(null);

  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));

  if (token == null) {
    navigate("/");
  }

  const updateCollections = async () => {
    let collections = await getCollections();
    if (collections != null) setCollections(collections);
  };

  useEffect(() => {
    updateCollections();
  }, [Modal]);

  const ToggleModal = () => setModal((p) => !p);


  return (
    <>
      <div className="Collection-page-wrapper">
        <div className="ims-title">Collections</div>
        <div className="number-of-merchs">
          {collectins && collectins.length} Listed
        </div>
        <div className="mt-5 col-12 col-md-3 ">
          <BasicButton click={ToggleModal}>Add collection</BasicButton>
        </div>

        {collectins ? (
          <>
            {collectins.length <= 0 ? (
              <div className="mt-5 col-lg-6 col-md-10 col-12 ">
                <p className="no-collection-text">No Collection</p>
              </div>
            ) : (
              <>
                {collectins.map((collection, i) => {
                  return (
                    <div key={i} className="mt-5 col-lg-6 col-md-10 col-12 ">
                      <ProducerCollection
                        collection={collection}
                        update={updateCollections}
                      />
                    </div>
                  );
                })}
              </>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
      {Modal && (
        <ModalContainer>
          <AddCollectionPage toggle={ToggleModal} />
        </ModalContainer>
      )}
    </>
  );
}
