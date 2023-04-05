import { Box, Flex } from "@chakra-ui/react";
import { useToasty } from "../../../context/toastify/ToastContext";
import { useState } from "react";
import {
  AddressComponentWrapper,
  Text14,
  LineComponent,
  IconComponent,
} from "./AddressComponent-style";

import { useApi } from "../../../hooks/useApi/useApi";
import { deleteAddress } from "../../../apis/addressApiService";

import SmallModal from "../../../modals/small/SmallModal";
import AddressModal from "../../../modals/address-modal/AddressModal";
import editIcon from "../../../assest/icon/edit-icon.svg";
import deleteIcon from "../../../assest/icon/delete-icon.svg";

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
  updateList,
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
    if (result) {
      successToast("Address deleted successfully");
      updateList();
    }
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
      <AddressComponentWrapper>
        <Flex alignItems="center" gap="24px">
          <Text14>
            {address.country}, {address.state}
          </Text14>
          <LineComponent />
          <Text14>
            {address.addressLine1}, {address.city}
          </Text14>
        </Flex>

        <Flex alignItems="center" gap="24px">
          <LineComponent />
          <Text14>{address.zip}</Text14>
          <Box mr="10px" />
          <IconComponent src={editIcon} onClick={toggleAddressModal} />
          <IconComponent src={deleteIcon} onClick={showDeleteModal} />
        </Flex>
      </AddressComponentWrapper>

      <SmallModal
        text={`Are you sure you want to delete this address?`}
        show={deleteModal}
        hide={closeDeleteModal}
        click={deleteAddressFunc}
        loading={disableBtn}
        buttonText={"Delete"}
      />

      <AddressModal
        show={showAddressModal}
        close={toggleAddressModal}
        addressBook={address}
        type={address.addressType}
        updateAddressList={updateList}
      />
    </>
  );
}

{
  /* {address.addressType != "SHOP" && (
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
        </Flex> */
}

{
  /* delete address modal */
}

{
  /* */
}

{
  /* delete address modal */
}
