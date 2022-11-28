import { useState } from "react";
import { SelectCollectionWrapper } from "./select-collection-style";
import { Box, Text } from "@chakra-ui/react";

const collectionArray = [
  {
    name: "Public",
    value: "Public",
    id: "Public",
  },
  {
    name: "Holder",
    value: "Holder",
    id: "Holder",
  },
  {
    name: "Gated",
    value: "Gated",
    id: "Gated",
  },
];

const SelectCollection = () => {
  const [collection, setCollection] = useState(null);

  return (
    <SelectCollectionWrapper>
      <Box
        p="8px 16px"
        bg={collection == null ? "primary" : "mainLayer"}
        mr="20px"
        maxH="auto"
        color={collection == null ? "primaryDark" : "darkGray"}
        fontSize="20px"
        borderRadius="28px"
      >
        Select one
      </Box>
      {collectionArray.map((coll) => {
        return (
          <Box
            cursor="pointer"
            onClick={()=>{setCollection(coll.value)}}
            key={coll.id}
            value={coll.value}
            p="8px 16px"
            bg={(collection == coll.value) ? "primary" : "mainLayer"}
            mr="20px"
            maxH="auto"
            color={(collection == coll.value) ? "primaryDark" : "darkGray"}
            fontSize="20px"
            borderRadius="28px"
          >
            {coll.name}
          </Box>
        );
      })}
    </SelectCollectionWrapper>
  );
};

export default SelectCollection;
