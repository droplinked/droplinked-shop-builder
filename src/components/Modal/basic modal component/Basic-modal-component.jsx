import "./Basic-modal-style.scss"


export default function BadicModal({ children }) {

    return (<>
        <div className="basic-modal-wrapper">
            <div className="basic-modal-body">
                {children}
            </div>
        </div>
    </>)
}