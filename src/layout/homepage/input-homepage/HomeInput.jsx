import "./HomeInput.scss"

function HomeInput({open}) {


    return (<>
        <div className="d-flex flex-column left-side-wrap">
            <div className="discover">Discover, create <br />&amp; connect.</div>
            <div className="earn">Earn money for sharing collections.</div>
            <div className="signup-wrapper">
                <div
                    className="d-flex justify-content-start"
                    style={{ width: "80%" }}>
                    <span className="item-span">droplinked.com/</span>
                    <input type="text" placeholder="username" className="item-input" />
                </div>
                <button className="item-button" onClick={open}><p>Sign up</p> </button>
            </div>
        </div>
    </>)
}

export default HomeInput