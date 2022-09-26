import { RuleAddressInput, AddressWrapper } from "./Rule-modal-style";

const RuleAddressComponent = ({type, address, change, index }) => {
  let contractAddress = "";
  let contractName = "";
  let nftName = "";

  let array1 = address.split("::");
  let array2 = array1[1] ? array1[1].split(".") : undefined


  contractAddress = array1[0];
  contractName = array2 ? array2[0] : ""
  nftName =  array2 ? array2[1] : ""

  const changeAddress = (e) => change(e.target.value, index);


  // let contractName = e.target.value.split("::")

  return (
    <AddressWrapper>
      <RuleAddressInput
        value={contractAddress}
        placeholder="Contract address"
        onChange={changeAddress}
      />
      .
      <RuleAddressInput
        value={contractName ? contractName : ""}
        placeholder="Contract name"
      />
      {(type=="NFT") && (
        <>
          ::
          <RuleAddressInput value={nftName} placeholder="NFT name" />
        </>
      )}
    </AddressWrapper>
  );
};

export default RuleAddressComponent;
