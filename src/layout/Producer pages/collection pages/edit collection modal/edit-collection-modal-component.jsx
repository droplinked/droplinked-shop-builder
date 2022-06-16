import "../add collection page/Add-collection-style.scss"
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
import { PostApi, GetApiWithAuth , BasicURL } from "../../../../sevices/functoinal-service/CallApiService"
import BasicInput from "../../../../components/features/input components/basic input component/Basic-component"
import AutoWidthButton from "../../../../components/features/buttons components/autow basic button/B-button-component"
import Loading from "../../../../components/features/loading/Loading"
import DropDownPairValId from "../../../../components/features/input components/dropdown pair val and id/Dropdonw-valId-component"
import axios from "axios"
import { useToasty } from "../../../../sevices/hooks/useToastify"

export default function EditCollectionModal({ toggle, submitFunc, defaultValue }) {

    const [rules, setRules] = useState(null);
    const [selectedRule, setSelectedRule] = useState(() => { return (defaultValue.ruleSetID) ? defaultValue.ruleSetID : "" });
    const [collectionName, setCollectionName] = useState(defaultValue.title);
    const [disableBtn, setDisableBtn] = useState(false);
    const [ruleValue, setRuleValue] = useState("")

    const { errorToast , successToast} = useToasty()
    const navigate = useNavigate();


    const token = JSON.parse(localStorage.getItem('token'));


    useEffect(() => {
        if (token == null) { navigate("/") }
        GetApiWithAuth("/producer/ruleset", changeToPairValId, "ruleSets", errorToast)
    }, [])

    // set ruleset dropdown value
    useEffect(() => {
        if (rules) {
            let x = rules.find(rl => rl.id == selectedRule)
            if (x != undefined) {
                setRuleValue(x.value)
            } else {
                setRuleValue("Public")
            }
        }
    }, [rules])


    // build paid valu id form drop down
    const changeToPairValId = (ruleArray) => {
        let newPair = ruleArray.map(rule => { return { id: rule._id, value: rule.name } })
        newPair.unshift({ id: "", value: "Public" })
        setRules(newPair)
    }


    const submitForm = () => {

        if (collectionName == "") {
           errorToast("Collection Name is required");
            return
        }
        if (selectedRule == null) {
            errorToast("Select a rule");
            return
        }
     
        let RuleInfo;
        if (selectedRule == "") {
            RuleInfo = {
                title: collectionName,
                image: "",
                nftImages: [],
                type: "PUBLIC",
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

        axios.put(`${BasicURL}/producer/collection/${defaultValue._id}`,RuleInfo,
        {headers: { Authorization: "Bearer " + token }})
        .then(e =>{
            successToast("Collection updated successfully")
            toggle()
        })
        .catch(e =>{
            errorToast(e.response.data.reason)
            toggle()
        })

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
                        <BasicInput text="Collection Name" value={collectionName} change={changeName} />
                    </div>
                    {/* <div className="mt-5">
                             <InputImageComponent state={Images} setState={setImages} />
                         </div> 
                    */}
                    <div className="mt-5">
                        <DropDownPairValId pairArray={rules} change={changeRule} value={ruleValue} />
                    </div>
                </>
                :
                <Loading />
            }
            <div className="d-flex justify-content-between mt-5">
                <div className="col-5">
                    <AutoWidthButton text={"Cancel"} click={toggle} disable={disableBtn} />
                </div>
                <div className="col-5">
                    <AutoWidthButton text={"Submit"} click={submitForm} disable={disableBtn} />
                </div>
            </div>
        </div>
    )
}