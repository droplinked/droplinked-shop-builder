import "./RoleItem.scss"

export default function RoleItem({name , address ,  type , nftType}) {

    return (<>
        <div className="role-item-wrap">
            <div className="d-flex justify-content-between">
                <div className="name-type d-flex justify-content-start" style={{width:"20%" }}>{type}</div>
                <div className="name-type d-flex justify-content-end" style={{width:"80%"}}>{name}</div>
            </div>
            <div className="d-flex justify-content-between">
                <div className="address-text d-flex justify-content-start" style={{width:"20%" }}>{nftType}</div>
                <div className="address-text  d-flex justify-content-end"style={{width:"80%"}}>{address}</div>
            </div>
        </div>
    </>)
}