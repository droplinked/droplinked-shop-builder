import "./Add-collection-style.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToasty } from "../../../../context/toastify/ToastContext";
import { newCollection } from "../../../../api/producer/Collection-api";

import ModalContainer from "../../../../components/Modal/modal-container/modal-container";
import BasicButton from "../../../../components/shared/BasicButton/BasicButton";
import FormInput from "../../../../components/shared/FormInput/FormInput";

export default function AddCollectionPage({ toggle, close }) {

  const [collectionName, setCollectionName] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const { successToast, errorToast } = useToasty();

  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (token == null) {
      navigate("/");
    }

  }, []);


  const submitForm = async () => {

    if (collectionName == "") {
      errorToast("Collection name required");
      return;
    }

    setDisableBtn(true);
    let result = await newCollection(collectionName);
    if (result == true) {
      successToast("New collection added successfully");
      toggle();
    } else {
      errorToast(result);
    }
    setDisableBtn(false);
  };

  const changeName = (e) => setCollectionName(e.target.value);


  return (
    <ModalContainer close={close}>
      <div className="add-collection-page-wrapper">
        <div className="title">New collection</div>
        <div className="mt-5">
          <FormInput
            label={"Collection name"}
            changeValue={changeName}
            value={collectionName}
          />
        </div>
        <div className="d-flex justify-content-between mt-5">
          <div className="col-5">
            <BasicButton click={close} loading={disableBtn} cancelType={true}>
              Cancel
            </BasicButton>
          </div>
          <div className="col-5">
            <BasicButton click={submitForm} loading={disableBtn}>
              Submit
            </BasicButton>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}
