import "./Basic-component.scss"

export default function BasicInput({ type }) {

    return (
        <>
            {(type == "textarea")
                ?
                <div className="basic-input-component-wrapper">
                    <label>merch description</label>
                    <textarea placeholder="merch description"  rows="3"></textarea>
                    <span className="register-error">firstname is required</span>
                </div>
                :
                <div className="basic-input-component-wrapper">
                    <label>merch name</label>
                    <input type="text" placeholder="merch name" />
                    <span className="register-error">firstname is required</span>
                </div>
            }
        </>
    )
}