import "./Variant-item-component.scss"

export default function VariantItem({ variant, id, dlt, edit }) {

    console.log(variant)


    const decentrilize = () => {
        console.log("id : ", variant._id)
        console.log("quantity : ", variant.quantity)
        console.log("price : ", variant.price)
    }



    return (
        <div className="variant-item-wrapper">
            {variant.options.map((item, i) => {
                return (<p key={i}>{`${item.variantName} : ${item.value}`}</p>)
            })
            }
            <p>{`Quantity :  ${variant.quantity}`}</p>
            <p>{`Price : ${variant.price}$`}</p>
            <p>{`ExternalID : ${variant.externalID}`}</p>
            <button className="edit-btn" onClick={decentrilize}>decentrilize</button>
            {/* <button className="delete-btn" onClick={()=>{dlt(id , variant)}} id={id}>Delete</button> */}
        </div>
    )


}