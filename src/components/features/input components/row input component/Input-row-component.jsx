import "./Input-row-style.scss"

export default function InputRow({label ,  placeholder}) {

    return (
        <div className="row-input-component-wrapper">
            <label>{label}</label>
            <input type="text" placeholder={`${placeholder}`} />
            <span className="register-error">{`${label} is required`}</span>
        </div>
    )
}