
import "./RuleSet-page-style.scss"

import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import RuleItem from "./rule item component/Rule-item-component"
import AddRule from "./add rule modal/Addrule.modal.component"
import Loading from "../../../components/shared/loading/Loading"

import { useToasty } from "../../../context/toastify/ToastContext"
import { useState, useEffect } from "react";
import { getRules } from "../../../api/producer/Ruleset-api"

function RuleSetPage() {
	const [addRuleModal, setAddRuleModal] = useState(false)
	const [rules, setRules] = useState(null)
	const [render, setRender] = useState(false)

	const { errorToast } = useToasty();


	useEffect(() => {
			const getRuleList = async () =>{
				let result = await getRules(errorToast)
				if(result != null)setRules(result)
			}
			getRuleList()
	},[addRuleModal ,render])

	const modalToggle = () => { setAddRuleModal(p => !p) }

	return (<>
		<div  className="d-flex justify-content-center align-items-center w-100 h-auto " style={{maxWidth:"980px" , margin:"auto"}}>
			<div className="rule-set-page">
				<div className="title">Rulesets</div>
				{(rules) && <div className="rule-number">{rules.length} Rule sets</div>}
				<div className="mt-5 mb-5 w-100 d-flex justify-content-center align-items-center">
					<div className="col-12 col-md-4">
					<BasicButton click={modalToggle}>Add Rule</BasicButton>
					</div>s
				</div>
				{(rules) ?
					<>
						{rules.map((rule, i) => {
							return <RuleItem key={i} name={rule.name} rules={rule.rules} ruleId={rule._id} ren={setRender} />
						})}
					</>
					:
					<Loading />
				}

			</div>
		</div>
		{addRuleModal && <AddRule toggle={modalToggle} />}
	</>
	);
}

export default RuleSetPage;


// toast.success("merch added successfully");