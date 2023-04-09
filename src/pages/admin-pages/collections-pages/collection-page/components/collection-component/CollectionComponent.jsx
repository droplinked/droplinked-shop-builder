import {
  Tr,
  Td,
  Image,
  Text,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@chakra-ui/react";

import moreIcon from "../../../../../../assest/icon/more-icon.svg";
import CollectionModal from "../../../../../../modals/collection-modal/CollectionModal";
import { useState } from "react";

const CollectionComponent = ({ collection, update }) => {
  //
  const [editModal, setEditModal] = useState(false);

  const toggleEditModal = () => setEditModal((prev) => !prev);

  //
  return (
    <>
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
          <Text>{collection.title}</Text>
        </Td>
        <Td>
          <Text>-</Text>
        </Td>
        <Td>
          <Text>{collection.products?.[0]?.title}</Text>
        </Td>
        <Td>
          <Text>-</Text>
        </Td>
        <Td>
          <Popover placement="right-start">
            <PopoverTrigger>
              <IconButton
                size="sm"
                textAlign="center"
                variant="unstyled"
                _focus={{ outline: "none" }}
              >
                <Image src={moreIcon} />
              </IconButton>
            </PopoverTrigger>
            <PopoverContent
              _focus={{ outline: "none" }}
              border="none"
              bg="#292929"
              color="white"
              fontSize="xs"
              sx={{ width: "100px", borderRadius: "8px", p: 3 }}
            >
              <Button
                textAlign="start"
                variant="unstyled"
                size="xs"
                onClick={toggleEditModal}
              >
                Edit
              </Button>
            </PopoverContent>
          </Popover>
        </Td>
      </Tr>
      <CollectionModal
        show={editModal}
        collection={collection}
        close={toggleEditModal}
        update={update}
      />
    </>
  );
};

export default CollectionComponent;
