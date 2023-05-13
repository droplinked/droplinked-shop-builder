import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Image,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
//
import searchIcon from "assest/icon/search-icon.svg";
import downArrowIcon from "assest/icon/down-arrow-icon.svg";
import CollectionModal from "modals/collection-modal/CollectionModal";
import BasicButton from "components/shared/BasicButton/BasicButton";

const PageHeader = ({ searchValue, setSearchValue, updateCollaction }) => {

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((p) => !p);

  return (
    <Flex w="100%" justifyContent="space-between" alignItems="center" mb="24px">
      <Stack direction="row" spacing={4}>
        <InputGroup w="200px">
          <InputLeftElement
            pointerEvents="none"
            children={<Image src={searchIcon} h="16px" w="16px" />}
          />
          <Input
            p="8px 36px"
            borderRadius="24px"
            border="1px solid"
            borderColor="line"
            fontFamily="Avenir Next"
            fontWeight="400"
            fontSize="sm"
            color="#C2C2C2"
            placeholder="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </InputGroup>
      </Stack>

      <BasicButton
        onClick={toggleModal}
      >
        Add Collection
      </BasicButton>
      <CollectionModal
        show={showModal}
        close={toggleModal}
        update={updateCollaction}
      />
    </Flex>
  );
};
export default PageHeader;
