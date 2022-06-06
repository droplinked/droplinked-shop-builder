
import { useState } from "react"
import BasicInput from "../../../../components/features/input components/basic input component/Basic-component"
import BasicButton from "../../../../components/features/buttons components/basic button/BasicButton"
import InputNoLabel from "../../../../components/features/input components/input without label/Input.component"
import DropDownComp from "../../../../components/features/input components/dropdown with value/dropdown-val-component"
import { toast } from 'react-toastify';
import axios from "axios"


export default function EditRule({ toggle, RuleId, RuleName, Rule }) {
    const [ruleName, setRuleName] = useState(RuleName)
    const [rules, setRules] = useState(Rule)
    const [disableBtn, setDisableBtn] = useState(false)

    const token = JSON.parse(localStorage.getItem('token'));

    const dropVal = ["NFT", "CONTRACT"];

    const changeName = (e) => { setRuleName(e.target.value) }

    const submitForm = () => {
        if (ruleName == "") {
            toast.error("rule name is required")
            return;
        }
        rules.forEach((rule) => {
            if (rule.address == "") {
                toast.error("rule address is required")
                return;
            }
        })

        const ruleInfo = {
            name: ruleName,
            type: "OR",
            rules: rules
        }
        setDisableBtn(true)
        axios.put(`https://api.droplinked.com/dev/producer/ruleset/${RuleId}`, ruleInfo,
            { headers: { Authorization: 'Bearer ' + token } })
            .then(e => {
                setDisableBtn(false)
                toggle();
            })
            .catch(e => {
                setDisableBtn(false)
                console.log(e)
            })

    }

    const addRule = () => {
        let arr = []
        for (const i of rules) {
            arr.push(i)
        }
        arr.push({ address: "", type: "NFT" })
        setRules(arr)
    }

    const changeRuleAddress = (e, i) => {
        let arr = []
        for (const x of rules) {
            arr.push(x)
        }
        arr[i] = { ...arr[i], address: e.target.value }
        setRules(arr)
    }

    const changeNft = (e, i) => {
        let arr = []
        for (const x of rules) {
            arr.push(x)
        }
        arr[i] = { ...arr[i], type: e.target.value }
        setRules(arr)
    }

    const deletRule = (i) => {
        console.log(i);
        let arr = []
        for (const x of rules) {
            arr.push(x)
        }
        arr.splice(i, 1);
        setRules(arr)
    }

    const x = [{ _id: "1", title: "NFT" }, { _id: "2", title: "Contract" }]
    return (
        <div className="add-rule-moda-wrapper">
            <div className="add-rule-moda-body">
                <div className="input-wrap">
                    <BasicInput text={"Rule name"} change={changeName} value={ruleName} />
                </div>
                <div className="w-100 d-flex justify-content-center align-items-center mt-4 mb-4">
                    <p className="text">The customer must meet at least one of the rules listed below (OR)</p>
                </div>
                {rules.map((item, i) => {
                    return (
                        <div key={i} className="w-100 d-flex justify-content-between align-items-center mt-4 mb-4">
                            <div style={{ width: '40%' }}>
                                <InputNoLabel text={"address"} change={(e) => changeRuleAddress(e, i)} value={item.address} />
                            </div>
                            <div style={{ width: '40%' }} className="d-flex">
                                <DropDownComp valArray={dropVal} change={(e) => changeNft(e, i)} value={item.type} />
                                <p className="delete-btn" style={{fontSize:"20px" , margin:"auto"}} onClick={() => deletRule(i)}>X</p>
                            </div>
                        </div>
                    )
                })}


                <div className="w-100 d-flex justify-content-center align-items-center">
                    <div className="w-30 mt-4 " onClick={addRule}>
                        <BasicButton text="Add" />
                    </div>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center" style={{ marginTop: "80px" }}>
                    <div className="w-40">
                        <BasicButton text="cancel" click={toggle} disable={disableBtn} />
                    </div>
                    <div className="w-40">
                        <BasicButton text="submit" click={submitForm} disable={disableBtn} />
                    </div>
                </div>


            </div>
        </div>
    )
}