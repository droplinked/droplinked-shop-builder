import "./Addrule.modal.style.scss"
import BasicInput from "../../../../components/features/input components/basic input component/Basic-component"
import InputNoLabel from "../../../../components/features/input components/input without label/Input.component"
import BasicDropDown from "../../../../components/features/input components/basic dropdown/Basic-dropdown-component"
import BasicButton from "../../../../components/features/buttons components/basic button/BasicButton"

export default function AddRule({ toggle }) {

    const x = [{ _id: "1", title: "NFT" }, { _id: "2", title: "Contract" }]
    return (
        <div className="add-rule-moda-wrapper">
            <div className="add-rule-moda-body">
                <div className="input-wrap">
                    <BasicInput text={"Rule name"} />
                </div>
                <div className="w-100 d-flex justify-content-center align-items-center mt-4 mb-4">
                    <p className="text">The customer must meet at least one of the rules listed below (OR)</p>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center mt-4 mb-4">
                    <div style={{ width: '40%' }}>
                        <InputNoLabel text={"address"} />
                    </div>
                    <div style={{ width: '40%' }}>
                        <BasicDropDown valArray={x} place={"choose type"} />
                    </div>
                </div>
                <div className="w-100 d-flex justify-content-center align-items-center">
                    <div className="w-30 mt-4">
                        <BasicButton text="+" />
                    </div>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center mt-5">
                    <div className="w-40">
                        <BasicButton text="submit" click={toggle} />
                    </div>
                    <div className="w-40">
                        <BasicButton text="cancel" click={toggle} />
                    </div>
                </div>

            </div>
        </div>
    )
}