import "./Variant-item-component.scss"

export default function VariantItem() {

    return (
        <div className="variant-item-wrapper">
            <p>{`size : xl`}</p>
            <p>{`color : blue`}</p>
            <p>{`quantity : 21`}</p>
            <p>{`price : 18$`}</p>
            <p>{`SKU : 45187`}</p>
            <button className="edit-btn">edit</button>
            <button className="delete-btn">delete</button>
        </div>
    )
}