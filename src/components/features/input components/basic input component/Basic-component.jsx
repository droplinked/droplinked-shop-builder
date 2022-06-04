import "./Basic-component.scss"
import { useRef } from "react"

export default function BasicInput({ type, refs, text, error, change ,value }) {

    return (
        <>
            {(type == "textarea")
                ?
                <div className="basic-input-component-wrapper">
                    <label>{text}</label>
                    <textarea placeholder="merch description" rows="3" ref={refs} onChange={change}></textarea>
                    {error && <span className="register-error">{`${text} is required`}</span>}
                </div>
                :
                <div className="basic-input-component-wrapper">
                    <label>{text}</label>
                    <input type="text" placeholder={text} ref={refs} onChange={change} value={value} />
                    {error && <span className="register-error">{`${text} is required`}</span>}
                </div>
            }
        </>
    )
}