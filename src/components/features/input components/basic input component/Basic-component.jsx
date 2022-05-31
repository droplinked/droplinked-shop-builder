import "./Basic-component.scss"
import { useRef } from "react"

export default function BasicInput({ type , refs }) {

    return (
        <>
            {(type == "textarea")
                ?
                <div className="basic-input-component-wrapper">
                    <label>merch description</label>
                    <textarea placeholder="merch description"  rows="3" ref={refs}></textarea>
                    <span className="register-error">firstname is required</span>
                </div>
                :
                <div className="basic-input-component-wrapper">
                    <label>merch name</label>
                    <input type="text" placeholder="merch name" ref={refs}/>
                    <span className="register-error">firstname is required</span>
                </div>
            }
        </>
    )
}