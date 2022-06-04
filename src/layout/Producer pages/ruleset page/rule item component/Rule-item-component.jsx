import "./Rule-item-style.scss"
import EditRule from "../edit rule modal/Edit.Rule.component"
import { useState } from "react"

export default function RuleItem({ name, rules, ruleId , ren}) {
    const [editModal, setEditModal] = useState(false)


    const toggle = () => {
        setEditModal(p => !p)
        ren(p => !p)
    }

    const Edit = () => {
        toggle();
    }

    const Delete = () => {

    }
    return (
        <div className="rule-item-wrapper">
            <div className="name"><p>{name}</p></div>
            {rules.map((rule, i) => {
                return (<div className="w-100 d-flex justify-content-between mt-1 mb-1" key={i}>
                    <p className="address">{rule.address}</p>
                    <p className="nft">{rule.type}</p>
                </div>)
            })}
            <div className="w-100 d-flex justify-content-between mt-4">
                <button className="btn-rule-item" style={{ color: "#fd6060" }} onClick={Delete}>delete</button>
                <button className="btn-rule-item" style={{ color: "#8053ff" }} onClick={Edit}>edit</button>
            </div>
           {editModal && <EditRule toggle={toggle} RuleId={ruleId} RuleName={name} Rule={rules}/>}
        </div>
    )
}