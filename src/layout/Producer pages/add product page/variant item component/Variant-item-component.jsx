import "./Variant-item-component.scss"

export default function VariantItem({ vari , id , dlt , edit}) {

    return (
        <div className="variant-item-wrapper">
            {vari.options.map(item => {
                let name = (item.variantID == "628df708028da49d3f6a73eb") ? "size" : "color";
                return (<p>{`${name} : ${item.value}`}</p>)
            })

            }

            <p>{`quantity :  ${vari.quantity}`}</p>
            <p>{`price : ${vari.price}$`}</p>
            <p>{`externalID : ${vari.externalID}`}</p>
            {/* <button className="edit-btn"onClick={edit}>edit</button> */}
            <button className="delete-btn" onClick={dlt} id={id}>delete</button>
        </div>
    )
}