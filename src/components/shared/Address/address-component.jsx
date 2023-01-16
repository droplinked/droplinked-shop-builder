import { Flex } from "@chakra-ui/react";
import { useToasty } from "../../../context/toastify/ToastContext";
import { useState } from "react";
import {
  AddressComponentWrapper,
  AddressText,
  AddressLineText,
  ButtonsWrapper,
  ButtonComponent,
} from "./address-style";

import { useApi } from "../../../hooks/useApi/useApi";
import SmallModal from "../../../modals/small/SmallModal";
import AddressModal from "../../../modals/address/AddressModal";
import { deleteAddress } from "../../../api-service/address/addressApiService";

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

  const { successToast } = useToasty();
  const { deleteApi } = useApi();

  // delete button only show if deleteable be true
  const deleteAddressFunc = async () => {
    setDisableBtn(true);
    let result = await deleteApi(deleteAddress(address._id));
    if (result) successToast("Address deleted successfully");
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

  const toggleAddressModal = () => setShowAddressModal((p) => !p);

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

        <SmallModal
          text={`Are you sure you want to delete this address?`}
          show={deleteModal}
          hide={closeDeleteModal}
          click={deleteAddressFunc}
          loading={disableBtn}
          buttonText={"Delete"}
        />

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
