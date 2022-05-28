import "./BasicButton.scss"

export default function BasicButton({ text, click, disable, ...otherProps }) {

    return (
        <button id="basic-button-component" onClick={click}
            disabled={(disable == null) ? false : disable}
            style={{ backgroundColor: `${(disable == true) ? "#4A4A4A" : ""}` }}
            {...otherProps}
        > {text}</button >
    )
}