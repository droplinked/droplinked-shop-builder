import "./RegisterStructure.scss"

export default function RegisterStructure({ level , children }) {

    return (
        <div className="Register-structure-wrapper">
            <div className="Register-structure-body">
                <div className="Register-structure-sidebar">
                    <div className={`item ${(level=="personalinfo")?"selecteditem":"unselecteditem"}`}>Personal info</div>
                    <div className={`item ${(level=="shopinfo")?"selecteditem":"unselecteditem"}`}>Shop info</div>
                    <div className={`item ${(level=="imstype")?"selecteditem":"unselecteditem"}`}>Type of IMS</div>
                  {/* <div className={`item ${(level=="payment")?"selecteditem":"unselecteditem"}`}>add cart</div> */}
                </div>
                <div className="Register-structure-content">{ children }</div>
            </div>
        </div>
    )
}