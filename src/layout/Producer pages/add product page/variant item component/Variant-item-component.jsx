import "./Variant-item-component.scss"

export default function VariantItem({ vari , id , dlt , edit}) {

    console.log(vari._id);

    return (
        <div className="variant-item-wrapper">
            {vari.options.map(item => {
                let name = (item.variantID == "628df708028da49d3f6a73eb") ? "Size" : "Color";
                return (<p>{`${name} : ${item.value}`}</p>)
            })

            }

            <p>{`Quantity :  ${vari.quantity}`}</p>
            <p>{`Price : ${vari.price}$`}</p>
            <p>{`ExternalID : ${vari.externalID}`}</p>
            {/* <button className="edit-btn"onClick={edit}>edit</button> */}
            <button className="delete-btn" onClick={()=>{dlt(id , vari)}} id={id}>Delete</button>
        </div>
    )
}