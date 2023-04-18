// externall
import React from "react";
import { Tr, Td, Image, Text, IconButton, Stack } from "@chakra-ui/react";
// internall
import editIcon from "assest/icon/edit-icon.svg";
import infoIcon from "assest/icon/info-icon.svg";

function RuleComponent() {
  return (
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
        <Text>-</Text>
      </Td>
      <Td>
        <Text>-</Text>
      </Td>
      <Td>
        <Text>-</Text>
      </Td>
      <Td>
        <Text>-</Text>
      </Td>
      <Td>
        <Text>-</Text>
      </Td>
      <Td>
        <Stack>
          <IconButton
            variant="unstyled"
            size="sm"
            _focus={{ border: "none" }}
            // onClick={toggleForm}
          >
            <Image src={editIcon} w="16px" h="16px" />
          </IconButton>
          <IconButton variant="unstyled" size="sm" _focus={{ border: "none" }}>
            <Image src={infoIcon} w="16px" h="16px" />
          </IconButton>
        </Stack>
      </Td>
    </Tr>
  );
}

export default RuleComponent;
