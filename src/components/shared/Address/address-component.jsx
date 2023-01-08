import { Flex, Button } from "@chakra-ui/react";
import { useAddress } from "../../../context/address/AddressContext";
import { useState } from "react";
import {
  AddressComponentWrapper,
  AddressText,
  AddressLineText,
  ButtonsWrapper,
  ButtonComponent,
} from "./address-style";
import SmallModal from "../../Modal/Small-modal/Small-modal-component";
import AddressModal from "../../../modals/address/AddressModal";

// (address) formta in props {
//      addressLine1: string
//      addressLine2: string
//      addressType: "CUSTOMER" | SHOP
//      city: string
//      country: string
//      firstname: string
//      lastname: string
//      state: string
//      zip: string
//      _id: id
// }

// if (selectAble) be true can select address by click on component
// and set address id in (setSelect)

// (selected) is address id we seleceted

// if(deleteable) be true ability to remove address

export default function AddressComponent({
  address,
  selected,
  setSelect,
  selectAble,
  deleteable,
}) {
  // state for disable button
  const [disableBtn, setDisableBtn] = useState(false);
  // state for open and close address form
  const [showAddressModal, setShowAddressModal] = useState(false);
  // state for open and close delete modal
  const [deleteModal, setDeleteModal] = useState(false);

  const { deleteAddress } = useAddress();

  // delete button only show if deleteable be true
  const deleteAddressFunc = async () => {
    setDisableBtn(true);
    await deleteAddress(address._id);
    setDisableBtn(false);
    closeDeleteModal();
  };

  // if selectAble be true set address id to selected
  const selectAddress = () => {
    if (selectAble == true) {
      setSelect(address);
    }
  };

  const showDeleteModal = () => setDeleteModal(true);

  const closeDeleteModal = () => setDeleteModal(false);

  const toggleAddressModal = () => setShowAddressModal(p => !p)

  return (
    <>
      <AddressComponentWrapper
        borderColor={
          selectAble == true && address._id == (selected && selected._id)
            ? "primary"
            : "button"
        }
        cursor={selectAble == true ? "pointer" : "auto"}
        onClick={selectAddress}
      >
        {address.addressType != "SHOP" && (
          <AddressText>
            {address.firstname} {address.lastname}
          </AddressText>
        )}

        <AddressText>{address.addressLine1}</AddressText>
        <AddressLineText>
          {address.state}
          {", "}
          {address.city}
          {", "}
          {address.zip}
        </AddressLineText>
        <AddressLineText>{address.country}</AddressLineText>

        <Flex alignItems="center" justifyContent="flex-end">
          <ButtonsWrapper>
            <ButtonComponent bgColor="primary" onClick={toggleAddressModal}>
              Edit
            </ButtonComponent>
            {deleteable == true && (
              <ButtonComponent bgColor="#e74c3c" onClick={showDeleteModal}>
                Delete
              </ButtonComponent>
            )}
          </ButtonsWrapper>
        </Flex>

        {/* delete address modal */}
        {deleteModal && (
          <SmallModal
            text={`Are you sure you want to delete this address?`}
            show={deleteModal}
            hide={closeDeleteModal}
            click={deleteAddressFunc}
            loading={disableBtn}
            buttonText={"Delete"}
          />
        )}
        {/* delete address modal */}
      </AddressComponentWrapper>

      <AddressModal
        show={showAddressModal}
        close={toggleAddressModal}
        addressBook={address}
        type={address.addressType}
      />
    </>
  );
}
