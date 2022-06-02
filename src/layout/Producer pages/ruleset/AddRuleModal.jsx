import React, { useState, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

function AddRuleModal({ handleCloseForm }) {
	const selectItems = ["Nft", "Contract"];
	const [rules, setRules] = useState([]);
	const ruleSetNameInput = useRef(null);
	const [ruleAddressValue, setRuleAddressValue] = useState("");
	const [ruleModeSelect, setRuleModeSelect] = useState("");
	const [ruleObj, setRuleObj] = useState([]);

	const makeRule = () => {
		const myRuleHtml = (
			<div className="d-flex align-items-center justify-content-between flex-row form-group w-100 py-2 ">
				<input
					type="text"
					className="form-control w-75 m-0"
					id="ruleset-input"
					placeholder="Address"
					onChange={(el) => {
						const currentValue = el.currentTarget.value;
						setRuleAddressValue(currentValue);
					}}
				/>

				<select
					className="form-select w-25 mx-2 cursor-pointer"
					style={{
						cursor: "pointer !important",
					}}
					aria-label="Default select example"
					onChange={(v) => {
						const currentMode = v.currentTarget.value;
						setRuleModeSelect(currentMode);
						console.log(ruleModeSelect);
					}}
				>
					<option defaultValue>select</option>

					{selectItems.map((values, i) => (
						<option
							value={values}
							key={values}
							style={{
								cursor: "pointer !important",
							}}
						>
							{values}
						</option>
					))}
				</select>
				<div>
					<button>
						<AiOutlineClose color="red" />
					</button>
				</div>
			</div>
		);
		setRules([...rules, myRuleHtml]);
	};

	return (
		<div className="modal-dialog" role="document">
			<div className="modal-content text-dark bg-white">
				<div className="modal-header">
					<h5 className="modal-title" id="exampleModalLabel">
						Set Ruleset
					</h5>
					<button
						type="button"
						className="close rounded-3 bg-dark text-white"
						data-dismiss="modal"
						aria-label="Close"
						onClick={() => {
							handleCloseForm();
						}}
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="mb-5 p-5">
					<form className="">
						<div className="flex-row form-group w-50">
							<input
								type="text"
								className="form-control"
								id="ruleset-input"
								placeholder="Ruleset Name"
								ref={ruleSetNameInput}
							/>
						</div>
						<div className="py-3">
							<small>
								The customer must meet at least one of the rules listed below
								(OR)
							</small>
						</div>

						{/* rules */}
						{rules.map((rule, i) => {
							return <div key={i}>{rule}</div>;
						})}
					</form>
					<div className="mt-3">
						<button
							className="p-2 rounded-2 text-white bg-main-purple"
							onClick={() => {
								setRuleObj([
									...ruleObj,
									{
										ruleAddress: ruleAddressValue,
										ruleType: ruleModeSelect,
									},
								]);

								setRuleAddressValue("");
								setRuleModeSelect("");
								makeRule();
							}}
						>
							Add Rule
						</button>
					</div>
				</div>
				<div className="modal-footer">
					<button
						type="button"
						className="btn btn-primary bg-main-purple"
						onClick={() => {
							console.log(ruleObj);
							// setRuleObj([
							// 	...ruleObj,
							// 	{
							// 		ruleAddress: ruleAddressValue,
							// 		ruleType: ruleModeSelect,
							// 	},
							// ]);

							// setRuleAddressValue("");
							// setRuleModeSelect("");
						}}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

export default AddRuleModal;
