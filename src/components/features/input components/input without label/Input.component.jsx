
import "../basic input component/Basic-component.scss"
import { useRef } from "react"

export default function InputNoLabel({ type, refs, text, error, change }) {

    return (
        <>
            {(type == "textarea")
                ?
                <div className="basic-input-component-wrapper">
                    <textarea placeholder="merch description" rows="3" ref={refs} onChange={change}></textarea>
                    {error && <span className="register-error">{`${text} is required`}</span>}
                </div>
                :
                <div className="basic-input-component-wrapper">
                    <input type="text" placeholder={text} ref={refs} onChange={change} />
                    {error && <span className="register-error">{`${text} is required`}</span>}
                </div>
            }
        </>
    )
}