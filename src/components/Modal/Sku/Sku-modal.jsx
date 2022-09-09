import { SkuContent, SkuLable, SkuInput } from "./Sku-modal-style";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Box,
  Flex
} from "@chakra-ui/react";
import AddressComponent from "../../shared/Address/address-component";
import BasicButton from "../../shared/BasicButton/BasicButton";

const exAddress = {
  addressLine1: "string",
  addressLine2: "string",
  addressType: "SHOP",
  city: "string",
  country: "string",
  firstname: "string",
  lastname: "string",
  state: "string",
  zip: "string",
  _id: "id",
};

const SkuModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bgColor="#202020"
          minW={{ base: "90%", md: "700px" }}
          w={{ base: "90%", md: "700px" }}
        >
          <ModalHeader color="#fff" textAlign="center">
            Variant Form
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody w="100%">
            <SkuContent>
              <SkuLable>Size</SkuLable>
              <SkuInput type="text" value={"Xlarge"} placeholder={"Size"} />
            </SkuContent>
            <SkuContent>
              <SkuLable>Color</SkuLable>
              <SkuInput type="text" value={"red"} placeholder={"Color"} />
            </SkuContent>
            <SkuContent>
              <SkuLable>Price</SkuLable>
              <SkuInput type="text" value={"$100"} placeholder={"$100"} />
            </SkuContent>
            <SkuContent>
              <SkuLable>Quantity</SkuLable>
              <SkuInput type="text" value={"15"} placeholder={"15"} />
            </SkuContent>
            <SkuContent>
              <SkuLable>External ID</SkuLable>
              <SkuInput type="text" value={"123456"} placeholder={"123467"} />
            </SkuContent>

            <Text fontSize="18px" color="#fff" fontWeight="600" mb="20px">
              Delivery
            </Text>

            <SkuContent>
              <SkuLable>Length</SkuLable>
              <SkuInput type="text" value={""} placeholder={"10 cm"} />
            </SkuContent>
            <SkuContent>
              <SkuLable>Width</SkuLable>
              <SkuInput type="text" value={""} placeholder={"5 cm"} />
            </SkuContent>
            <SkuContent>
              <SkuLable>Height</SkuLable>
              <SkuInput type="text" value={""} placeholder={"15 cm"} />
            </SkuContent>
            <SkuContent>
              <SkuLable>Weight</SkuLable>
              <SkuInput type="text" value={""} placeholder={"0.5 kg"} />
            </SkuContent>
            <Box mb="60px"></Box>
            <AddressComponent
              address={exAddress}
              selectAble={false}
              deleteable={false}
            />
            <AddressComponent
              address={exAddress}
              selectAble={false}
              deleteable={false}
            />
          </ModalBody>

          <ModalFooter>
            <Flex w="100%" justifyContent="space-between">
              <Box w="40%">
                <BasicButton >Cancel</BasicButton>
              </Box>
              <Box w="40%">
                <BasicButton >Add</BasicButton>
              </Box>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// const SkuModal = () => {
//   return (
//     <ModalWrapper>
//       <ModalContent></ModalContent>
//     </ModalWrapper>
//   );
// };

export default SkuModal;
