import "./Content-wrapper-style.scss"

export default function ContentWrapper({ children }) {
    return (
        <div className="d-flex justify-content-center align-items-center w-100 h-auto">
            <div className="content-wrapper">
                {children}
            </div>
        </div>
    )
}