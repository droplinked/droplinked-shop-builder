import "./Setting.scss"

export default function Settings() {

    return (<>
    <div className="Setting-page-wraper">
        <div className="setting-border">
        <div className="d-flex justify-content-center w-100">
            <div className="add-img">
                <p>add image</p>
            </div>
        </div>
            <div className="d-flex justify-content-between w-100 fl">
                <input type="text" placeholder="First name" className="setting-input " />
                <input type="text" placeholder="Last name" className="setting-input " />
            </div>
            <input type="text" placeholder="Username" className="setting-input w-100" />
            <input type="text" placeholder="Email" className="setting-input w-100" />
            <input type="text" placeholder="Description" className="setting-input w-100" />
            <input type="text" placeholder="Phone number" className="setting-input w-100" />
            <input type="text" placeholder="Web" className="setting-input w-100" />
            <input type="text" placeholder="Instagram" className="setting-input w-100" />
            <input type="text" placeholder="Discord" className="setting-input w-100" />
            <input type="text" placeholder="Twitter" className="setting-input w-100" />
            <div className="d-flex justify-content-between w-100">
                <button className="btn">Save</button>
                <button className="btn">cancel</button>
            </div>
        </div>
    </div>
    </>)
}