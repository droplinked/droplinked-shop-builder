import "./mainWrapper.scss";

export default function MainWrapper({children}) {

    return(<>
    <div className="wrapper">
        <div className="main-side">
                <div className="child-wrapper">
                        {children}
                </div>
        </div>
    </div>
    </>)
}