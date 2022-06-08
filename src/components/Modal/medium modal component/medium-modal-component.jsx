import "./medium-modal-style.scss"


export default function MediumModal({ children }) {

    return (<>
        <div className="medium-modal-wrapper">
            <div className="medium-modal-body">
                {children}
            </div>
        </div>
    </>)
}