import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { useAddress } from "../../../context/address/AddressContext";
import { useState } from "react";
import { AddressComponentWrapper ,AddressText,AddressLineText} from "./address-style"
import SmallModal from "../../Modal/Small-modal/Small-modal-component";
import AddressForm from "../../Modal/Address/Address-modal";

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
  const [openAddressForm, setOpenAddressForm] = useState(false);
  // state for open and close delete modal
  const [deleteModal, setDeleteModal] = useState(false);

  const { deleteAddress } = useAddress();

  // delete button only show if deleteable be true
  const deleteAddressFunc = async () => {
    setDisableBtn(true);
    await deleteAddress(address._id);
    setDisableBtn(false);
    setDeleteModal(false);
  };

  // if selectAble be true set address id to selected
  const selectAddress = () => {
    if (selectAble == true) {
      setSelect(address);
    }
  };

  const showForm = () => setOpenAddressForm(true);

  const closeForm = () => setOpenAddressForm(false);

  const showDeleteModal = () => setDeleteModal(true);

  const closeDeleteModal = () => setDeleteModal(false);

  return (
    <>
      {openAddressForm == false ? (
        <AddressComponentWrapper
          borderColor={
            selectAble == true && address._id == (selected && selected._id)
              ? "#8053ff"
              : "#353535"
          }
          cursor={selectAble == true ? "pointer" : "auto"}
          onClick={selectAddress}
        >
          {address.addressType != "SHOP" ? (
            <AddressText>
              {address.country} - {address.city}, {address.firstname}{" "}
              {address.lastname}
            </AddressText>
          ) : (
            <AddressText>
              {address.country} - {address.city}
            </AddressText>
          )}
          <AddressLineText>
            {address.addressLine1}
          </AddressLineText>
          <AddressLineText>
            {address.state} {address.zip}{" "}
          </AddressLineText>

          <Flex alignItems="center" justifyContent="flex-end">
            <Flex
              alignItems="center"
              flexDirection="row-reverse"
              justifyContent="space-between"
              w={{ base: "45%", md: "40%" }}
            >
              <Button
                bgColor="#8053ff"
                color="#fff"
                w="45%"
                h="35px"
                fontSize={{ base: "12px", md: "16px" }}
                _hover={{ borderColor: "#4d4d4d", color: "#222" }}
                onClick={showForm}
              >
                Edit
              </Button>
              {deleteable == true && (
                <Button
                  bgColor="#e74c3c"
                  color="#fff"
                  w="45%"
                  h="35px"
                  fontSize={{ base: "12px", md: "16px" }}
                  _hover={{ borderColor: "#4d4d4d", color: "#222" }}
                  onClick={showDeleteModal}
                >
                  Delete
                </Button>
              )}
            </Flex>
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
      ) : (
        <AddressForm
          close={closeForm}
          addressBook={address}
          type={address.addressType}
        />
      )}
    </>
  );
}
