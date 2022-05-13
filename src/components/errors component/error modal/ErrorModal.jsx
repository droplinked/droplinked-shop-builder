import "./ErrorModal.scss"

export default function ErrorModal({ children }) {

    return (
        <div className="error-modal-wrapper">
            <p>{children}</p>
        </div>)
}