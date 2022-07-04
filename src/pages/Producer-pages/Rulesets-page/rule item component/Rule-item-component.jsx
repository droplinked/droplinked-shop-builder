import "./Rule-item-style.scss"
import EditRule from "../edit rule modal/Edit.Rule.component"
import { useState } from "react"
import SmallModal from "../../../../components/Modal/Small-modal/Small-modal-component"
import axios from "axios"
import { BasicURL } from "../../../../sevices/functoinal-service/CallApiService"
import { useToasty } from "../../../../sevices/hooks/useToastify"

export default function RuleItem({ name, rules, ruleId, ren }) {
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const { successToast, errorToast } = useToasty();

    const token = JSON.parse(localStorage.getItem('token'));

    const toggleEdit = () => { setEditModal(p => !p) }
    const toggleDelete = () => { setDeleteModal(p => !p) }


    const Edit = () => {
        toggleEdit();
    }

    const ClickDelete = () => {
        axios.delete(BasicURL + `/producer/ruleset/${ruleId}`,
            { headers: { Authorization: 'Bearer ' + token } })
            .then(e => {
                successToast("Rule deleted successfully");
                toggleDelete()
                ren(p => !p)
            })
            .catch(e => {
                toggleDelete()
                errorToast(e.response.data.message)
            })


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
                <button className="btn-rule-item" style={{ color: "#fd6060" }} onClick={toggleDelete}>Delete</button>
                <button className="btn-rule-item" style={{ color: "#8053ff" }} onClick={Edit}>Edit</button>
            </div>
            {editModal && <EditRule toggle={toggleEdit} RuleId={ruleId} RuleName={name} Rule={rules} render={ren} />}
            <SmallModal header={"Delete Rule"} show={deleteModal} hide={() => { setDeleteModal(false) }} text={`Are you sure you want to  delete this rule?`} click={ClickDelete} />
        </div>
    )
}