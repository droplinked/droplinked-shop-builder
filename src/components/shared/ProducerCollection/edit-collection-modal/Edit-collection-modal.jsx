import "./Edit-collection-modal-style.scss";

import ModalContainer from "../../../Modal/modal-container/modal-container";
import FormInput from "../../FormInput/FormInput";
import BasicButton from "../../BasicButton/BasicButton";

import { useState, useEffect } from "react";
import { getRules } from "../../../../api/producer/Ruleset-api";
import { useToasty } from "../../../../context/toastify/ToastContext";
import { updateCollection } from "../../../../api/producer/Collection-api";
import { Spinner, Flex } from "@chakra-ui/react";

const EditCollectionModal = ({ collection, close, update }) => {
  const [selectedRule, setSelectedRule] = useState(() => {
    return collection.ruleSetID ? collection.ruleSetID : "";
  });
  const [collectionName, setCollectionName] = useState(collection.title);
  const [Rules, setRules] = useState(null);
  const [loading, setLoading] = useState(false);

  const { errorToast, successToast } = useToasty();

  useEffect(() => {
    getRulesData();
  }, []);

  const getRulesData = async () => {
    let result = await getRules(() => {});
    setRules(result);
  };

  const changeName = (e) => setCollectionName(e.target.value);

  const changeRule = (e) => setSelectedRule(e.target.value);

  const submitForm = async () => {
    if (collectionName == "") {
      errorToast("Collection name required");
      return;
    }

    let RuleInfo = {
      title: collectionName,
      image: "",
      nftImages: [],
      type: selectedRule == "" ? "PUBLIC" : "HOLDER",
    };

    if (selectedRule != "") RuleInfo = { ...RuleInfo, ruleSetID: selectedRule };

    setLoading(true);
    let result = await updateCollection(collection._id, RuleInfo);
    if (result == true) {
      successToast("Collection updated successfully");
      update();
    } else {
      errorToast(result);
    }
    close();
    setLoading(false);
  };

  return (
    <ModalContainer close={close}>
      <div className="add-collection-page-wrapper">
        {/* content */}
        <div className="mt-5">
          <FormInput
            label={"Collection name"}
            value={collectionName}
            changeValue={changeName}
          />
        </div>
        <div className="mt-5 w-100">
          {Rules ? (
            <select onChange={changeRule}>
              <option value="" selected disabled hidden>
                {selectedRule != ""
                  ? Rules.find((rule) => rule._id == selectedRule).name
                  : "Public"}
              </option>
              {Rules.map((rule) => {
                return <option value={rule._id}>{rule.name}</option>;
              })}
              <option value={""}>Public</option>
            </select>
          ) : (
            <Flex w="100%" justifyContent="center">
              <Spinner color="white" size="lg" />
            </Flex>
          )}
        </div>
        {/* content */}
        {/* footer */}
        <div className="d-flex justify-content-between mt-5">
          <div className="col-5">
            <BasicButton click={close} disabled={loading} cancelType={true}>
              Cancel
            </BasicButton>
          </div>
          <div className="col-5">
            <BasicButton click={submitForm} disabled={loading}>
              Submit
            </BasicButton>
          </div>
        </div>
        {/* footer */}
      </div>
    </ModalContainer>
  );
};

export default EditCollectionModal;
