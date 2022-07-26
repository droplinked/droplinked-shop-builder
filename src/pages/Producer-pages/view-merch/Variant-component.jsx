import {
    uintCV,
    stringAsciiCV,
    standardPrincipalCV,
} from "@stacks/transactions"
import { openContractCall } from "@stacks/connect"
import { StacksTestnet } from "@stacks/network"
import { createHash } from "crypto-browserify"

import { userSession } from "../../../services/wallet-auth/auth"


export default function Variant({ sku }) {

    console.log(sku)

    // const decentrilize = () => {
    //   if (userSession)
    //     openContractCall({
    //       contractAddress: "ST3JDMA2CZV5H6YCGMGCR8A3JDZTFV5TVR43FR6F9",
    //       contractName: "droplinked-beta1",
    //       network: new StacksTestnet(),
    //       functionName: "add-product",
    //       functionArgs: [
    //         uintCV(variant.price * 1e6),
    //         uintCV(variant.quantity),
    //         uintCV(5),
    //         stringAsciiCV(
    //           createHash("sha256")
    //             .update("FLATLAY," + variant._id)
    //             .digest("hex")
    //         ),
    //         standardPrincipalCV(
    //           userSession.loadUserData().profile.stxAddress.testnet
    //         ),
    //       ],
    //       onFinish: (data) => {},
    //       stxAddress: userSession.loadUserData().profile.stxAddress.testnet,
    //     })
    // }

    return (
        <div className="variant-item-wrapper">
            {sku.options.map((option, i) => {
                return <p key={i}>{`${option.variantName} : ${option.value}`}</p>
            })}
            <p>{`Quantity :  ${sku.quantity}`}</p>
            <p>{`Price : ${sku.price}$`}</p>
            {(sku.externalID) && <p>{`ExternalID : ${sku.externalID}`}</p>}
            {/* <button className="edit-btn" onClick={decentrilize}>
                Record
            </button> */}
            {/* <button className="delete-btn" onClick={()=>{dlt(id , variant)}} id={id}>Delete</button> */}
        </div>
    )
}
