import "./Add-collection-style.scss"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { PostApi, GetApiWithAuth } from "../../../../sevices/functoinal-service/CallApiService"
import BasicInput from "../../../../components/features/input components/basic input component/Basic-component"
import AutoWidthButton from "../../../../components/features/buttons components/autow basic button/B-button-component"
import Loading from "../../../../components/features/loading/Loading"
import DropDownPairValId from "../../../../components/features/input components/dropdown pair val and id/Dropdonw-valId-component"


export default function AddCollectionPage({ toggle, submitFunc }) {

    const [rules, setRules] = useState(null);
    const [selectedRule, setSelectedRule] = useState(null);
    const [collectionName, setCollectionName] = useState("");
    const [disableBtn, setDisableBtn] = useState(false);

    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem('token'));


    useEffect(() => {
        if (token == null) { navigate("/") }
        GetApiWithAuth("/producer/ruleset", changeToPairValId, "ruleSets", toast.error)
    }, [])


    const changeToPairValId = (ruleArray) => {
        let newPair = ruleArray.map(rule => { return { id: rule._id, value: rule.name } })
        newPair.unshift({ id: "", value: "Public" })
        setRules(newPair)
    }


    const submitForm = () => {

        if (collectionName == "") {
            toast.error("Collection Name is required");
            return
        }
        if (selectedRule == null) {
            toast.error("Select a rule");
            return
        }

        setDisableBtn(true)
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

        PostApi("/producer/collection", RuleInfo, submitFunc)  
        
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
                        <BasicInput text="Collection Name" change={changeName} />
                    </div>
                    {/* <div className="mt-5">
                             <InputImageComponent state={Images} setState={setImages} />
                         </div> 
                    */}
                    <div className="mt-5">
                        <DropDownPairValId pairArray={rules} change={changeRule} value={"Choose Rule"} />
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
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
        </div>
    )
}