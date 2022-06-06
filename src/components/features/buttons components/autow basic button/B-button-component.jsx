import "./B-button-style.scss"

export default function AutoWidthButton({ text, click, disable, ...otherProps }) {

    return (<button id="auto-button-component" onClick={click}
        disabled={(disable == null) ? false : disable}
        style={{ backgroundColor: `${(disable == true) ? "#4A4A4A" : ""}` }}
        {...otherProps}
    > {text}</button >
    )
}
