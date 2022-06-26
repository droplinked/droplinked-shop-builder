
import { useState, useEffect } from "react"
import BasicInput from "../../../../components/features/input components/basic input component/Basic-component"
import BasicButton from "../../../../components/features/buttons components/basic button/BasicButton"
import { useToasty } from "../../../../sevices/hooks/useToastify"
import axios from "axios"
import { BasicURL } from "../../../../sevices/functoinal-service/CallApiService"


export default function EditRule({ toggle, RuleId, RuleName, Rule, render }) {
    const [ruleName, setRuleName] = useState(RuleName)
    const [rules, setRules] = useState(null)
    const [disableBtn, setDisableBtn] = useState(false)

    const token = JSON.parse(localStorage.getItem('token'));
    const { errorToast, successToast } = useToasty()


    useEffect(() => {
        let rulesArray = []
        Rule.forEach((rule, i) => {
            let ruleInfo;
            if (rule.type == "CONTRACT") {
                let contractAddress = rule.address.split(".")[0]
                let contractName = rule.address.split(".")[1]
                ruleInfo = { index: i, type: "CONTRACT", address: { contractAddress: contractAddress, contractName: contractName } }
            } else {
                let contract = rule.address.split("::")[0]
                let nftName = rule.address.split("::")[1]
                let contractAddress = contract.split(".")[0]
                let contractName = contract.split(".")[1]
                ruleInfo = { index: i, type: "NFT", address: { contractAddress: contractAddress, contractName: contractName, nftName: nftName } }
            }
            rulesArray.push(ruleInfo)
        })
        setRules(rulesArray)
    }, [])


    const changeName = (e) => { setRuleName(e.target.value) }


    const submitForm = () => {

        //check rule name
        if (ruleName == "") {
            errorToast("Please enter name for rule.")
            return
        }

        let flag = true
        // all input be fill 
        rules.forEach(({ index, type, address }) => {
            if (address.contractAddress == "" || address.contractName == "") {
                errorToast("Please add fill all input.")
                flag = false
            }
            if (type == "NFT") {
                if (address.nftName == "") {
                    errorToast("Please add fill all input.")
                    flag = false
                }
            }
        })
        if (!flag) return

        let addressArray = []

        rules.forEach(({ index, type, address }) => {
            if (type == "CONTRACT") {
                addressArray.push({ address: (address.contractAddress + "." + address.contractName), type: "CONTRACT" })
            } else {
                addressArray.push({
                    address: (address.contractAddress + "." + address.contractName + "::" + address.nftName)
                    , type: "NFT"
                })
            }
        })

        const ruleInfo = {
            name: ruleName,
            type: "OR",
            rules: addressArray
        }

        setDisableBtn(true)

        axios.put(BasicURL + `/producer/ruleset/${RuleId}`, ruleInfo,
            { headers: { Authorization: 'Bearer ' + token } })
            .then(e => {
                successToast("RuleSet created successfully.")
                setDisableBtn(false)
                render(p => !p)
                toggle()
            })
            .catch(e => {
                setDisableBtn(false)
                errorToast(e.response.data)
            })
    }





    const addRule = () => {
        let newAddressList = rules.map(item => item)
        newAddressList.push({ index: rules.length, type: "NFT", address: "" })
        setRules(newAddressList)
    }

    const changeType = ({ index, e }) => {
        let newAddressList = rules.map((item, i) => {
            if (i === index) {
                return { ...item, type: e.target.value }
            } else {
                return item
            }
        })
        setRules(newAddressList)
    }

    const changeContractAddress = (e, index) => {
        let newAddressList = rules.map((item, i) => {
            if (i === index) {
                return { ...item, address: { ...item.address, contractAddress: e.target.value } }
            } else {
                return item
            }
        })
        setRules(newAddressList)
    }

    const changeContractName = (e, index) => {
        let newAddressList = rules.map((item, i) => {
            if (i === index) {
                return { ...item, address: { ...item.address, contractName: e.target.value } }
            } else {
                return item
            }
        })
        setRules(newAddressList)
    }


    const changeNftName = (e, index) => {
        let newAddressList = rules.map((item, i) => {
            if (i === index) {
                return { ...item, address: { ...item.address, nftName: e.target.value } }
            } else {
                return item
            }
        })
        setRules(newAddressList)
    }

    const deleteRule = (index) => {
        if (rules.length == 1) return
        let newAddressList = rules.filter((item, i) => { return (i != index) })
        newAddressList = newAddressList.map((item, i) => { return { ...item, index: i } })
        setRules(newAddressList)
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


                {(rules) &&
                    rules.map(({ index, type, address }) => {
                        return (
                            <>
                                <div className="ruleset-input-container">
                                    <div className="drop-container">
                                        <p className="delete-btn" style={{ fontSize: "20px", margin: "auto 0px auto 10px" }}
                                            onClick={(e) => { deleteRule(index) }}>X</p>
                                        <select name="" id=""
                                            value={type}
                                            onChange={(e) => { changeType({ index, e }) }}
                                        >
                                            <option value="NFT">NFT</option>
                                            <option value="CONTRACT">CONTRACT</option>
                                        </select>

                                    </div>
                                    <div className="input-container d-flex">
                                        <input type="text" placeholder="Contract address"
                                            value={address.contractAddress}
                                            onChange={(e) => { changeContractAddress(e, index) }}
                                        />
                                        <p>.</p>
                                        <input type="text" placeholder="Contract name"
                                            value={address.contractName}
                                            onChange={(e) => { changeContractName(e, index) }}
                                        />

                                        {(type == "NFT") &&
                                            <>
                                                <p>::</p>
                                                <input type="text" placeholder="NFT name"
                                                    value={address.nftName}
                                                    onChange={(e) => { changeNftName(e, index) }}
                                                />
                                            </>
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    })
                }

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



{/* {rules.map((item, i) => {
                    return (
                        <div key={i} className="w-100 d-flex justify-content-between align-items-center mt-4 mb-4">
                            <div style={{ width: '40%' }}>
                                <InputNoLabel text={"address"} value={item.address} change={(e) => changeRuleAddress(e, i)} />
                            </div>
                            <div style={{ width: '40%' }} className="d-flex">
                                <DropDownComp valArray={dropVal} change={(e) => changeNft(e, i)} value={item.type} />
                                <p className="delete-btn" style={{fontSize:"20px" , margin:"auto 0px auto 10px"}} onClick={() => deletRule(i)}>X</p>
                            </div>
                        </div>
                    )
                })} */}