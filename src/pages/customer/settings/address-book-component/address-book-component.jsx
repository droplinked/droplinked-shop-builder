import {
  Flex,
  Box,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { useAddress } from "../../../../context/address/AddressContext";
import { useState } from "react";

import AddressComponent from "../../../../components/shared/Address/address-component";
import AddressModal from "../../../../modals/address/AddressModal";
import Loading from "../../../../components/shared/loading/Loading";

const keyframe_startanimation = keyframes`
0% {
    transform: translateX(-400px);
    opacity: 0;
}
100% {
  transform: translateX(0);
  opacity: 1;
}
`;

export default function AddressBookComponent({ active }) {
  const [addressModal, setAddressModal] = useState(false);

  const { addressList } = useAddress();
  const prefersReducedMotion = usePrefersReducedMotion();

  const startAnimation = prefersReducedMotion
    ? undefined
    : `${keyframe_startanimation}  0.2s linear`;

  const toggleAddressForm = () => setAddressModal((p) => !p);

  return (
    <Box p="0px" w="100%" animation={active == "address" ? startAnimation : ""}>
      {addressList == [] ? (
        <Loading />
      ) : (
        <>
          {addressList.map((address, i) => {
            if (address.addressType != "SHOP") {
              return (
                <AddressComponent key={i} address={address} deleteable={true} />
              );
            } else {
              return <></>;
            }
          })}

          <Box mt="40px"></Box>

          <Flex
            w="100%"
            border="1px"
            borderColor="#fff"
            borderRadius="15px"
            p="24px 20px 16px 20px"
            justifyContent="center"
            alignItems="center"
            color="#fff"
            fontSize="20px"
            fontWeight="600"
            _hover={{ borderColor: "primary", color: "primary" }}
            cursor="pointer"
            onClick={toggleAddressForm}
          >
            + Add new address
          </Flex>
        </>
      )}
      <AddressModal
        show={addressModal}
        close={toggleAddressForm}
        type={"CUSTOMER"}
      />
    </Box>
  );
}
