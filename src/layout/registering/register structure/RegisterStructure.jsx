import "./RegisterStructure.scss"

export default function RegisterStructure({ children }) {

    return (
        <div className="Register-structure-wrapper">
            <div className="Register-structure-body">
                <div className="Register-structure-sidebar">
                    <div className="item">Personal info</div>
                    <div className="item">Shop info</div>
                    <div className="item">Type of IMS</div>
                    <div className="item">Choose a plan</div>
                </div>
                <div className="Register-structure-content">{ children }</div>
            </div>
        </div>
    )
}