import "./RoleSetPage.scss";
import { useState, useEffect } from "react";
import RoleItem from "./roles/RoleItem";
import { useForm } from "react-hook-form";

export default function RoleSet() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [rules, setRule] = useState([]);
	const [addRule, setAddRule] = useState(false);
	const [ruleCounter, setRuleCounter] = useState([]);

	const addItem = () => {
		let add = [];
		for (let i = 0; i < ruleCounter.length; i++) {
			add.push(ruleCounter[i]);
		}
		add.push(
			<div
				className="add-role-row"
				{...register("rulename", { required: true })}
			>
				<select name="">
					<option value="and">Contract</option>
					<option value="or">NFT</option>
				</select>
				<input
					type="text"
					placeholder="NFT address"
					{...register("address", { required: true })}
				/>
			</div>
		);

		setRuleCounter(add);
	};

	const submitForm = (data) => {
		console.log(data);
		let arr = [];
		for (let i = 0; i < rules.length; i++) {
			arr.push(rules[i]);
		}
		arr.push({
			type: data.andor,
			name: data.rulename,
			address: data.address,
			nftType: data.nftType,
		});
		setRule(arr);
		setAddRule(false);
		setRuleCounter([]);
	};

	return (
		<>
			<div className="row" style={{ paddingRight: "10px" }}>
				<div className="d-flex justify-content-center">
					<div className="col-12 col-md-8 h-auto d-flex justify-content-center flex-column role-set-page-only">
						<div className="nft-header">NFT Rules</div>
						<div className="role-set-page-wrap d-flex flex-column">
							{rules.length === 0 ? (
								<div className="d-flex justify-content-center no-rule-text">
									No rules found
								</div>
							) : (
								<>
									{rules.map((item) => {
										return (
											<RoleItem
												name={item.name}
												address={item.address}
												type={item.type}
												nftType={item.nftType}
											/>
										);
									})}
								</>
							)}
							<div
								className="add-new-role"
								onClick={() => {
									setAddRule(true);
								}}
							>
								+ add new rule
							</div>
						</div>
						{addRule && (
							<div
								className="role-set-page-wrap d-flex flex-column"
								style={{ marginTop: "30px" }}
							>
								<form onSubmit={handleSubmit(submitForm)}>
									<div className="add-role-row">
										<select
											name=""
											placeholder="rule name"
											{...register("andor", { required: true })}
										>
											<option value="and">and</option>
											<option value="or">or</option>
										</select>
										<input
											type="text"
											placeholder="rule name"
											{...register("rulename", { required: true })}
										/>
									</div>
									<div className="add-role-row">
										<select
											name=""
											{...register("nftType", { required: true })}
										>
											<option value="Contract">Contract</option>
											<option value="NFT">NFT</option>
										</select>
										<input
											type="text"
											placeholder="NFT address"
											{...register("address", { required: true })}
										/>
									</div>
									{ruleCounter.map((it) => {
										return it;
									})}

									<div
										className="add-select"
										onClick={() => {
											addItem();
										}}
									>
										+ add
									</div>
									<div className="add-role-row">
										<button
											type="submit"
											// onClick={() => { setAddRule(false); setRuleCounter([]) }}
										>
											Done
										</button>
										<button
											onClick={() => {
												setAddRule(false);
												setRuleCounter([]);
											}}
										>
											cancel
										</button>
									</div>
								</form>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
