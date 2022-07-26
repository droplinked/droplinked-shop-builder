import "./Add-collection-style.scss"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useToasty } from "../../../../context/toastify/ToastContext"
import { getRules } from "../../../../api/producer/Ruleset-api"
import { newCollection } from "../../../../api/producer/Collection-api"

import BasicButton from "../../../../components/shared/BasicButton/BasicButton"
import Loading from "../../../../components/shared/loading/Loading"
import Dropdown from "../../../../components/shared/Dropdown/Dropdown-component"
import FormInput from "../../../../components/shared/FormInput/FormInput"

export default function AddCollectionPage({ toggle }) {

    const [rules, setRules] = useState(null);
    const [selectedRule, setSelectedRule] = useState(null);
    const [collectionName, setCollectionName] = useState("");
    const [disableBtn, setDisableBtn] = useState(false);

    const { successToast, errorToast } = useToasty()

    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem('token'));


    useEffect(() => {
        if (token == null) { navigate("/") }

        const updateRules = async () => {
            let result = await getRules(errorToast)
            if (result != null) changeToPairValId(result)
        }

        updateRules()
    }, [])


    const changeToPairValId = (ruleArray) => {
        let newPair = ruleArray.map(rule => { return { id: rule._id, value: rule.name } })
        newPair.unshift({ id: "", value: "Public" })
        setRules(newPair)
    }


    const submitForm = async () => {

        if (collectionName == "") {
            errorToast("Collection name required");
            return
        }
        if (selectedRule == null) {
            errorToast("Assign a ruleset to the collection");
            return
        }


        let RuleInfo;
        if (selectedRule == "") {
            RuleInfo = {
                title: collectionName,
                image: "",
                nftImages: [],
                type: "PUBLIC"
            }
        } else {
            RuleInfo = {
                title: collectionName,
                image: "",
                nftImages: [],
                type: "HOLDER",
                ruleSetID: selectedRule
            }
        }
        setDisableBtn(true)
        let result = await newCollection(RuleInfo)
        if (result == true) {
            successToast("New collection added successfully")
            toggle()
        } else {
            errorToast(result)
        }
        setDisableBtn(false)

    }


    const changeRule = (e) => {
        setSelectedRule(e.target.value);
    }

    const changeName = (e) => {
        setCollectionName(e.target.value);
    }

    return (
        <div className="add-collection-page-wrapper">
            <div className="title">New Collection</div>
            {(rules)
                ?
                <>
                    <div className="mt-5">
                        <FormInput label={"Collection Name"} changeValue={changeName} value={collectionName} />
                    </div>
                    {/* <div className="mt-5">
                             <InputImageComponent state={Images} setState={setImages} />
                         </div> 
                    */}
                    <div className="mt-5">
                        <Dropdown value={selectedRule} pairArray={rules} change={changeRule} placeholder={"Choose Rule"} />
                    </div>
                </>
                :
                <Loading />
            }
            <div className="d-flex justify-content-between mt-5">
                <div className="col-5">
                    <BasicButton click={toggle} disabled={disableBtn}>Cancel</BasicButton>
                </div>
                <div className="col-5">
                    <BasicButton click={submitForm} disabled={disableBtn}>Submit</BasicButton>
                </div>
            </div>
        </div>
    )
}