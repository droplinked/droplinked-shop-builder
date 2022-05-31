import "./Variant-item-component.scss"

export default function VariantItem({size , color , quantity , price , externalId}) {

    return (
        <div className="variant-item-wrapper">
            <p>{`size : ${size}`}</p>
            <p>{`color : ${color}`}</p>
            <p>{`quantity :  ${quantity}`}</p>
            <p>{`price : ${price}$`}</p>
            <p>{`externalID : ${externalId}`}</p>
            <button className="edit-btn">edit</button>
            <button className="delete-btn">delete</button>
        </div>
    )
}