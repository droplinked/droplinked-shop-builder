import "./Addrule.modal.style.scss"
import { useState } from "react"
import BasicButton from "../../../../components/shared/BasicButton/BasicButton"
import FormInput from "../../../../components/shared/FormInput/FormInput"

import { useToasty } from "../../../../context/toastify/ToastContext"
import { newRule } from "../../../../api/producer/Ruleset-api"


export default function AddRule({ toggle }) {
    const [ruleName, setRuleName] = useState("")
    const [disableBtn, setDisableBtn] = useState(false)
    const [addresslist, setAddressList] = useState([{ index: 0, type: "NFT", address: { contractAddress: "", contractName: "", nftName: "" } }])


    const { errorToast, successToast } = useToasty()


    const changeName = (e) => { setRuleName(e.target.value) }


    const addRule = () => {
        let newAddressList = addresslist.map(item => item)
        newAddressList.push({ index: addresslist.length, type: "NFT", address: "" })
        setAddressList(newAddressList)
    }

    const changeType = ({ index, e }) => {
        let newAddressList = addresslist.map((item, i) => {
            if (i === index) {
                return { ...item, type: e.target.value }
            } else {
                return item
            }
        })
        setAddressList(newAddressList)
    }

    const changeContractAddress = (e, index) => {
        let contractAddress = e.target.value.split(".")
        let newAddressList = addresslist.map((item, i) => {
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
        setAddressList(newAddressList)

    }

    const changeContractName = (e, index) => {
        let contractName = e.target.value.split("::")

        let newAddressList = addresslist.map((item, i) => {
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
        setAddressList(newAddressList)
    }


    const changeNftName = (e, index) => {
        let newAddressList = addresslist.map((item, i) => {
            if (i === index) {
                return { ...item, address: { ...item.address, nftName: e.target.value } }
            } else {
                return item
            }
        })
        setAddressList(newAddressList)
    }


    const submitForm = async () => {

        //check rule name
        if (ruleName == "") {
            errorToast("Please name the rule")
            return
        }

        let flag = true
        // all input be fill 
        addresslist.forEach(({ index, type, address }) => {
            if (address.contractAddress == "" || address.contractName == "") {
                errorToast("Please complete all required fields")
                flag = false
            }
            if (type == "NFT") {
                if (address.nftName == "") {
                    errorToast("Please complete all required fields")
                    flag = false
                }
            }
        })
        if (!flag) return

        let addressArray = []

        addresslist.forEach(({ index, type, address }) => {
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

        let result = await newRule(ruleInfo)
        if (result == true) {
            successToast("Ruleset successfully stored")
            toggle()
        } else {
            errorToast(result)
        }
        setDisableBtn(false)
    }


    const deleteRule = (index) => {
        if (addresslist.length == 1) return
        let newAddressList = addresslist.filter((item, i) => { return (i != index) })
        newAddressList = newAddressList.map((item, i) => { return { ...item, index: i } })
        setAddressList(newAddressList)
    }



    return (
        <div className="add-rule-moda-wrapper">
            <div className="add-rule-moda-body">
                <div className="col-md-4 col-12">
                    <FormInput label={"Rule name"} value={ruleName} changeValue={changeName} />
                </div>
                <div className="w-100 d-flex justify-content-center align-items-center mt-4 mb-4">
                    <p className="text">The customer must meet at least one of the rules listed below (OR)</p>
                </div>
                {addresslist.map(({ index, type, address }) => {
                    return (
                        <>
                            <div className="ruleset-input-container" key={index}>
                                <div className="drop-container">
                                    <p className="delete-btn"
                                        onClick={(e) => { deleteRule(index) }}>X</p>
                                    <select name="" id="" onChange={(e) => { changeType({ index, e }) }}
                                        value={type}
                                    >
                                        <option value="NFT">NFT</option>
                                        <option value="CONTRACT">CONTRACT</option>
                                    </select>

                                </div>
                                <div className="input-container d-flex">
                                    <input type="text" placeholder="Contract address"
                                        onChange={(e) => { changeContractAddress(e, index) }}
                                        value={(address.contractAddress || "")}
                                    />
                                    <p>.</p>
                                    <input type="text" placeholder="Contract name"
                                        value={(address.contractName || "")}
                                        onChange={(e) => { changeContractName(e, index) }}
                                    />

                                    {(type == "NFT") &&
                                        <>
                                            <p>::</p>
                                            <input type="text" placeholder="NFT name"
                                                value={(address.nftName || "")}
                                                onChange={(e) => { changeNftName(e, index) }}
                                            />
                                        </>
                                    }
                                </div>

                            </div>
                        </>


                    )
                })}


                <div className="w-100 d-flex justify-content-center align-items-center">
                    <div className="mt-4" style={{ width: "30%" }}>
                        <BasicButton click={addRule}>Add</BasicButton>
                    </div>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center" style={{ marginTop: "80px" }}>
                    <div style={{ width: "40%" }}>
                        <BasicButton click={toggle} loading={disableBtn} >Cancel</BasicButton>
                    </div>
                    <div style={{ width: "40%" }}>
                        <BasicButton click={submitForm} loading={disableBtn} >Submit</BasicButton>
                    </div>
                </div>
            </div>
        </div>
    )
}



