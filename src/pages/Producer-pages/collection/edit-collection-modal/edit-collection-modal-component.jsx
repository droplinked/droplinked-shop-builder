import "../add-collection-page/Add-collection-style.scss"

import { useState, useEffect } from "react"
import {  useNavigate } from "react-router-dom";
import { updateCollection } from "../../../../api/producer/Collection-api"
import { getRules } from "../../../../api/producer/Ruleset-api"
import { useToasty } from "../../../../context/toastify/ToastContext"

import BasicButton from "../../../../components/shared/BasicButton/BasicButton"
import Loading from "../../../../components/shared/loading/Loading"
import Dropdown from "../../../../components/shared/Dropdown/Dropdown-component"
import FormInput from "../../../../components/shared/FormInput/FormInput"

export default function EditCollectionModal({ toggle, submitFunc, defaultValue }) {

    const [rules, setRules] = useState(null);
    const [selectedRule, setSelectedRule] = useState(() => { return (defaultValue.ruleSetID) ? defaultValue.ruleSetID : "" });
    const [collectionName, setCollectionName] = useState(defaultValue.title);
    const [disableBtn, setDisableBtn] = useState(false);
    const [ruleValue, setRuleValue] = useState("")

    const { errorToast , successToast} = useToasty()
    const navigate = useNavigate();


    const token = JSON.parse(localStorage.getItem('token'));

    if (token == null)  navigate("/") 

    useEffect(() => {
      const updateRules = async()=>{
        let result = await getRules(errorToast)
        if(result != null )changeToPairValId(result)
      }
      updateRules()
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


    const submitForm = async() => {

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

        let result = await updateCollection(defaultValue._id , RuleInfo)
        if(result == true){
            successToast("Collection updated successfully")
            toggle()
        }else{
            errorToast(result)
            toggle() 
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
                        <FormInput label={"Collection Name"} value={collectionName} changeValue={changeName}/>
                    </div>
                    {/* <div className="mt-5">
                             <InputImageComponent state={Images} setState={setImages} />
                         </div> 
                    */}
                    <div className="mt-5">
                        <Dropdown value={selectedRule} pairArray={rules} change={changeRule} placeholder={ruleValue} />
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