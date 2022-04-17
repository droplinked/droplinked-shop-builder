import "./HomeWrapper.scss"

function HomeWrapper ({ children }){

    return(<>

    <div className="main-wrapper">
    { children }
    </div>
    </>)
}

export default HomeWrapper