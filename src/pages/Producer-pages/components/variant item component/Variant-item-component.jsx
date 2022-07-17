import "./Variant-item-component.scss"

export default function VariantItem({ vari , id , dlt , edit}) {


    return (
        <div className="variant-item-wrapper">
            {vari.options.map((item , i) => {
                return (<p key={i}>{`${item.variantName} : ${item.value}`}</p>)
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