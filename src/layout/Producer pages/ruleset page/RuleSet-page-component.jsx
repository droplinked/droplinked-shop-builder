import { useState, useEffect } from "react";
import "./RuleSet-page-style.scss"
import axios from "axios"
import BasicButton from "../../../components/features/buttons components/basic button/BasicButton";
import ContentWrapper from "../../../components/Structure/content-wrapper/Content-wrapper-component"
import RuleItem from "./rule item component/Rule-item-component"
import AddRule from "./add rule modal/Addrule.modal.component"
import Loading from "../../../components/features/loading/Loading"
import { ToastContainer, toast } from 'react-toastify';
import { BasicURL } from "../../../sevices/functoinal-service/CallApiService"
import "react-toastify/dist/ReactToastify.css";

function RuleSetPage() {
	const [addRuleModal, setAddRuleModal] = useState(false)
	const [rules, setRules] = useState(null)
	const [render, setRender] = useState(false)

	const token = JSON.parse(localStorage.getItem('token'));

	useEffect(() => {
		axios.get(BasicURL+"/producer/ruleset",
			{ headers: { Authorization: 'Bearer ' + token } })
			.then(e => { setRules(e.data.data.ruleSets) })
			.catch(e => console.log(e))
	},[addRuleModal ,render])

	const modalToggle = () => {
		setAddRuleModal(p => !p)
	}

	return (<>
		<ContentWrapper>
			<div className="rule-set-page">
				<div className="title">Rulesets</div>
				{(rules) && <div className="rule-number">{rules.length} Rule sets</div>}
				<div className="mt-5 mb-5 w-100 d-flex justify-content-center align-items-center">
					<BasicButton text={"Add Rule"} click={modalToggle} />
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
		</ContentWrapper>
		{addRuleModal && <AddRule toggle={modalToggle} />}
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

	</>
	);
}

export default RuleSetPage;


// toast.success("merch added successfully");