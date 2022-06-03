import { useState } from "react";
import "./RuleSet-page-style.scss"
import BasicButton from "../../../components/features/buttons components/basic button/BasicButton";
import ContentWrapper from "../../../components/Structure/content-wrapper/Content-wrapper-component"
import RuleItem from "./rule item component/Rule-item-component"

function RuleSetPage() {


	const rules = [
		{
			name: "rule1",
			rules: [{ address: "addrefasdsafdfsadfasdfassdfsdfsdfsdfsdfsfsfsdffafasdfasfasffasfasfasss11111", type: "NFT" }, { address: "address11111", type: "NFT" }, { address: "address11111", type: "NFT" }]
		},
		{
			name: "rule2",
			rules: [{ address: "addrfasdfasdfassdfasdfasdfasdfasdfsafasffess22222", type: "CONTRACT" }]
		},
		{
			name: "rule3",
			rules: [{ address: "address2sfasasdfasasdfasfdasfasfsasfsadfasfasfas2222", type: "CONTRACT" }]
		},
	]


	return (
		<ContentWrapper>
			<div className="rule-set-page">
				<div className="title">Rules</div>
				<div className="rule-number">10 RuleSet</div>
				<div className="mt-5 mb-5 w-100 d-flex justify-content-center align-items-center">
					<BasicButton text={"Add Rule"} />
				</div>
				{rules.map((rule, i) => {
					return <RuleItem key={i} name={rule.name} rules={rule.rules} />
				})}
			</div>
		</ContentWrapper>
	);
}

export default RuleSetPage;
