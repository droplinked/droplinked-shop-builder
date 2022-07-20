import {
  uintCV,
  stringAsciiCV,
  standardPrincipalCV,
} from "@stacks/transactions"
import { openContractCall } from "@stacks/connect"
import { StacksTestnet } from "@stacks/network"
import { createHash } from "crypto-browserify"

import "./Variant-item-component.scss"
import { userSession } from "../../../../services/WalletAuth/auth"

export default function VariantItem({ variant, id, dlt, edit }) {
  console.log(variant)

  const decentrilize = () => {
    console.log("id : ", variant._id)
    console.log("quantity : ", variant.quantity)
    console.log("price : ", variant.price)

    openContractCall({
      contractAddress: "ST3JDMA2CZV5H6YCGMGCR8A3JDZTFV5TVR43FR6F9",
      contractName: "droplinked-beta1",
      network: new StacksTestnet(),
      functionName: "add-product",
      functionArgs: [
        uintCV(variant.price * 1e6),
        uintCV(variant.quantity),
        uintCV(5),
        stringAsciiCV(
          createHash("sha256")
            .update(variant._id + ",FLATLAY")
            .digest("hex")
        ),
        standardPrincipalCV(
          userSession.loadUserData().profile.stxAddress.testnet
        ),
      ],
      onFinish: (data) => {
        console.log(data)
      },
      stxAddress: userSession.loadUserData().profile.stxAddress.testnet,
    })
  }

  return (
    <div className="variant-item-wrapper">
      {variant.options.map((item, i) => {
        return <p key={i}>{`${item.variantName} : ${item.value}`}</p>
      })}
      <p>{`Quantity :  ${variant.quantity}`}</p>
      <p>{`Price : ${variant.price}$`}</p>
      <p>{`ExternalID : ${variant.externalID}`}</p>
      <button className="edit-btn" onClick={decentrilize}>
        decentrilize
      </button>
      {/* <button className="delete-btn" onClick={()=>{dlt(id , variant)}} id={id}>Delete</button> */}
    </div>
  )
}
