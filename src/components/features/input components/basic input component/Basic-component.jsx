import "./Basic-component.scss"
import { useRef } from "react"

export default function BasicInput({ type, refs, text, error, change ,value , place }) {

    return (
        <>
            {(type == "textarea")
                ?
                <div className="basic-input-component-wrapper">
                    <label>{text}</label>
                    <textarea placeholder={place} rows="3" ref={refs} onChange={change}></textarea>
                    {error && <span className="register-error">{`required`}</span>}
                </div>
                :
                <div className="basic-input-component-wrapper">
                    <label>{text}</label>
                    <input type={(type)?type:"text"} placeholder={place} ref={refs} onChange={change} value={value} />
                    {error && <span className="register-error">{`required`}</span>}
                </div>
            }
        </>
    )
}