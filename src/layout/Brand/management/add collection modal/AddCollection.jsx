import "./AddCollection.scss"

export default function AddCollection({ close }) {

    return (<>
        <div className="add-collection-modal-wrap">
            <div className="add-collection-body">
                <div className="d-flex justify-content-between">
                    <input type="text" className="collection-input" placeholder="Collection Name" />
                    <select name="" id="">
                        <option value="">no rule</option>
                        <option value="">rule 1</option>
                        <option value="">rule 2</option>
                    </select>
                </div>
                <div className="add-pro-wrap">
                    <div className="col-6 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center add-colection-item">
                        <p>add product</p>
                    </div>


                </div>
                <div className="d-flex justify-content-between">
                    <button className="add-collection-btn">save</button>
                    <button
                        onClick={close}
                        className="add-collection-btn">cancel</button>
                </div>
            </div>
        </div>

    </>)
}