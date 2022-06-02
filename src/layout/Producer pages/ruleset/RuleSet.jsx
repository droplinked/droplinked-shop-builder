import React, { useState } from "react";
// import BasicDropDown from "../../../components/features/input components/basic dropdown/Basic-dropdown-component";
import BasicButton from "../../../components/features/buttons components/basic button/BasicButton";
// import GlobalModal from "./AddRuleModal";
import AddRuleModal from "./AddRuleModal";
import MainWrapper from "../../../components/Structure/page wrapper/MainWrapper";

function RuleSet() {
	const [openCreateForm, setOpenCreateForm] = useState(false);
	// const [closeForm, setCloseForm] = useState(false);

	function handleCloseForm() {
		setOpenCreateForm(false);
		// console.log("close");
	}

	return (
		<MainWrapper>
			<div className="text-center">
				{!openCreateForm && (
					<BasicButton
						text={"create rule set"}
						onClick={() => {
							setOpenCreateForm(true);
						}}
					/>
				)}

				<div className="">
					{openCreateForm && <AddRuleModal handleCloseForm={handleCloseForm} />}
				</div>
			</div>
		</MainWrapper>
	);
}

export default RuleSet;
