
import { useState, useEffect } from "react"
import { useToasty } from "../../../../context/toastify/ToastContext"
import { updateRule } from "../../../../api/producer/Ruleset-api"

import BasicButton from "../../../../components/shared/BasicButton/BasicButton"
import FormInput from "../../../../components/shared/FormInput/FormInput"


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


    const submitForm = async () => {

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


        let result = await updateRule(RuleId, ruleInfo)
        if (result == true) {
            successToast("RuleSet updated successfully.")
            render(p => !p)
            toggle()
        } else {
            errorToast(result)
        }
        setDisableBtn(false)
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
        let contractAddress = e.target.value.split(".")
        let newAddressList = rules.map((item, i) => {
            if (i === index) {
                if (contractAddress.length == 2) {
                    let contractName = e.target.value.split("::")
                    if (contractName.length == 2) {
                        return { ...item, address: { ...item.address, contractAddress: contractAddress[0], contractName: contractName[0], nftName: contractName[1] } }
                    } else {
                        return { ...item, address: { ...item.address, contractAddress: contractAddress[0], contractName: contractName[0] } }
                    }
                } else {
                    return { ...item, address: { ...item.address, contractAddress: contractAddress[0] } }
                }
            } else {
                return item
            }
        })
        setRules(newAddressList)
    }

    const changeContractName = (e, index) => {
        let contractName = e.target.value.split("::")
        let newAddressList = rules.map((item, i) => {
            if (i === index) {
                if (contractName.length == 2) {
                    return { ...item, address: { ...item.address, contractName: contractName[0], nftName: contractName[1] } }
                } else {
                    return { ...item, address: { ...item.address, contractName: contractName[0] } }
                }

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
                <div className="col-md-4 col-12">
                    <FormInput label={"Rule name"} value={ruleName} changeValue={changeName} />
                </div>
                <div className="w-100 d-flex justify-content-center align-items-center mt-4 mb-4">
                    <p className="text">The customer must meet at least one of the rules listed below (OR)</p>
                </div>


                {(rules) &&
                    rules.map(({ index, type, address }) => {
                        return (
                            <>
                                <div className="ruleset-input-container" key={index}>
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
                    <div className="mt-4" style={{ width: '30%' }}>
                        <BasicButton click={addRule}>Add</BasicButton>
                    </div>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center" style={{ marginTop: "80px" }}>
                    <div style={{ width: '40%' }}>
                        <BasicButton click={toggle} loading={disableBtn}>cancel</BasicButton>
                    </div>
                    <div style={{ width: '40%' }}>
                        <BasicButton click={submitForm} loading={disableBtn}>submit</BasicButton>
                    </div>
                </div>
            </div>
        </div>
    )
}



