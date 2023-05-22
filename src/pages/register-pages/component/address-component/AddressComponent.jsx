import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { IconComponent } from "./AddressComponent-style";
import SmallModal from "../../../../modals/small-modal/SmallModal";
import AddressModal from "../../../../modals/address-modal/AddressModal";
import editIcon from "../../../../assest/icon/edit-icon.svg";
import deleteIcon from "../../../../assest/icon/delete-icon.svg";
import { useApi } from "hooks/useApi/useApi";
import { deleteAddress } from "lib/apis/addressApiService";
import { useLocation } from "react-router-dom";
import useAppToast from "hooks/toast/useToast";

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
  const currentPath = useLocation().pathname;

  const { showToast } = useAppToast()
  const { deleteApi } = useApi();

  // delete button only show if deleteable be true
  const deleteAddressFunc = async () => {
    setDisableBtn(true);
    let result = await deleteApi(deleteAddress(address._id));
    if (result) {
      showToast("Address deleted successfully","success");
      updateList();
    }
    setDisableBtn(false);
    closeDeleteModal();
  };

  // if selectAble be true set address id to selected
  const selectAddress = () => {
    if (selectAble === true) {
      setSelect(address);
    }
  };

  const showDeleteModal = () => setDeleteModal(true);

  const closeDeleteModal = () => setDeleteModal(false);

  const toggleAddressModal = () => setShowAddressModal((p) => !p);

  const isSettings = useMemo(() => {
    return currentPath.includes("settings");
  }, [currentPath]);
  

  return (
    <>
      <TableContainer mb="36px">
        <Table>
          <Thead borderY="1px solid" borderColor="line">
            <Tr>
              {[
                {
                  width: "35%",
                  label: "State",
                },
                {
                  width: "35%",
                  label: "Address",
                },
                {
                  width: "15%",
                  label: "Zip-code",
                },
                {
                  width: "15%",
                  label: "Options",
                },
              ].map((item) => (
                <Th
                  py={4}
                  fontSize="12px"
                  key={item.label}
                  w={item.width}
                  color="white"
                  border="none"
                >
                  {item.label}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr
              sx={{
                "& td": {
                  borderColor: "line",
                  fontFamily: "Avenir Next",
                  fontWeight: "500",
                  fontSize: "12px",
                  color: "#C2C2C2",
                },
              }}
            >
              <Td>
                <Text>
                  {address.country}, {address.state}
                </Text>
              </Td>
              <Td>
                <Text>
                  {address.addressLine1}, {address.city}
                </Text>
              </Td>
              <Td>
                <Text>{address.zip}</Text>
              </Td>
              <Td>
                <Flex alignItems="center" justifyContent="space-around">
                  <IconComponent src={editIcon} onClick={toggleAddressModal} />
                  {!isSettings && <IconComponent src={deleteIcon} onClick={showDeleteModal} />}
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

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
